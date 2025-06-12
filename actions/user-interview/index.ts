"use server";

import { db } from "@/db";
import { agents, interviews, user, userInterviews } from "@/db/schema";
import { generateAvatarUri } from "@/lib/avatar";
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/lib/constants";
import { streamChat } from "@/lib/stream-chat";
import { streamVideo } from "@/lib/stream-video";
import {
	InterviewStatus,
	type StreamTranscriptItem,
	type UserInterview,
	type UserInterviewWithRelations,
} from "@/types";
import {
	and,
	count,
	desc,
	eq,
	getTableColumns,
	ilike,
	inArray,
	sql,
} from "drizzle-orm";
import JSONL from "jsonl-parse-stringify";
import { z } from "zod";

const userInterviewInsertSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	agentId: z.string().min(1, { message: "Agent is required" }),
	interviewId: z.string().min(1, { message: "Interview is required" }),
});

export const createUserInterview = async (
	input: z.infer<typeof userInterviewInsertSchema>,
	userId: string,
): Promise<UserInterview> => {
	const { success, data, error } = userInterviewInsertSchema.safeParse(input);

	if (!success) {
		throw new Error(error.message);
	}

	const parsedInput = data;

	const [createdUserInterview] = await db
		.insert(userInterviews)
		.values({ ...parsedInput, userId })
		.returning();

	const call = streamVideo.video.call("default", createdUserInterview.id);

	await call.create({
		data: {
			created_by_id: userId,
			custom: {
				interviewId: createdUserInterview.id,
			},
			settings_override: {
				transcription: {
					language: "en",
					mode: "auto-on",
					closed_caption_mode: "auto-on",
				},
				recording: {
					mode: "auto-on",
					quality: "1080p",
				},
			},
		},
	});

	const [existingAgent] = await db
		.select()
		.from(agents)
		.where(eq(agents.id, createdUserInterview.agentId));

	if (!existingAgent) {
		throw new Error("Agent not found");
	}

	await streamVideo.upsertUsers([
		{
			id: existingAgent.id,
			name: existingAgent.name,
			role: "user",
			image: generateAvatarUri({
				seed: existingAgent.name,
				variant: "botttsNeutral",
			}),
		},
	]);

	return createdUserInterview;
};

const userInterviewUpdateSchema = userInterviewInsertSchema.extend({
	id: z.string().min(1, { message: "ID is required" }),
});

export const updatedUserInterview = async (
	input: z.infer<typeof userInterviewUpdateSchema>,
	userId: string,
) => {
	const { success, data, error } = userInterviewUpdateSchema.safeParse(input);

	if (!success) {
		throw new Error(error.message);
	}

	const parsedInput = data;

	const [updatedUserInterview] = await db
		.update(userInterviews)
		.set(parsedInput)
		.where(
			and(
				eq(userInterviews.id, parsedInput.id),
				eq(userInterviews.userId, userId),
			),
		)
		.returning();

	if (!updatedUserInterview) {
		throw new Error("User interview not found");
	}

	return updatedUserInterview;
};

export const getUserInterview = async (
	interviewId: string,
	userId: string,
): Promise<UserInterviewWithRelations> => {
	const [existingUserInterview] = await db
		.select({
			...getTableColumns(userInterviews),
			agent: agents,
			interview: interviews,
			user: user,
			duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
				"duration",
			),
		})
		.from(userInterviews)
		.innerJoin(agents, eq(userInterviews.agentId, agents.id))
		.innerJoin(interviews, eq(userInterviews.interviewId, interviews.id))
		.innerJoin(user, eq(userInterviews.userId, user.id))
		.where(
			and(
				eq(userInterviews.id, interviewId),
				eq(userInterviews.userId, userId),
			),
		);

	if (!existingUserInterview) {
		throw new Error("User interview not found");
	}

	return existingUserInterview;
};

const userInterviewListSchema = z.object({
	page: z.coerce.number().default(DEFAULT_PAGE),
	pageSize: z.coerce
		.number()
		.min(MIN_PAGE_SIZE)
		.max(MAX_PAGE_SIZE)
		.default(DEFAULT_PAGE_SIZE),
	search: z
		.string()
		.transform((val) => val?.trim() || undefined)
		.optional(),
	agentId: z
		.string()
		.transform((val) => val?.trim() || undefined)
		.optional(),
	interviewId: z
		.string()
		.transform((val) => val?.trim() || undefined)
		.optional(),
	status: z
		.enum([
			InterviewStatus.Upcoming,
			InterviewStatus.Active,
			InterviewStatus.Completed,
			InterviewStatus.Processing,
			InterviewStatus.Cancelled,
		])
		.nullish(),
});

