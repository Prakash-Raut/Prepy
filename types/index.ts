import type { agents, interviews, user, userInterviews } from "@/db/schema";
import type { InferSelectModel } from "drizzle-orm";

export type ChildrenProps = {
	children: React.ReactNode;
};

export type User = InferSelectModel<typeof user>;
export type Interview = InferSelectModel<typeof interviews>;
export type Agent = InferSelectModel<typeof agents>;
export type UserInterview = InferSelectModel<typeof userInterviews>;

export type UserInterviewWithRelations = InferSelectModel<
	typeof userInterviews
> & {
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
