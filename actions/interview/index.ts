"use server";

import { db } from "@/db";
import { agents, interviews, user } from "@/db/schema";
import { generateAvatarUri } from "@/lib/avatar";
import { streamChat } from "@/lib/stream-chat";
import { streamVideo } from "@/lib/stream-video";
import {
	type Interview,
	InterviewStatus,
	type InterviewWithAgent,
	type StreamTranscriptItem,
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
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "../../lib/constants";

const interviewInsertSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	agentId: z.string().min(1, { message: "Agent is required" }),
});

export const createInterview = async (
	input: z.infer<typeof interviewInsertSchema>,
	userId: string,
): Promise<Interview> => {
	const parse = interviewInsertSchema.safeParse(input);

	if (!parse.success) {
		throw new Error("Invalid input");
	}

	const parsedInput = parse.data;

	const [createdInterview] = await db
		.insert(interviews)
		.values({ ...parsedInput, userId })
		.returning();

	const call = streamVideo.video.call("default", createdInterview.id);

	await call.create({
		data: {
			created_by_id: userId,
			custom: {
				interviewId: createdInterview.id,
				interviewName: createdInterview.name,
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
		.where(eq(agents.id, createdInterview.agentId));

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

	return createdInterview;
};

const interviewUpdateSchema = interviewInsertSchema.extend({
	id: z.string().min(1, { message: "ID is required" }),
});

export const updatedInterview = async (
	input: z.infer<typeof interviewUpdateSchema>,
	userId: string,
) => {
	const parse = interviewUpdateSchema.safeParse(input);

	if (!parse.success) {
		throw new Error("Invalid input");
	}

	const parsedInput = parse.data;

	const [updatedInterview] = await db
		.update(interviews)
		.set(input)
		.where(
			and(eq(interviews.id, parsedInput.id), eq(interviews.userId, userId)),
		)
		.returning();

	if (!updatedInterview) {
		throw new Error("Interview not found");
	}

	return updatedInterview;
};

export const getInterview = async (
	interviewId: string,
	userId: string,
): Promise<InterviewWithAgent> => {
	const [existingInterview] = await db
		.select({
			...getTableColumns(interviews),
			agent: agents,
			duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
				"duration",
			),
		})
		.from(interviews)
		.innerJoin(agents, eq(interviews.agentId, agents.id))
		.where(and(eq(interviews.id, interviewId), eq(interviews.userId, userId)));

	if (!existingInterview) {
		throw new Error("Interview not found");
	}

	return existingInterview;
};

const interviewListSchema = z.object({
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

export const getAllInterview = async (
	query: Record<string, string>,
	userId: string,
): Promise<{
	items: InterviewWithAgent[];
	total: number;
	totalPages: number;
}> => {
	const parsed = interviewListSchema.safeParse(query);

	if (!parsed.success) {
		throw new Error("Invalid input");
	}

	const { page, pageSize, search, status } = parsed.data;

	const data = await db
		.select({
			...getTableColumns(interviews),
			agent: agents,
			duration: sql<number>`EXTRACT(EPOCH FROM (ended_at - started_at))`.as(
				"duration",
			),
		})
		.from(interviews)
		.innerJoin(agents, eq(interviews.agentId, agents.id))
		.where(
			and(
				eq(interviews.userId, userId),
				search ? ilike(interviews.name, `%${search}%`) : undefined,
				status ? eq(interviews.status, status) : undefined,
			),
		)
		.orderBy(desc(interviews.createdAt), desc(interviews.id))
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	const [total] = await db
		.select({ count: count() })
		.from(interviews)
		.innerJoin(agents, eq(interviews.agentId, agents.id))
		.where(
			and(
				eq(interviews.userId, userId),
				search ? ilike(interviews.name, `%${search}%`) : undefined,
				status ? eq(interviews.status, status) : undefined,
			),
		);

	const totalPages = Math.ceil(total.count / pageSize);

	return {
		items: data,
		total: total.count,
		totalPages,
	};
};

export const deleteInterview = async (interviewId: string, userId: string) => {
	const [removedInterview] = await db
		.delete(interviews)
		.where(and(eq(interviews.id, interviewId), eq(interviews.userId, userId)))
		.returning();

	if (!removedInterview) {
		throw new Error("Interview not found");
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
		.from(interviews)
		.where(and(eq(interviews.id, interviewId), eq(interviews.userId, userId)));

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
