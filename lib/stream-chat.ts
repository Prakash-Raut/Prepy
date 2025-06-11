// import "server-only";
import { Config } from "@/config/env";

import { StreamChat } from "stream-chat";

export const streamChat = StreamChat.getInstance(
	Config.NEXT_PUBLIC_STREAM_CHAT_API_KEY,
	Config.STREAM_CHAT_API_SECRET,
);
