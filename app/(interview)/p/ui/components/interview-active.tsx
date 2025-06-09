"use client";

import { CallControls, SpeakerLayout } from "@stream-io/video-react-sdk";
import Image from "next/image";
import Link from "next/link";

interface Props {
	onLeave: () => void;
	interviewName: string;
}

export const InterviewActive = ({ onLeave, interviewName }: Props) => {
	return (
		<div className="flex flex-col justify-between p-4 h-full text-white">
			<div className=" bg-[#101213] rounded-full p-4 flex items-center gap-4">
				<Link
					href="/"
					className="flex items-center justify-center p-1 bg-white/10 rounded-full w-fit"
				>
					<Image src="/logo.svg" alt="logo" width={22} height={22} />
				</Link>
				<h4 className="text-base">{interviewName}</h4>
			</div>
			<SpeakerLayout />
			<div className="bg-[#101213] rounded-full px-4 py-2 flex items-center gap-x-2">
				<CallControls onLeave={onLeave} />
			</div>
		</div>
	);
};
