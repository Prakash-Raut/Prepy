"use client";

import type React from "react";
import { forwardRef } from "react";
import AudioIndicator from "./AudioIndicator";
import { useInterview } from "./InterviewContext";

interface VideoFeedProps {
	label: string;
	avatar: React.ReactNode;
	type: "user" | "ai";
}

const VideoFeed = forwardRef<HTMLVideoElement, VideoFeedProps>(
	({ label, avatar, type }, ref) => {
		const { isCameraOn, isMicOn } = useInterview();
		const isActive = type === "user" ? isCameraOn : true;

		return (
			<div className="relative h-full w-full rounded-xl overflow-hidden bg-gray-900 shadow-lg transition-all duration-300">
				{isActive ? (
					<video
						ref={ref}
						autoPlay
						muted={type === "user"}
						className="h-full w-full object-cover transform scale-x-[-1]"
					/>
				) : (
					<div className="absolute inset-0 flex items-center justify-center bg-gray-800">
						{avatar}
					</div>
				)}

				<div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
					<div className="flex items-center justify-between">
						<div className="flex items-center gap-2">
							<span className="text-white font-medium">{label}</span>
							{type === "user" && isMicOn && <AudioIndicator />}
							{type === "ai" && <AudioIndicator />}
						</div>
						{type === "user" && !isCameraOn && (
							<span className="text-xs text-red-400 bg-red-400/20 px-2 py-1 rounded-full">
								Camera Off
							</span>
						)}
					</div>
				</div>
			</div>
		);
	},
);

export default VideoFeed;
