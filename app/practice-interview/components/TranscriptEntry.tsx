"use client";

import type React from "react";

interface TranscriptEntryProps {
	timestamp: string;
	speaker: "user" | "ai";
	text: string;
}

const TranscriptEntry: React.FC<TranscriptEntryProps> = ({
	timestamp,
	speaker,
	text,
}) => {
	return (
		<div className="group animate-fadeIn">
			<div className="flex items-start gap-2">
				<div
					className={`
            min-w-[60px] text-xs text-gray-500 pt-1 opacity-0 group-hover:opacity-100
            transition-opacity duration-200
          `}
				>
					{timestamp}
				</div>
				<div className="flex-1">
					<div className="flex items-center">
						<span
							className={`
                font-semibold mr-2
                ${speaker === "user" ? "text-blue-600" : "text-purple-600"}
              `}
						>
							{speaker === "user" ? "You" : "Interviewer"}
						</span>
					</div>
					<p className="text-gray-800 leading-relaxed">{text}</p>
				</div>
			</div>
		</div>
	);
};

export default TranscriptEntry;
