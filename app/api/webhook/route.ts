import { type NextRequest, NextResponse } from "next/server";

import { Config } from "@/config/env";
import { db } from "@/db";
import { agents, interviews, userInterviews } from "@/db/schema";
import { inngest } from "@/inngest/client";
import { generateAvatarUri } from "@/lib/avatar";
import { streamChat } from "@/lib/stream-chat";
import { streamVideo } from "@/lib/stream-video";
import type {
	CallRecordingReadyEvent,
	CallSessionEndedEvent,
	CallTranscriptionReadyEvent,
	MessageNewEvent,
} from "@stream-io/node-sdk";
import type {
	CallSessionParticipantLeftEvent,
	CallSessionStartedEvent,
} from "@stream-io/video-react-sdk";
import { and, eq, not } from "drizzle-orm";
import OpenAI from "openai";
import type { ChatCompletionMessageParam } from "openai/resources/index.mjs";

const openaiClient = new OpenAI({
	apiKey: Config.OPENAI_API_KEY,
});

function verifySignatureWithSDK(body: string, signature: string): boolean {
	return streamVideo.verifyWebhook(body, signature);
}

async function handleSessionStarted(event: CallSessionStartedEvent) {
	const interviewId = event.call.custom?.interviewId;

	if (!interviewId) {
		return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
	}

	const [existingUserInterview] = await db
		.select()
		.from(userInterviews)
		.where(
			and(
				eq(userInterviews.id, interviewId),
				not(eq(userInterviews.status, "completed")),
				not(eq(userInterviews.status, "active")),
				not(eq(userInterviews.status, "cancelled")),
				not(eq(userInterviews.status, "processing")),
			),
		);

	if (!userInterviews) {
		return NextResponse.json({ error: "interview not found" }, { status: 400 });
	}

	await db
		.update(userInterviews)
		.set({
			status: "active",
			startedAt: new Date(),
		})
		.where(and(eq(interviews.id, existingUserInterview.id)));

	const [existingAgent] = await db
		.select()
		.from(agents)
		.where(eq(agents.id, existingUserInterview.agentId));

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
		.update(userInterviews)
		.set({
			status: "processing",
			endedAt: new Date(),
		})
		.where(
			and(
				eq(userInterviews.id, interviewId),
				eq(userInterviews.status, "active"),
			),
		);

	return NextResponse.json({ message: "Session ended" }, { status: 200 });
}

async function handleTranscriptionReady(event: CallTranscriptionReadyEvent) {
	const interviewId = event.call_cid.split(".")[1];

	if (!interviewId) {
		return NextResponse.json({ error: "Missing interviewId" }, { status: 400 });
	}

	const [updatedUserinterview] = await db
		.update(userInterviews)
		.set({
			transcriptUrl: event.call_transcription.url,
		})
		.where(eq(userInterviews.id, interviewId))
		.returning();

	if (!updatedUserinterview) {
		return NextResponse.json({ error: "interview not found" }, { status: 400 });
	}

	await inngest.send({
		name: "interviews/processing",
		data: {
			interviewId: updatedUserinterview.id,
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
		.update(userInterviews)
		.set({
			recordingUrl: event.call_recording.url,
		})
		.where(eq(userInterviews.id, interviewId))
		.returning();

	if (!updatedinterview) {
		return NextResponse.json({ error: "interview not found" }, { status: 400 });
	}

	return NextResponse.json({ message: "Recording ready" }, { status: 200 });
}

async function handleNewMessage(event: MessageNewEvent) {
	const userId = event.user?.id;
	const channelId = event.channel_id;
	const text = event.message?.text;

	if (!userId || !channelId || !text) {
		return NextResponse.json(
			{ error: "Missing required fields" },
			{ status: 400 },
		);
	}

	const [existingInterview] = await db
		.select()
		.from(userInterviews)
		.where(
			and(
				eq(userInterviews.id, channelId),
				eq(userInterviews.status, "completed"),
			),
		);

	if (!existingInterview) {
		return NextResponse.json({ error: "Interview not found" }, { status: 400 });
	}

	const [existingAgent] = await db
		.select()
		.from(agents)
		.where(eq(agents.id, existingInterview.agentId));

	if (!existingAgent) {
		return NextResponse.json({ error: "Agent not found" }, { status: 400 });
	}

	if (userId !== existingAgent.id) {
		const instructions = `
      You are an AI assistant helping the user revisit a recently completed interview.
      Below is a summary of the interview, generated from the transcript:
      
      ${existingInterview.summary}
      
      The following are your original instructions from the live interview assistant. Please continue to follow these behavioral guidelines as you assist the user:
      
      ${existingAgent.instructions}
      
      The user may ask questions about the interview, request clarifications, or ask for follow-up actions.
      Always base your responses on the interview summary above.
      
      You also have access to the recent conversation history between you and the user. Use the context of previous messages to provide relevant, coherent, and helpful responses. If the user's question refers to something discussed earlier, make sure to take that into account and maintain continuity in the conversation.
      
      If the summary does not contain enough information to answer a question, politely let the user know.
      
      Be concise, helpful, and focus on providing accurate information from the interview and the ongoing conversation.
      `;

		const channel = streamChat.channel("messaging", channelId);
		await channel.watch();

		const previousFiveMessages = channel.state.messages
			.slice(-5)
			.filter((msg) => msg.text && msg.text.trim() !== "")
			.map<ChatCompletionMessageParam>((message) => ({
				role: message.user?.id === existingAgent.id ? "assistant" : "user",
				content: message.text || "",
			}));

		const GPTResponse = await openaiClient.chat.completions.create({
			model: "gpt-4o-mini",
			messages: [
				{ role: "system", content: instructions },
				...previousFiveMessages,
				{ role: "user", content: text },
			],
		});

		const GPTResponseText = GPTResponse.choices[0].message.content;

		if (!GPTResponseText) {
			return NextResponse.json(
				{ error: "No response from GPT" },
				{ status: 400 },
			);
		}

		const avatarUrl = generateAvatarUri({
			seed: existingAgent.name,
			variant: "botttsNeutral",
		});

		await streamChat.upsertUser({
			id: existingAgent.id,
			name: existingAgent.name,
			image: avatarUrl,
		});

		await channel.sendMessage({
			text: GPTResponseText,
			user: {
				id: existingAgent.id,
				name: existingAgent.name,
				image: avatarUrl,
			},
		});
	}
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

	const eventType = (payload as Record<string, unknown>)?.type;

	switch (eventType) {
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
		case "message.new":
			return handleNewMessage(payload as MessageNewEvent);
		default:
			console.log("Ignoring unsupported event type:", eventType);
			return NextResponse.json({ message: "Event ignored" }, { status: 200 });
	}
}
