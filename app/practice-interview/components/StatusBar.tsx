"use client";

import type React from "react";
import { useInterview } from "./InterviewContext";

const StatusBar: React.FC = () => {
	const { elapsedTime, connectionStatus, interviewProgress } = useInterview();

	return (
		<div className="bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center">
			<div className="flex items-center gap-3">
				<div className="flex items-center gap-2">
					<div
						className={`
            w-2 h-2 rounded-full 
            ${connectionStatus === "connected" ? "bg-green-500" : "bg-red-500"}
          `}
					/>
					<span className="text-sm text-gray-600">
						{connectionStatus === "connected" ? "Connected" : "Disconnected"}
					</span>
				</div>
				<div className="text-sm text-gray-600">{elapsedTime}</div>
			</div>

			<div className="w-1/3">
				<div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
					<div
						className="h-full bg-blue-500 transition-all duration-300 ease-out"
						style={{ width: `${interviewProgress}%` }}
					/>
				</div>
			</div>
		</div>
	);
};

export default StatusBar;
