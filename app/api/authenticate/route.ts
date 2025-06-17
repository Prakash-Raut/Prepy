"use server";

import { streamVideo } from "@/lib/stream-video";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
	const { userId } = await request.json();

	if (!userId) {
		return NextResponse.json({ error: "User ID is required" }, { status: 400 });
	}

	const token = streamVideo.generateUserToken({
		user_id: userId,
	});

	console.log("token", token);

	return NextResponse.json({
		token,
	});
}
