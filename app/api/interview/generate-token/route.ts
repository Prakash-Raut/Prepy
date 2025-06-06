import { auth } from "@/lib/auth";
import { generateAvatarUri } from "@/lib/avatar";
import { streamVideo } from "@/lib/stream-video";
import { headers } from "next/headers";
import { type NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	await streamVideo.upsertUsers([
		{
			id: session.user.id,
			name: session.user.name,
			role: "admin",
			image: generateAvatarUri({
				seed: session.user.name,
				variant: "initials",
			}),
		},
	]);

	const token = streamVideo.generateUserToken({
		user_id: session.user.id,
	});

	return token;
}
