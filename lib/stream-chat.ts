import { env } from "@/config/env";
import { StreamChat } from "stream-chat";

export const streamChat = StreamChat.getInstance(
	env.NEXT_PUBLIC_STREAM_CHAT_API_KEY,
	env.STREAM_CHAT_API_SECRET,
);