export const getAllUserInterview = async (
	query: Record<string, string>,
	userId: string,
): Promise<{
	items: UserInterview[];
	total: number;
	totalPages: number;
}> => {
	const { success, data, error } = userInterviewListSchema.safeParse(query);

	if (!success) {
		throw new Error(error.message);
	}

	const { page, pageSize, search, status, interviewId, agentId } = data;

	const userInterviewData = await db
		.select({
			...getTableColumns(userInterviews),
			agent: agents,
			interview: interviews,
			user: user,
			duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
				"duration",
			),
		})
		.from(userInterviews)
		.innerJoin(agents, eq(userInterviews.agentId, agents.id))
		.innerJoin(interviews, eq(userInterviews.interviewId, interviews.id))
		.innerJoin(user, eq(userInterviews.userId, user.id))
		.where(
			and(
				search ? ilike(interviews.name, `%${search}%`) : undefined,
				interviewId ? eq(userInterviews.interviewId, interviewId) : undefined,
				agentId ? eq(userInterviews.agentId, agentId) : undefined,
				status ? eq(userInterviews.status, status) : undefined,
				eq(userInterviews.userId, userId),
			),
		)
		.orderBy(desc(interviews.createdAt), desc(interviews.id))
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	const [total] = await db
		.select({ count: count() })
		.from(userInterviews)
		.innerJoin(agents, eq(userInterviews.agentId, agents.id))
		.innerJoin(interviews, eq(userInterviews.interviewId, interviews.id))
		.innerJoin(user, eq(userInterviews.userId, user.id))
		.where(
			and(
				search ? ilike(interviews.name, `%${search}%`) : undefined,
				interviewId ? eq(userInterviews.interviewId, interviewId) : undefined,
				agentId ? eq(userInterviews.agentId, agentId) : undefined,
				status ? eq(userInterviews.status, status) : undefined,
				eq(userInterviews.userId, userId),
			),
		);

	const totalPages = Math.ceil(total.count / pageSize);

	return {
		items: userInterviewData,
		total: total.count,
		totalPages,
	};
};

export const deleteUserInterview = async (
	interviewId: string,
	userId: string,
) => {
	const [removedInterview] = await db
		.delete(userInterviews)
		.where(
			and(
				eq(userInterviews.interviewId, interviewId),
				eq(userInterviews.userId, userId),
			),
		)
		.returning();

	if (!removedInterview) {
		throw new Error("User interview not found");
	}

	return removedInterview;
};

export const generateStreamToken = async (userId: string): Promise<string> => {
	const nowInSeconds = Math.floor(Date.now() / 1000);
	const validity = 60 * 60; // 1 hour

	const token = streamVideo.generateUserToken({
		user_id: userId,
		validity_in_seconds: validity,
		issued_at: nowInSeconds,
		exp: nowInSeconds + validity,
	});

	return token;
};

export const getTranscript = async (interviewId: string, userId: string) => {
	const [existingInterview] = await db
		.select()
		.from(userInterviews)
		.where(
			and(
				eq(userInterviews.interviewId, interviewId),
				eq(userInterviews.userId, userId),
			),
		);

	if (!existingInterview) {
		throw new Error("Interview not found");
	}

	if (!existingInterview.transcriptUrl) {
		return [];
	}

	const transcript = await fetch(existingInterview.transcriptUrl)
		.then((res) => res.text())
		.then((text) => JSONL.parse<StreamTranscriptItem>(text))
		.catch(() => []);

	const speakerIds = [...new Set(transcript.map((item) => item.speaker_id))];

	const userSpeakers = await db
		.select()
		.from(user)
		.where(inArray(user.id, speakerIds))
		.then((users) =>
			users.map((user) => ({
				...user,
				image:
					user.image ??
					generateAvatarUri({
						seed: user.name,
						variant: "initials",
					}),
			})),
		);

	const agentSpeakers = await db
		.select()
		.from(agents)
		.where(inArray(agents.id, speakerIds))
		.then((agents) =>
			agents.map((agent) => ({
				...agent,
				image: generateAvatarUri({
					seed: agent.name,
					variant: "botttsNeutral",
				}),
			})),
		);

	const speakers = [...userSpeakers, ...agentSpeakers];

	const transcriptWithSpeakers = transcript.map((item) => {
		const speaker = speakers.find((speaker) => speaker.id === item.speaker_id);

		if (!speaker) {
			return {
				...item,
				user: {
					name: "Unknown",
					image: generateAvatarUri({
						seed: "Unknown",
						variant: "initials",
					}),
				},
			};
		}

		return {
			...item,
			user: {
				name: speaker.name,
				image: speaker.image,
			},
		};
	});

	return transcriptWithSpeakers;
};

export const generateChatToken = async (userId: string) => {
	const token = streamChat.createToken(userId);
	await streamChat.upsertUsers([
		{
			id: userId,
			role: "admin",
		},
	]);
	return token;
};
