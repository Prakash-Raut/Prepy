"use server";

import { getSystemPrompt } from '@/lib/load-prompt';
import { NextResponse, type NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const SYSTEM_PROMPT = getSystemPrompt();
  try {
    const r = await fetch("https://api.openai.com/v1/realtime/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY!}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gpt-4o-realtime-preview-2024-12-17",
        voice: "sage",
        instructions: SYSTEM_PROMPT,
        input_audio_format: "pcm16",
        output_audio_format: "pcm16",
        input_audio_transcription: {
          model: "whisper-1"
        },
        max_response_output_tokens: 4096,
      }),
    });

    if (!r.ok) {
      return NextResponse.json({
        error: "Failed to create session"
      }, { status: r.status });
    }

    const data = await r.json();

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json({
      error: "Internal server error"
    }, { status: 500 });
  }
}