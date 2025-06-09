import { type NextRequest, NextResponse } from "next/server";

import { Config } from "@/config/env";
import { db } from "@/db";
import { agents, interviews } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { streamVideo } from "@/lib/stream-video";
import type {
	CallRecordingReadyEvent,
	CallSessionEndedEvent,
	CallTranscriptionReadyEvent,
} from "@stream-io/node-sdk";
import type {
	CallSessionParticipantLeftEvent,
	CallSessionStartedEvent,
} from "@stream-io/video-react-sdk";
import { and, eq, not } from "drizzle-orm";

function verifySignatureWithSDK(body: string, signature: string): boolean {
	return streamVideo.verifyWebhook(body, signature);
}

async function handleSessionStarted(event: CallSessionStartedEvent) {
	const interviewId = event.call.custom?.interviewId;

	if (!interviewId) {
		return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
	}

	const [existinginterview] = await db
		.select()
		.from(interviews)
		.where(
			and(
				eq(interviews.id, interviewId),
				not(eq(interviews.status, "completed")),
				not(eq(interviews.status, "active")),
				not(eq(interviews.status, "cancelled")),
				not(eq(interviews.status, "processing")),
			),
		);

	if (!existinginterview) {
		return NextResponse.json({ error: "interview not found" }, { status: 400 });
	}

	await db
		.update(interviews)
		.set({
			status: "active",
			startedAt: new Date(),
		})
		.where(and(eq(interviews.id, existinginterview.id)));

	const [existingAgent] = await db
		.select()
		.from(agents)
		.where(eq(agents.id, existinginterview.agentId));

	if (!existingAgent) {
		return NextResponse.json({ error: "Agent not found" }, { status: 400 });
	}

	const call = streamVideo.video.call("default", interviewId);

	const realtimeClient = await streamVideo.video.connectOpenAi({
		call,
		openAiApiKey: Config.OPENAI_API_KEY,
		agentUserId: existingAgent.id,
	});

	realtimeClient.updateSession({
		instructions: existingAgent.instructions,
	});

	return NextResponse.json({ message: "Session started" }, { status: 200 });
}

async function handleParticipantLeft(event: CallSessionParticipantLeftEvent) {
	const interviewId = event.call_cid.split(".")[1];

	if (!interviewId) {
		return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
	}

	const call = streamVideo.video.call("default", interviewId);
	await call.end();

	return NextResponse.json({ message: "Participant left" }, { status: 200 });
}

async function handleSessionEnded(event: CallSessionEndedEvent) {
	const interviewId = event.call_cid.split(".")[1];

	if (!interviewId) {
		return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
	}

	await db
		.update(interviews)
		.set({
			status: "processing",
			endedAt: new Date(),
		})
		.where(
			and(eq(interviews.id, interviewId), eq(interviews.status, "active")),
		);

	return NextResponse.json({ message: "Session ended" }, { status: 200 });
}

async function handleTranscriptionReady(event: CallTranscriptionReadyEvent) {
	const interviewId = event.call_cid.split(".")[1];

	if (!interviewId) {
		return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
	}

	const [updatedinterview] = await db
		.update(interviews)
		.set({
			transcriptUrl: event.call_transcription.url,
		})
		.where(eq(interviews.id, interviewId))
		.returning();

	if (!updatedinterview) {
		return NextResponse.json({ error: "interview not found" }, { status: 400 });
	}

	await inngest.send({
		name: "interviews/processing",
		data: {
			interviewId: updatedinterview.id,
			transcriptUrl: event.call_transcription.url,
		},
	});

	return NextResponse.json({ message: "Transcription ready" }, { status: 200 });
}

async function handleRecordingReady(event: CallRecordingReadyEvent) {
	const interviewId = event.call_cid.split(".")[1];

	if (!interviewId) {
		return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
	}

	const [updatedinterview] = await db
		.update(interviews)
		.set({
			recordingUrl: event.call_recording.url,
		})
		.where(eq(interviews.id, interviewId))
		.returning();

	if (!updatedinterview) {
		return NextResponse.json({ error: "interview not found" }, { status: 400 });
	}

	return NextResponse.json({ message: "Recording ready" }, { status: 200 });
}

export async function POST(req: NextRequest) {
	const signature = req.headers.get("x-signature");
	const apiKey = req.headers.get("x-api-key");

	if (!signature || !apiKey) {
		return NextResponse.json(
			{ error: "Missing signature or api key" },
			{ status: 400 },
		);
	}

	const body = await req.text();

	if (!verifySignatureWithSDK(body, signature)) {
		return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
	}

	let payload: unknown;

	try {
		payload = JSON.parse(body) as Record<string, unknown>;
	} catch (error) {
		return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
	}

	const eventType = payload as Record<string, unknown>;

	switch (eventType.type) {
		case "call.session_started":
			return handleSessionStarted(payload as CallSessionStartedEvent);
		case "call.session_participant_left":
			return handleParticipantLeft(payload as CallSessionParticipantLeftEvent);
		case "call.session_ended":
			return handleSessionEnded(payload as CallSessionEndedEvent);
		case "call.transcription_ready":
			return handleTranscriptionReady(payload as CallTranscriptionReadyEvent);
		case "call.recording_ready":
			return handleRecordingReady(payload as CallRecordingReadyEvent);
		default:
			console.log("Ignoring unsupported event type:", eventType.type);
			return NextResponse.json({ message: "Event ignored" }, { status: 200 });
	}
}
