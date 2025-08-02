import { env } from "@/config/env";
import { StreamClient } from "@stream-io/node-sdk";

export const streamVideo = new StreamClient(
	env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
	env.STREAM_VIDEO_API_SECRET,
	{ timeout: 3000 },
);
