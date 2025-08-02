"use client";

import { env } from "@/config/env";
import { generateAvatarUri } from "@/lib/avatar";
import {
	type Call,
	CallingState,
	StreamCall,
	StreamVideo,
	StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { LoaderIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { InterviewUI } from "./interview-ui";

interface Props {
	interviewId: string;
	interviewName: string;
	userId: string;
	userName: string;
	userImage: string;
}

export const InterviewConnect = ({
	interviewId,
	interviewName,
	userId,
	userName,
	userImage,
}: Props) => {
	const [videoClient, setVideoClient] = useState<StreamVideoClient>();
	const [videoCall, setVideoCall] = useState<Call>();
	const [token, setToken] = useState<string>();

	useEffect(() => {
		const getTokenAndInitClient = async () => {
			const res = await fetch("/api/authenticate", {
				method: "POST",
				body: JSON.stringify({ userId }),
				cache: "no-store",
			});
			const result = await res.json();

			setToken(result.token);

			if (!token) return;

			const client = StreamVideoClient.getOrCreateInstance({
				apiKey: env.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
				user: {
					id: userId,
					name: userName,
					image: userImage,
				},
				token,
			});

			client.connectUser(
				{
					id: userId,
					name: userName,
					image: generateAvatarUri({
						seed: userName,
						variant: "initials",
					}),
				},
				token,
			);

			setVideoClient(client);
		};

		getTokenAndInitClient();

		return () => {
			if (videoClient) {
				videoClient.disconnectUser();
				setVideoClient(undefined);
			}
		};
	}, [userId, userName, userImage, token, videoClient]);

	useEffect(() => {
		if (!videoClient) return;

		const call = videoClient.call("default", interviewId);
		call.camera.disable();
		call.microphone.disable();

		setVideoCall(call);

		return () => {
			if (call.state.callingState !== CallingState.LEFT) {
				call.leave();
				call.endCall();
				setVideoCall(undefined);
			}
		};
	}, [videoClient, interviewId]);

	if (!videoClient || !videoCall) {
		return (
			<div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
				<LoaderIcon className="size-6 animate-spin text-white" />
			</div>
		);
	}

	return (
		<StreamVideo client={videoClient}>
			<StreamCall call={videoCall}>
				<InterviewUI interviewName={interviewName} />
			</StreamCall>
		</StreamVideo>
	);
};
