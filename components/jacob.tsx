"use client";

import {
	type LiveTranscriptionEvent,
	LiveTranscriptionEvents,
	useDeepgram
} from "@/lib/providers/deepgram-provider";
import {
	MicrophoneEvents,
	MicrophoneState,
	useMicrophone
} from "@/lib/providers/microphone-provider";
import { type JSX, useEffect, useRef, useState } from "react";
import Visualizer from "./visualizer";

const App: () => JSX.Element = () => {
	const [caption, setCaption] = useState<string | undefined>(
		"Powered by Deepgram"
	);
	const { connection, connectToDeepgram } = useDeepgram();
	const { setupMicrophone, microphone, startMicrophone, microphoneState } =
		useMicrophone();
	const captionTimeout = useRef<NodeJS.Timeout | null>(null);
	const keepAliveInterval = useRef<NodeJS.Timeout | null>(null);

	useEffect(() => {
		setupMicrophone();
	}, [setupMicrophone]);

	useEffect(() => {
		if (microphoneState === MicrophoneState.Ready) {
			connectToDeepgram({
				model: "nova-3",
				interim_results: true,
				smart_format: true,
				filler_words: true,
				utterance_end_ms: 3000
			});
		}
	}, [microphoneState, connectToDeepgram]);

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
				setCaption(thisCaption);
			}

			if (isFinal && speechFinal) {
				if (captionTimeout.current) clearTimeout(captionTimeout.current);
				captionTimeout.current = setTimeout(() => {
					setCaption(undefined);
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
				onTranscript
			);
			microphone.removeEventListener(MicrophoneEvents.DataAvailable, onData);
			if (captionTimeout.current) clearTimeout(captionTimeout.current);
		};
	}, [connection, microphone, startMicrophone]);

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
	}, [microphoneState, connection]);

	return (
		<>
			<div className="flex h-full antialiased">
				<div className="flex flex-row h-full w-full overflow-x-hidden">
					<div className="flex flex-col flex-auto h-full">
						{/* height 100% minus 8rem */}
						<div className="relative w-full h-full">
							{microphone && <Visualizer microphone={microphone} />}
							<div className="absolute bottom-[8rem]  inset-x-0 max-w-4xl mx-auto text-center">
								{caption && <span className="bg-black/70 p-8">{caption}</span>}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default App;
