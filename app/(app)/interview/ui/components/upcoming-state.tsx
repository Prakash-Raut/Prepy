"use client";

import { EmptyState } from "@/components/empty-state";
import { Button } from "@/components/ui/button";
import { BanIcon, VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
	interviewId: string;
	onCancelInterview: () => void;
	isCancelling: boolean;
}

export const UpcomingState = ({
	interviewId,
	onCancelInterview,
	isCancelling,
}: Props) => {
	return (
		<div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
			<EmptyState
				image="/upcoming.svg"
				title="Not started yet"
				description="Once you start this meeting, a summary will appear here"
			/>
			<div className="flex flex-col-reverse lg:flex lg:justify-center items-center gap-2 w-full">
				<Button
					type="button"
					variant="secondary"
					className="w-full lg:w-auto"
					onClick={onCancelInterview}
					disabled={isCancelling}
				>
					<BanIcon />
					Cancel Meeting
				</Button>
				<Button
					type="button"
					className="w-full lg:w-auto"
					disabled={isCancelling}
					asChild
				>
					<Link href={`/p/${interviewId}`}>
						<VideoIcon />
						Start Interview
					</Link>
				</Button>
			</div>
		</div>
	);
};
