"use client";

import { User } from "lucide-react";
import type React from "react";
import { useInterview } from "./InterviewContext";
import VideoFeed from "./VideoFeed";

const VideoConferenceSection: React.FC = () => {
	const { userVideoRef, aiVideoRef } = useInterview();

	return (
		<div className="h-full flex flex-col md:flex-row">
			<div className="flex-1 p-3">
				<VideoFeed
					ref={userVideoRef}
					label="You"
					avatar={<User className="h-16 w-16 text-white opacity-50" />}
					type="user"
				/>
			</div>
			<div className="flex-1 p-3">
				<VideoFeed
					ref={aiVideoRef}
					label="AI Interviewer"
					avatar={<User className="h-16 w-16 text-white opacity-50" />}
					type="ai"
				/>
			</div>
		</div>
	);
};

export default VideoConferenceSection;
