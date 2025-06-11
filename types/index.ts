import type { agents, interviews } from "@/db/schema";

export type ChildrenProps = {
	children: React.ReactNode;
};

export type Interview = typeof interviews.$inferSelect;
export type Agent = typeof agents.$inferSelect;

export type InterviewWithAgent = {
	id: string;
	name: string;
	description: string;
	createdAt: Date;
	updatedAt: Date;
	userId: string;
	agentId: string;
	difficulty: "easy" | "medium" | "hard";
	durationInMinutes: "15" | "30" | "45" | "60";
	status: "upcoming" | "active" | "completed" | "processing" | "cancelled";
	startedAt: Date | null;
	endedAt: Date | null;
	transcriptUrl: string | null;
	recordingUrl: string | null;
	summary: string | null;
	agent: Agent;
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
