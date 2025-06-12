import { Config } from "@/config/env";
import { db } from "@/db";
import { agents, user, userInterviews } from "@/db/schema";
import type { StreamTranscriptItem, TranscriptWithSpeaker } from "@/types";
import { type TextMessage, createAgent, openai } from "@inngest/agent-kit";
import { eq, inArray } from "drizzle-orm";
import JSONL from "jsonl-parse-stringify";

export class TranscriptProcessor {
	private readonly summarizer = createAgent({
		name: "InterviewTranscriptSummarizer",
		system:
			"You are a professional interview transcript summarizer. Your task is to create concise, informative summaries that capture the key points, insights, and outcomes of the interview.",
		model: openai({ model: "gpt-4o-mini", apiKey: Config.OPENAI_API_KEY }),
	});

	async fetchTranscript(transcriptUrl: string): Promise<string> {
		const response = await fetch(transcriptUrl);
		if (!response.ok) {
			throw new Error(`Failed to fetch transcript: ${response.statusText}`);
		}
		return response.text();
	}

	async parseTranscript(
		rawTranscript: string,
	): Promise<StreamTranscriptItem[]> {
		try {
			const parsedTranscript = JSONL.parse<StreamTranscriptItem>(rawTranscript);
			if (!Array.isArray(parsedTranscript) || parsedTranscript.length === 0) {
				throw new Error("Invalid transcript format: empty or malformed data");
			}
			return parsedTranscript;
		} catch (error) {
			throw new Error(
				`Transcript parsing failed: ${error instanceof Error ? error.message : "Unknown error"}`,
			);
		}
	}

	async enrichTranscriptWithSpeakers(
		transcript: StreamTranscriptItem[],
	): Promise<TranscriptWithSpeaker[]> {
		const uniqueSpeakerIds = [
			...new Set(transcript.map((item) => item.speaker_id)),
		];

		const [users, agentSpeakers] = await Promise.all([
			db.select().from(user).where(inArray(user.id, uniqueSpeakerIds)),
			db.select().from(agents).where(inArray(agents.id, uniqueSpeakerIds)),
		]);

		const speakers = [...users, ...agentSpeakers];

		return transcript.map((item) => {
			const speaker = speakers.find(
				(speaker) => speaker.id === item.speaker_id,
			);

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
	}

	async generateSummary(
		enrichedTranscript: TranscriptWithSpeaker[],
	): Promise<string> {
		const { output } = await this.summarizer.run(
			`Please provide a comprehensive summary of the following interview transcript: ${JSON.stringify(enrichedTranscript)}`,
		);

		const firstMessage = output[0] as TextMessage;

		if (!firstMessage?.content || typeof firstMessage.content !== "string") {
			throw new Error("Summary generation failed: invalid response format");
		}

		return firstMessage.content;
	}

	async updateInterviewSummary(
		interviewId: string,
		summary: string,
	): Promise<void> {
		await db
			.update(userInterviews)
			.set({
				summary,
				status: "completed",
				updatedAt: new Date(),
			})
			.where(eq(userInterviews.id, interviewId));
	}
}
