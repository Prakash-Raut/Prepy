"use server";

import { db } from "@/db";
import { agents } from "@/db/schema";
import {
	DEFAULT_PAGE,
	DEFAULT_PAGE_SIZE,
	MAX_PAGE_SIZE,
	MIN_PAGE_SIZE,
} from "@/lib/constants";
import type { Agent } from "@/types";
import { and, count, desc, eq, getTableColumns, ilike } from "drizzle-orm";
import { z } from "zod";

const agentInsertSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	instructions: z.string().min(1, { message: "Instructions are required" }),
});

export const createAgent = async (
	input: z.infer<typeof agentInsertSchema>,
): Promise<Agent> => {
	const parse = agentInsertSchema.safeParse(input);

	if (!parse.success) {
		throw new Error("Invalid input");
	}

	const parsedInput = parse.data;

	const [createdAgent] = await db
		.insert(agents)
		.values({ ...parsedInput })
		.returning();

	return createdAgent;
};

const agentUpdateSchema = agentInsertSchema.extend({
	id: z.string().min(1, { message: "ID is required" }),
});

export const updatedAgent = async (
	input: z.infer<typeof agentUpdateSchema>,
) => {
	const parse = agentUpdateSchema.safeParse(input);

	if (!parse.success) {
		throw new Error("Invalid input");
	}

	const parsedInput = parse.data;

	const [updatedAgent] = await db
		.update(agents)
		.set(input)
		.where(eq(agents.id, parsedInput.id))
		.returning();

	if (!updatedAgent) {
		throw new Error("Agent not found");
	}

	return updatedAgent;
};

export const getAgent = async (agentId: string): Promise<Agent> => {
	const [existingAgent] = await db
		.select({
			...getTableColumns(agents),
		})
		.from(agents)
		.where(eq(agents.id, agentId));

	if (!existingAgent) {
		throw new Error("Agent not found");
	}

	return existingAgent;
};

const agentListSchema = z.object({
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

export const getAllAgent = async (
	query: Record<string, string>,
): Promise<{
	items: Agent[];
	total: number;
	totalPages: number;
}> => {
	const { success, data, error } = agentListSchema.safeParse(query);

	if (!success) {
		throw new Error(error.message);
	}

	const { page, pageSize, search } = data;

	const agentData = await db
		.select({
			...getTableColumns(agents),
		})
		.from(agents)
		.where(and(search ? ilike(agents.name, `%${search}%`) : undefined))
		.orderBy(desc(agents.createdAt), desc(agents.id))
		.limit(pageSize)
		.offset((page - 1) * pageSize);

	const [total] = await db
		.select({ count: count() })
		.from(agents)
		.where(and(search ? ilike(agents.name, `%${search}%`) : undefined));

	const totalPages = Math.ceil(total.count / pageSize);

	return {
		items: agentData,
		total: total.count,
		totalPages,
	};
};

export const deleteAgent = async (agentId: string) => {
	const [removedAgent] = await db
		.delete(agents)
		.where(eq(agents.id, agentId))
		.returning();

	if (!removedAgent) {
		throw new Error("Agent not found");
	}

	return removedAgent;
};
