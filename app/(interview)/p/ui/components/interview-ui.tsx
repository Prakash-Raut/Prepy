"use client";

import { StreamTheme, useCall } from "@stream-io/video-react-sdk";
import { useState } from "react";
import { InterviewActive } from "./interview-active";
import { InterviewEnded } from "./interview-ended";
import { InterviewLobby } from "./interview-lobby";

interface Props {
	interviewName: string;
}

export const InterviewUI = ({ interviewName }: Props) => {
	const call = useCall();
	const [show, setShow] = useState<"lobby" | "call" | "ended">("lobby");

	const handleJoin = async () => {
		if (!call) return;
		await call.join();
		setShow("call");
	};

	const handleLeave = async () => {
		if (!call) return;
		await call.leave();
		setShow("ended");
	};

	return (
		<StreamTheme className="h-full">
			{show === "lobby" && <InterviewLobby onJoin={handleJoin} />}
			{show === "call" && (
				<InterviewActive onLeave={handleLeave} interviewName={interviewName} />
			)}
			{show === "ended" && <InterviewEnded />}
		</StreamTheme>
	);
};
