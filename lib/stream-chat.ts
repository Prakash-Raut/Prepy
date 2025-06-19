import { StreamChat } from "stream-chat";
import { Config } from "@/config/env";

export const streamChat = StreamChat.getInstance(
	Config.NEXT_PUBLIC_STREAM_CHAT_API_KEY,
	Config.STREAM_CHAT_API_SECRET,
);
