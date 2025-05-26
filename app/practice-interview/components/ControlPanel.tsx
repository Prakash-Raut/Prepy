"use client";

import {
	Maximize,
	Mic,
	MicOff,
	Minimize,
	Phone,
	Video,
	VideoOff,
	Volume2,
	VolumeX,
} from "lucide-react";
import type React from "react";
import ControlButton from "./ControlButton";
import { useInterview } from "./InterviewContext";

const ControlPanel: React.FC = () => {
	const {
		isMicOn,
		toggleMic,
		isCameraOn,
		toggleCamera,
		isVolumeMuted,
		toggleVolume,
		isFullScreen,
		toggleFullScreen,
		endInterview,
	} = useInterview();

	return (
		<div className="absolute left-1/2 bottom-6 -translate-x-1/2 bg-white rounded-full px-6 py-3 shadow-lg">
			<div className="flex items-center gap-2">
				<ControlButton
					onClick={toggleMic}
					active={isMicOn}
					activeIcon={<Mic size={20} />}
					inactiveIcon={<MicOff size={20} />}
					label={isMicOn ? "Mute" : "Unmute"}
					activeColor="bg-gray-200 text-gray-700"
					inactiveColor="bg-red-100 text-red-600"
				/>

				<ControlButton
					onClick={toggleCamera}
					active={isCameraOn}
					activeIcon={<Video size={20} />}
					inactiveIcon={<VideoOff size={20} />}
					label={isCameraOn ? "Turn off camera" : "Turn on camera"}
					activeColor="bg-gray-200 text-gray-700"
					inactiveColor="bg-red-100 text-red-600"
				/>

				<ControlButton
					onClick={toggleVolume}
					active={!isVolumeMuted}
					activeIcon={<Volume2 size={20} />}
					inactiveIcon={<VolumeX size={20} />}
					label={isVolumeMuted ? "Unmute sound" : "Mute sound"}
					activeColor="bg-gray-200 text-gray-700"
					inactiveColor="bg-gray-300 text-gray-600"
				/>

				<div className="h-8 border-r border-gray-300 mx-1" />

				<ControlButton
					onClick={toggleFullScreen}
					active={isFullScreen}
					activeIcon={<Minimize size={20} />}
					inactiveIcon={<Maximize size={20} />}
					label={isFullScreen ? "Exit fullscreen" : "Enter fullscreen"}
					activeColor="bg-gray-200 text-gray-700"
					inactiveColor="bg-gray-200 text-gray-700"
				/>

				<div className="h-8 border-r border-gray-300 mx-1" />

				<ControlButton
					onClick={endInterview}
					active={false}
					activeIcon={<Phone size={20} />}
					inactiveIcon={<Phone size={20} />}
					label="End interview"
					activeColor=""
					inactiveColor="bg-red-500 text-white hover:bg-red-600"
				/>
			</div>
		</div>
	);
};

export default ControlPanel;
