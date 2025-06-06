import { db } from "@/db";
import { agents, interviews } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq, getTableColumns, sql } from "drizzle-orm";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const interviewGetSchema = z.object({
	id: z.string().min(1, { message: "ID is required" }),
});

export async function GET(req: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const parse = interviewGetSchema.safeParse(body);

	if (!parse.success) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}

	const input = parse.data;

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
		.where(
			and(eq(interviews.id, input.id), eq(interviews.userId, session.user.id)),
		);

	if (!existingInterview) {
		throw NextResponse.json({ error: "Interview not found" }, { status: 404 });
	}

	return NextResponse.json(existingInterview);
}
