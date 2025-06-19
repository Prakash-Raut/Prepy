import { StreamClient } from "@stream-io/node-sdk";
import { Config } from "@/config/env";

export const streamVideo = new StreamClient(
	Config.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
	Config.STREAM_VIDEO_API_SECRET,
	{ timeout: 3000 },
);
