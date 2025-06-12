import { db } from "@/db";
import { userInterviews } from "@/db/schema";
import { eq } from "drizzle-orm";
import { inngest } from "./client";
import { TranscriptProcessor } from "./transcript-processor";

export const interviewProcessing = inngest.createFunction(
	{ id: "interview-processing" },
	{ event: "interview/processing" },
	async ({ event, step }) => {
		const processor = new TranscriptProcessor();
		const { interviewId, transcriptUrl } = event.data;

		try {
			const rawTranscript = await step.run("fetch-transcript", () =>
				processor.fetchTranscript(transcriptUrl),
			);

			const parsedTranscript = await step.run("parse-transcript", () =>
				processor.parseTranscript(rawTranscript),
			);

			const enrichedTranscript = await step.run("enrich-transcript", () =>
				processor.enrichTranscriptWithSpeakers(parsedTranscript),
			);

			const summary = await step.run("generate-summary", () =>
				processor.generateSummary(enrichedTranscript),
			);

			await step.run("update-interview", () =>
				processor.updateInterviewSummary(interviewId, summary),
			);

			return { status: "completed" };
		} catch (error) {
			await step.run("handle-error", async () => {
				await db
					.update(userInterviews)
					.set({
						status: "cancelled",
						updatedAt: new Date(),
					})
					.where(eq(userInterviews.id, interviewId));
			});

			throw error;
		}
	},
);
