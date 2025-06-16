import {
	type StreamVideoParticipant,
	useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { type CSSProperties, useEffect, useState } from "react";
import { useMediaStreamVolume } from "./useMediaStream";

const listeningCooldownMs = 1000;

export function AudioVisualizer() {
	const { useParticipants } = useCallStateHooks();
	const participants = useParticipants();
	const [activity, setActivity] = useState<"listening" | "speaking">(
		"speaking",
	);
	const speaker = participants.find((p) => p.isSpeaking);
	const agent = useAgentParticipant();
	const mediaStream =
		activity === "listening"
			? participants.find((p) => p.isLocalParticipant)?.audioStream
			: agent?.audioStream;
	const volume = useMediaStreamVolume(mediaStream ?? null);

	useEffect(() => {
		if (!speaker && activity === "listening") {
			const timeout = setTimeout(
				() => setActivity("speaking"),
				listeningCooldownMs,
			);
			return () => clearTimeout(timeout);
		}

		const isUserSpeaking = speaker?.isLocalParticipant;
		setActivity(isUserSpeaking ? "listening" : "speaking");
	}, [speaker, activity]);

	return (
		<div
			className="audio-visualizer"
			style={
				{
					"--volumeter-scale": Math.min(1 + volume, 1.1),
					"--volumeter-brightness": Math.max(Math.min(1 + volume, 1.2), 1),
				} as CSSProperties
			}
		>
			<div
				className={`audio-visualizer__aura audio-visualizer__aura_${activity}`}
			/>
		</div>
	);
}

function useAgentParticipant(): StreamVideoParticipant | null {
	const { useParticipants } = useCallStateHooks();
	const participants = useParticipants();
	const agent = participants.find((p) => p.userId === "lucy") ?? null;
	return agent;
}
