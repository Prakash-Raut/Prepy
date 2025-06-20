import { createAgent, openai, type TextMessage } from "@inngest/agent-kit";
import { eq, inArray } from "drizzle-orm";
import JSONL from "jsonl-parse-stringify";
import { Config } from "@/config/env";
import { db } from "@/db";
import { agents, user, userInterviews } from "@/db/schema";
import type { StreamTranscriptItem } from "@/types";
import { inngest } from "./client";

const summarizer = createAgent({
	name: "InterviewTranscriptSummarizer",
	system:
		"You are a professional interview transcript summarizer. Your task is to create concise, informative summaries that capture the key points, insights, and outcomes of the interview.",
	model: openai({ model: "gpt-4o-mini", apiKey: Config.OPENAI_API_KEY }),
});

export const interviewProcessing = inngest.createFunction(
	{ id: "interview-processing" },
	{ event: "interview/processing" },
	async ({ event, step }) => {
		const { interviewId, transcriptUrl } = event.data;

		const rawTranscript = await step.run("fetch-transcript", async () => {
			const res = await fetch(transcriptUrl);
			if (!res.ok) throw new Error(`Failed to fetch: ${res.statusText}`);
			return res.text();
		});

		const transcript: StreamTranscriptItem[] = await step.run(
			"parse-transcript",
			() => {
				const parsed = JSONL.parse(rawTranscript);
				if (!Array.isArray(parsed) || parsed.length === 0)
					throw new Error("Invalid or empty transcript");
				return parsed;
			},
		);

		const enriched = await step.run("enrich-transcript", async () => {
			const speakerIds = [...new Set(transcript.map((t) => t.speaker_id))];

			const [users, agentData] = await Promise.all([
				db.select().from(user).where(inArray(user.id, speakerIds)),
				db.select().from(agents).where(inArray(agents.id, speakerIds)),
			]);

			const speakers = [...users, ...agentData];

			return transcript.map((item) => {
				const speaker = speakers.find((s) => s.id === item.speaker_id);

				if (!speaker) {
					return {
						...item,
						user: {
							name: "Unknown",
						},
						speaker: "Unknown",
						timestamp: item.start_ts,
					};
				}

				return {
					...item,
					speaker: speaker?.name,
					timestamp: item.start_ts,
				};
			});
		});

		const summary = await step.run("generate-summary", async () => {
			const { output } = await summarizer.run(
				`Please provide a comprehensive summary of the following interview transcript: ${JSON.stringify(enriched)}`,
			);
			const firstMsg = output[0] as TextMessage;
			if (!firstMsg?.content || typeof firstMsg.content !== "string")
				throw new Error("Invalid summary response");
			return firstMsg.content;
		});

		await step.run("update-interview", () =>
			db
				.update(userInterviews)
				.set({
					summary,
					status: "completed",
					updatedAt: new Date(),
				})
				.where(eq(userInterviews.interviewId, interviewId)),
		);

		return { status: "completed" };
	},
);
