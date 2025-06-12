"use client";

import { generateStreamToken } from "@/actions/user-interview";
import { Config } from "@/config/env";
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

	useEffect(() => {
		const tokenProvider = () => Promise.resolve(generateStreamToken(userId));

		const client = StreamVideoClient.getOrCreateInstance({
			apiKey: Config.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
			user: {
				id: userId,
				name: userName,
				image: userImage,
			},
			tokenProvider,
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
			tokenProvider,
		);

		setVideoClient(client);

		return () => {
			client.disconnectUser();
			setVideoClient(undefined);
		};
	}, [userId, userName, userImage]);

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
