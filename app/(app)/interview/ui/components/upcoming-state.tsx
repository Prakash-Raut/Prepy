"use client";

import { EmptyState } from "@/components/general/empty-state";
import { Button } from "@/components/ui/button";
import { VideoIcon } from "lucide-react";
import Link from "next/link";

interface Props {
	interviewId: string;
}

export const UpcomingState = ({ interviewId }: Props) => {
	return (
		<div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
			<EmptyState
				image="/upcoming.svg"
				title="Not started yet"
				description="Once you start this interview, a summary will appear here"
			/>
			<div className="flex flex-col-reverse lg:flex lg:justify-center items-center gap-2 w-full">
				<Button type="button" className="w-full lg:w-auto" asChild>
					<Link href={`/p/${interviewId}`}>
						<VideoIcon />
						Start Interview
					</Link>
				</Button>
			</div>
		</div>
	);
};
