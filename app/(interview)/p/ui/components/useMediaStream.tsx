"use client";

import { useEffect, useState } from "react";

export function useMediaStreamVolume(mediaStream: MediaStream | null) {
	const [volume, setVolume] = useState(0);

	useEffect(() => {
		if (!mediaStream) {
			setVolume(0);
			return;
		}

		let audioContext: AudioContext;

		const promise = (async () => {
			audioContext = new AudioContext();
			const source = audioContext.createMediaStreamSource(mediaStream);
			const analyser = audioContext.createAnalyser();
			const data = new Float32Array(analyser.fftSize);
			source.connect(analyser);

			const updateVolume = () => {
				analyser.getFloatTimeDomainData(data);
				const volume = Math.sqrt(
					data.reduce((acc, amp) => acc + (amp * amp) / data.length, 0),
				);
				setVolume(volume);
				return requestAnimationFrame(updateVolume);
			};

			return updateVolume();
		})();

		return () => {
			const audioContextToClose = audioContext;
			promise.then((handle) => {
				cancelAnimationFrame(handle);
				audioContextToClose.close();
			});
		};
	}, [mediaStream]);

	return volume;
}
