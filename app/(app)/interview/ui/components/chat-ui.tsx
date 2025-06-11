"use client";

import { generateChatToken } from "@/actions/interview";
import { LoadingState } from "@/components/loading-state";
import { Config } from "@/config/env";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import type { Channel as StreamChannel } from "stream-chat";
import {
	Channel,
	Chat,
	MessageInput,
	MessageList,
	Thread,
	Window,
	useCreateChatClient,
} from "stream-chat-react";

interface Props {
	interviewId: string;
	interviewName: string;
	userId: string;
	userName: string;
	userImage: string | undefined;
}

export const ChatUI = ({
	interviewId,
	interviewName,
	userId,
	userName,
	userImage,
}: Props) => {
	const { mutateAsync: ChatToken } = useMutation({
		mutationKey: ["interview", interviewId, "chat-token"],
		mutationFn: () => generateChatToken(userId),
	});

	const [channel, setChannel] = useState<StreamChannel>();

	const client = useCreateChatClient({
		apiKey: Config.NEXT_PUBLIC_STREAM_CHAT_API_KEY,
		tokenOrProvider: ChatToken,
		userData: {
			id: userId,
			name: userName,
			image: userImage,
		},
	});

	useEffect(() => {
		if (!client) return;

		const channel = client.channel("messaging", interviewId, {
			members: [userId],
		});

		setChannel(channel);
	}, [client, interviewId, userId]);

	if (!client) {
		return (
			<LoadingState
				title="Loading chat"
				description="This may take a few seconds"
			/>
		);
	}

	return (
		<div className="bg-white rounded-lg border overflow-hidden">
			<Chat client={client}>
				<Channel channel={channel}>
					<Window>
						<div className="flex-1 overflow-y-auto max-h-[calc(100vh-23rem)] border-b">
							<MessageList />
						</div>
						<MessageInput />
					</Window>
					<Thread />
				</Channel>
			</Chat>
		</div>
	);
};
