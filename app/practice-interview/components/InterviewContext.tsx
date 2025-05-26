"use client";

import {
	type LiveTranscriptionEvent,
	LiveTranscriptionEvents,
	useDeepgram,
} from "@/lib/providers/deepgram-provider";
import {
	MicrophoneEvents,
	MicrophoneState,
	useMicrophone,
} from "@/lib/providers/microphone-provider";
import type { ChildrenProps, OpenAIRealtimeEvent } from "@/types";
import { format } from "date-fns";
import type React from "react";
import { createContext, useContext, useEffect, useRef, useState } from "react";

interface Transcript {
	id: string;
	timestamp: string;
	speaker: "user" | "ai";
	text: string;
}

interface InterviewContextType {
	isMicOn: boolean;
	toggleMic: () => void;
	isCameraOn: boolean;
	toggleCamera: () => void;
	isVolumeMuted: boolean;
	toggleVolume: () => void;
	isFullScreen: boolean;
	toggleFullScreen: () => void;
	endInterview: () => void;
	transcript: Transcript[];
	elapsedTime: string;
	connectionStatus: "connected" | "disconnected";
	interviewProgress: number;
	userVideoRef: React.RefObject<HTMLVideoElement>;
	aiVideoRef: React.RefObject<HTMLVideoElement>;
}

const InterviewContext = createContext<InterviewContextType | undefined>(
	undefined,
);

