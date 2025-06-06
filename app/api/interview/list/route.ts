import { db } from "@/db";
import { agents, interviews } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, count, desc, eq, getTableColumns, ilike, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const DEFAULT_PAGE = 1;
const DEFAULT_PAGE_SIZE = 10;
const MIN_PAGE_SIZE = 1;
const MAX_PAGE_SIZE = 100;

enum InterviewStatus {
	Upcoming = "upcoming",
	Active = "active",
	Completed = "completed",
	Processing = "processing",
	Cancelled = "cancelled",
}

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

export async function GET(req: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const query = Object.fromEntries(req.nextUrl.searchParams.entries());
	const parsed = interviewListSchema.safeParse(query);

	if (!parsed.success) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}

	const { page, pageSize, search, status, agentId } = parsed.data;

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
				eq(interviews.userId, session.user.id),
				search ? ilike(interviews.name, `%${search}%`) : undefined,
				status ? eq(interviews.status, status) : undefined,
				agentId ? eq(interviews.agentId, agentId) : undefined,
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
				eq(interviews.userId, session.user.id),
				search ? ilike(interviews.name, `%${search}%`) : undefined,
				status ? eq(interviews.status, status) : undefined,
				agentId ? eq(interviews.agentId, agentId) : undefined,
			),
		);

	const totalPages = Math.ceil(total.count / pageSize);

	return NextResponse.json({
		items: data,
		total: total.count,
		totalPages,
	});
}
