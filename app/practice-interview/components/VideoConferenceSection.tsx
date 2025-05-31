"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { User } from "lucide-react";
import type React from "react";
import { useInterview } from "./InterviewContext";
import VideoFeed from "./VideoFeed";

const VideoConferenceSection: React.FC = () => {
	const { userVideoRef } = useInterview();

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
				<div className="flex items-center justify-center h-full bg-gray-900 rounded-xl">
					<GeneratedAvatar
						seed={"AI Interviewer"}
						variant="botttsNeutral"
						className="size-48"
					/>
				</div>
			</div>
		</div>
	);
};

export default VideoConferenceSection;
