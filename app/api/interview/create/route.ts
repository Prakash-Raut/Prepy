import { db } from "@/db";
import { agents, interviews } from "@/db/schema";
import { auth } from "@/lib/auth";
import { generateAvatarUri } from "@/lib/avatar";
import { streamVideo } from "@/lib/stream-video";
import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";
import { z } from "zod";

const interviewInsertSchema = z.object({
	name: z.string().min(1, { message: "Name is required" }),
	agentId: z.string().min(1, { message: "Agent is required" }),
});

export async function POST(req: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	const body = await req.json();
	const parse = interviewInsertSchema.safeParse(body);

	if (!parse.success) {
		return NextResponse.json({ error: "Invalid input" }, { status: 400 });
	}

	const input = parse.data;

	const [createdInterview] = await db
		.insert(interviews)
		.values({ ...input, userId: session.user.id })
		.returning();

	const call = streamVideo.video.call("default", createdInterview.id);

	await call.create({
		data: {
			created_by_id: session.user.id,
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
		return NextResponse.json({ error: "Agent not found" }, { status: 404 });
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

	return NextResponse.json(createdInterview);
}
