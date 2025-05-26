"use client";

import { Download } from "lucide-react";
import type React from "react";
import { useEffect, useRef } from "react";
import { useInterview } from "./InterviewContext";
import TranscriptEntry from "./TranscriptEntry";

const TranscriptSection: React.FC = () => {
	const { transcript } = useInterview();
	const transcriptRef = useRef<HTMLDivElement>(null);
	const prevLengthRef = useRef<number>(transcript.length);

	useEffect(() => {
		if (transcript.length > prevLengthRef.current && transcriptRef.current) {
			transcriptRef.current.scrollTop = transcriptRef.current.scrollHeight;
		}
		prevLengthRef.current = transcript.length;
	}, [transcript]);

	const handleTranscriptDownload = () => {
		if (transcript.length === 0) return;

		const formatted = transcript
			.map((entry) => `[${entry.timestamp}] ${entry.speaker}: ${entry.text}`)
			.join("\n");

		const blob = new Blob([formatted], { type: "text/plain" });
		const url = URL.createObjectURL(blob);

		const a = document.createElement("a");
		a.href = url;
		a.download = "transcript.txt";
		a.click();

		URL.revokeObjectURL(url); // Clean up
	};

	return (
		<div className="h-full flex flex-col">
			<div className="p-4 border-b flex items-center justify-between bg-white">
				<h2 className="text-lg font-semibold text-gray-800">Transcript</h2>
				<button
					type="button"
					onClick={handleTranscriptDownload}
					className="text-blue-500 hover:text-blue-700 flex items-center gap-1 text-sm font-medium"
					aria-label="Download transcript"
				>
					<Download size={16} />
					<span>Download</span>
				</button>
			</div>
			<div
				ref={transcriptRef}
				className="flex-1 overflow-y-auto p-4 space-y-4 bg-white"
			>
				{transcript.length === 0 ? (
					<p className="text-gray-500 text-center py-8">
						The transcript will appear here once the interview begins.
					</p>
				) : (
					transcript.map((entry) => (
						<TranscriptEntry
							key={entry.id}
							timestamp={entry.timestamp}
							speaker={entry.speaker}
							text={entry.text}
						/>
					))
				)}
			</div>
		</div>
	);
};

export default TranscriptSection;
