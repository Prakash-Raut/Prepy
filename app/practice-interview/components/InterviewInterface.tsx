"use client";

import type React from "react";
import ControlPanel from "./ControlPanel";
import { useInterview } from "./InterviewContext";
import StatusBar from "./StatusBar";
import TranscriptSection from "./TranscriptSection";
import VideoConferenceSection from "./VideoConferenceSection";

const InterviewInterface: React.FC = () => {
	const { isFullScreen } = useInterview();

	return (
		<div
			className={`flex flex-col h-screen bg-gray-50 ${isFullScreen ? "fixed inset-0 z-50" : ""}`}
		>
			<div className="flex flex-col lg:flex-row h-full overflow-hidden">
				<div className="flex-1 min-h-[40vh] lg:min-h-0 lg:h-full lg:max-w-[65%]">
					<VideoConferenceSection />
				</div>
				<div className="flex-1 lg:max-w-[35%] flex flex-col">
					<TranscriptSection />
				</div>
			</div>
			<div className="relative">
				<StatusBar />
				<ControlPanel />
			</div>
		</div>
	);
};

export default InterviewInterface;
