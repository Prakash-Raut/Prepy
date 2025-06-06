import { db } from "@/db";
import { interviews } from "@/db/schema";
import { auth } from "@/lib/auth";
import { and, eq } from "drizzle-orm";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const interviewUpdateSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	agentId: z.string().min(1, { message: "Agent is required" }),
	id: z.string().min(1, { message: "ID is required" }),
});

export async function PUT(req: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const parse = interviewUpdateSchema.safeParse(body);

	if (!parse.success) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}

	const input = parse.data;

	const [updatedInterview] = await db
		.update(interviews)
		.set(input)
		.where(
			and(eq(interviews.id, input.id), eq(interviews.userId, session.user.id)),
		)
		.returning();

	if (!updatedInterview) {
		return NextResponse.json({ error: "Interview not found" }, { status: 404 });
	}

	return NextResponse.json(updatedInterview);
}