export const InterviewProvider = ({ children }: ChildrenProps) => {
	const [isMicOn, setIsMicOn] = useState(true);
	const [isCameraOn, setIsCameraOn] = useState(true);
	const [isVolumeMuted, setIsVolumeMuted] = useState(false);
	const [isFullScreen, setIsFullScreen] = useState(false);
	const [transcript, setTranscript] = useState<Transcript[]>([]);
	const [elapsedSeconds, setElapsedSeconds] = useState(0);
	const [connectionStatus, setConnectionStatus] = useState<
		"connected" | "disconnected"
	>("connected");
	const [interviewProgress, setInterviewProgress] = useState(0);

	const userVideoRef = useRef<HTMLVideoElement>(null);
	const aiVideoRef = useRef<HTMLVideoElement>(null);

	const { connection, connectToDeepgram } = useDeepgram();
	const {
		setupMicrophone,
		microphone,
		startMicrophone,
		microphoneState,
		stopMicrophone,
	} = useMicrophone();
	const captionTimeout = useRef<NodeJS.Timeout | null>(null);
	const keepAliveInterval = useRef<NodeJS.Timeout | null>(null);

	// Microphone Setup
	useEffect(() => {
		setupMicrophone();
	}, [setupMicrophone]);

	// Deepgram Setup
	useEffect(() => {
		if (microphoneState === MicrophoneState.Ready) {
			connectToDeepgram({
				model: "nova-3",
				interim_results: true,
				smart_format: true,
				filler_words: true,
				utterance_end_ms: 3000,
			});
		}
	}, [connectToDeepgram, microphoneState]);

	// Deepgram Realtime
	useEffect(() => {
		if (!microphone) return;
		if (!connection) return;

		const onData = (e: BlobEvent) => {
			// iOS SAFARI FIX:
			// Prevent packetZero from being sent. If sent at size 0, the connection will close.
			if (e.data.size > 0) {
				connection?.send(e.data);
			}
		};

		const onTranscript = (data: LiveTranscriptionEvent) => {
			const { is_final: isFinal, speech_final: speechFinal } = data;
			const thisCaption = data.channel.alternatives[0].transcript;

			if (thisCaption !== "") {
				setTranscript((prev) => [
					...prev,
					{
						id: crypto.randomUUID(),
						speaker: "user",
						text: thisCaption,
						timestamp: new Date().toISOString(),
					},
				]);
			}

			if (isFinal && speechFinal) {
				if (captionTimeout.current) clearTimeout(captionTimeout.current);
				captionTimeout.current = setTimeout(() => {
					// setCaption(undefined);
					if (captionTimeout.current) clearTimeout(captionTimeout.current);
				}, 3000);
			}
		};

		if (connection?.getReadyState() === 1) {
			connection.addListener(LiveTranscriptionEvents.Transcript, onTranscript);
			microphone.addEventListener(MicrophoneEvents.DataAvailable, onData);

			startMicrophone();
		}

		return () => {
			connection.removeListener(
				LiveTranscriptionEvents.Transcript,
				onTranscript,
			);
			microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
			if (captionTimeout.current) clearTimeout(captionTimeout.current);
		};
	}, [connection, microphone, startMicrophone]);

	// Deepgram Keep Alive
	useEffect(() => {
		if (!connection) return;

		if (
			microphoneState !== MicrophoneState.Open &&
			connection?.getReadyState() === 1
		) {
			connection.keepAlive();

			keepAliveInterval.current = setInterval(() => {
				connection.keepAlive();
			}, 10000);
		} else {
			if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);
		}

		return () => {
			if (keepAliveInterval.current) clearInterval(keepAliveInterval.current);
		};
	}, [connection, microphoneState]);

	// Camera feed
	useEffect(() => {
		const getUserMedia = async () => {
			try {
				const stream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: true,
				});

				if (userVideoRef.current) {
					userVideoRef.current.srcObject = stream;
				}
			} catch (error) {
				console.error("Error accessing media devices:", error);
				setIsCameraOn(false);
				setConnectionStatus("disconnected");
			}
		};

		getUserMedia();

		return () => {
			const stream = userVideoRef.current?.srcObject as MediaStream;
			if (stream) {
				for (const track of stream.getTracks()) {
					track.stop();
				}
			}
		};
	}, []);

	// OpenAI Realtime
	useEffect(() => {
		async function init() {
			const tokenResponse = await fetch("/api/session");
			const data = await tokenResponse.json();
			const EPHEMERAL_KEY = data.client_secret.value;

			const pc = new RTCPeerConnection();

			const audioEl = document.createElement("audio");
			audioEl.autoplay = true;
			document.body.appendChild(audioEl);
			pc.ontrack = (e) => {
				audioEl.srcObject = e.streams[0];
			};

			const ms = await navigator.mediaDevices.getUserMedia({
				audio: true,
			});

			pc.addTrack(ms.getTracks()[0]);

			const dc = pc.createDataChannel("oai-events");

			dc.addEventListener("message", (e) => {
				try {
					const event: OpenAIRealtimeEvent = JSON.parse(e.data);
					const aiCaptions =
						event.response?.output?.[0]?.content?.[0]?.transcript;

					if (aiCaptions) {
						setTranscript((prev) => [
							...prev,
							{
								id: crypto.randomUUID(),
								speaker: "ai",
								text: aiCaptions,
								timestamp: new Date().toISOString(),
							},
						]);
					}
				} catch (err) {
					console.warn("Invalid OpenAI Realtime event", e.data);
				}
			});

			dc.addEventListener("error", (e) => {
				console.error("Data channel error:", e);
			});

			const offer = await pc.createOffer();
			await pc.setLocalDescription(offer);

			const baseUrl = "https://api.openai.com/v1/realtime";
			const model = "gpt-4o-realtime-preview-2024-12-17";
			const sdpResponse = await fetch(`${baseUrl}?model=${model}`, {
				method: "POST",
				body: offer.sdp,
				headers: {
					Authorization: `Bearer ${EPHEMERAL_KEY}`,
					"Content-Type": "application/sdp",
				},
			});

			const answer = {
				type: "answer",
				sdp: await sdpResponse.text(),
			} as RTCSessionDescriptionInit;
			await pc.setRemoteDescription(answer);
		}

		init();
	}, []);

	// Interview timing
	useEffect(() => {
		const timer = setInterval(() => {
			setElapsedSeconds((prev) => prev + 1);
			// Mock interview progress (30 minute interview)
			setInterviewProgress((prev) => Math.min(100, prev + 100 / (30 * 60)));
		}, 1000);

		return () => clearInterval(timer);
	}, []);

	const toggleMic = () => setIsMicOn((prev) => !prev);
	const toggleCamera = () => setIsCameraOn((prev) => !prev);
	const toggleVolume = () => setIsVolumeMuted((prev) => !prev);

	const toggleFullScreen = () => {
		if (!document.fullscreenElement) {
			document.documentElement.requestFullscreen().catch((err) => {
				console.error(`Error attempting to enable fullscreen: ${err.message}`);
			});
			setIsFullScreen(true);
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
				setIsFullScreen(false);
			}
		}
	};

	const endInterview = () => {
		const stream = userVideoRef.current?.srcObject as MediaStream;
		if (stream) {
			for (const track of stream.getTracks()) {
				track.stop();
			}
		}
		stopMicrophone();
		const id = "software-engineer";
		window.location.href = `/practice-interview/${id}/results`;
	};

	return (
		<InterviewContext.Provider
			value={{
				isMicOn,
				toggleMic,
				isCameraOn,
				toggleCamera,
				isVolumeMuted,
				toggleVolume,
				isFullScreen,
				toggleFullScreen,
				endInterview,
				transcript,
				elapsedTime: format(elapsedSeconds, "mm:ss"),
				connectionStatus,
				interviewProgress,
				userVideoRef: userVideoRef as React.RefObject<HTMLVideoElement>,
				aiVideoRef: aiVideoRef as React.RefObject<HTMLVideoElement>,
			}}
		>
			{children}
		</InterviewContext.Provider>
	);
};

export const useInterview = (): InterviewContextType => {
	const context = useContext(InterviewContext);
	if (!context) {
		throw new Error("useInterview must be used within an InterviewProvider");
	}
	return context;
};
