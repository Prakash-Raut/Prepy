import type { interviews } from "@/db/schema";

export type ChildrenProps = {
	children: React.ReactNode;
};

export type Interview = typeof interviews.$inferSelect;

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
