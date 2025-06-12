import type { agents, interviews, user, userInterviews } from "@/db/schema";

export type ChildrenProps = {
	children: React.ReactNode;
};

export type User = typeof user.$inferSelect;
export type Interview = typeof interviews.$inferSelect;
export type Agent = typeof agents.$inferSelect;

export type UserInterview = typeof userInterviews.$inferSelect;

export type UserInterviewWithRelations = typeof userInterviews.$inferSelect & {
	interview: Interview;
	agent: Agent;
	user: User;
};

export enum InterviewStatus {
	Upcoming = "upcoming",
	Active = "active",
	Completed = "completed",
	Processing = "processing",
	Cancelled = "cancelled",
}

export type StreamTranscriptItem = {
	speaker_id: string;
	type: string;
	text: string;
	start_ts: number;
	stop_ts: number;
};

export interface InterviewProcessingEvent {
	name: "interviews/processing";
	data: {
		interviewId: string;
		transcriptUrl: string;
	};
}

export interface TranscriptWithSpeaker {
	speaker_id: string;
	speaker: string;
	text: string;
	timestamp: number;
	user?: {
		name: string;
	};
}

export interface InterviewProcessingResult {
	summary: string;
	status: "completed" | "failed";
	error?: string;
}
