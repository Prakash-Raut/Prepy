"use client";

import { generateStreamToken } from "@/actions/interview";
import { Config } from "@/config/env";
import {
	type Call,
	CallingState,
	StreamCall,
	StreamVideo,
	StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useMutation } from "@tanstack/react-query";
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
	const { mutateAsync: generateToken } = useMutation({
		mutationKey: ["interview", interviewId, "token"],
		mutationFn: () => generateStreamToken(userId),
	});

	const [client, setClient] = useState<StreamVideoClient>();

	useEffect(() => {
		const _client = new StreamVideoClient({
			apiKey: Config.NEXT_PUBLIC_STREAM_VIDEO_API_KEY,
			user: {
				id: userId,
				name: userName,
				image: userImage,
			},
			tokenProvider: generateToken,
		});

		console.log("STREAM CLIENT", _client);

		setClient(_client);

		return () => {
			_client.disconnectUser();
			setClient(undefined);
		};
	}, [userId, userName, userImage, generateToken]);

	const [call, setCall] = useState<Call>();

	useEffect(() => {
		if (!client) return;

		const _call = client.call("default", interviewId);
		_call.camera.disable();
		_call.microphone.disable();

		setCall(_call);

		return () => {
			if (_call.state.callingState !== CallingState.LEFT) {
				_call.leave();
				_call.endCall();
				setCall(undefined);
			}
		};
	}, [client, interviewId]);

	if (!client || !call) {
		return (
			<div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
				<LoaderIcon className="size-6 animate-spin text-white" />
			</div>
		);
	}

	return (
		<StreamVideo client={client}>
			<StreamCall call={call}>
				<InterviewUI interviewName={interviewName} />
			</StreamCall>
		</StreamVideo>
	);
};
