"use server";

import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { z } from "zod";
import { db } from "@/db";
import { agents, interviews } from "@/db/schema";
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/lib/constants";
import type { Interview } from "@/types";

const interviewInsertSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	agentId: z.string().min(1, { message: "Agent is required" }),
});

export const createInterview = async (
	input: z.infer<typeof interviewInsertSchema>,
): Promise<Interview> => {
	const parse = interviewInsertSchema.safeParse(input);

	if (!parse.success) {
		throw new Error("Invalid input");
	}

	const parsedInput = parse.data;

	const [createdInterview] = await db
		.insert(interviews)
		.values({ ...parsedInput })
		.returning();

	return createdInterview;
};

const interviewUpdateSchema = interviewInsertSchema.extend({
	id: z.string().min(1, { message: "ID is required" }),
});

export const updatedInterview = async (
	input: z.infer<typeof interviewUpdateSchema>,
) => {
	const parse = interviewUpdateSchema.safeParse(input);

	if (!parse.success) {
		throw new Error("Invalid input");
	}

	const parsedInput = parse.data;

	const [updatedInterview] = await db
		.update(interviews)
		.set(input)
		.where(eq(interviews.id, parsedInput.id))
		.returning();

	if (!updatedInterview) {
		throw new Error("Interview not found");
	}

	return updatedInterview;
};

export const getInterview = async (interviewId: string): Promise<Interview> => {
	const [existingInterview] = await db
		.select({
			...getTableColumns(interviews),
			agent: agents,
		})
		.from(interviews)
		.innerJoin(agents, eq(interviews.agentId, agents.id))
		.where(eq(interviews.id, interviewId));

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
});

export const getAllInterview = async (
	query: Record<string, string>,
): Promise<{
	items: Interview[];
	total: number;
	totalPages: number;
}> => {
	const { success, data, error } = interviewListSchema.safeParse(query);

	if (!success) {
		throw new Error(error.message);
	}

	const { page, pageSize, search, agentId } = data;

	const interviewData = await db
		.select({
			...getTableColumns(interviews),
		})
		.from(interviews)
		.where(and(search ? ilike(interviews.name, `%${search}%`) : undefined))
		.orderBy(desc(interviews.createdAt), desc(interviews.id))
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	const [total] = await db
		.select({ count: count() })
		.from(interviews)
		.where(and(search ? ilike(interviews.name, `%${search}%`) : undefined));

	const totalPages = Math.ceil(total.count / pageSize);

	return {
		items: interviewData,
		total: total.count,
		totalPages,
	};
};

export const deleteInterview = async (interviewId: string, userId: string) => {
	const [removedInterview] = await db
		.delete(interviews)
		.where(eq(interviews.id, interviewId))
		.returning();

	if (!removedInterview) {
		throw new Error("Interview not found");
	}

	return removedInterview;
};
