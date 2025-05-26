"use client";

import { useEffect, useState } from "react";

const VoicePage = () => {
	const [transcript, setTranscript] = useState<string[]>([]);

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

			const ms = await navigator.mediaDevices.getUserMedia({ audio: true });
			pc.addTrack(ms.getTracks()[0]);

			const dc = pc.createDataChannel("oai-events");
			dc.addEventListener("message", (e) => {
				try {
					const json = JSON.parse(e.data);
					if (json.type === "transcript") {
						setTranscript((prev) => [...prev, json.content]);
					}
				} catch (err) {
					console.warn("Invalid JSON message", e.data);
				}
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
	return (
		<div>
			<h1 className="text-xl font-bold">🗣️ Voice Chat with GPT-4o</h1>
			<div className="mt-4 space-y-2 p-4 bg-gray-100 rounded">
				{transcript.map((line) => (
					<div key={line} className="text-gray-800">
						{line}
					</div>
				))}
			</div>
		</div>
	);
};

export default VoicePage;
