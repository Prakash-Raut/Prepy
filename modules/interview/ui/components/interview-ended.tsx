"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { Button } from "@/components/ui/button";

export const InterviewEnded = () => {
	const { interviewId } = useParams();

	return (
		<div className="flex flex-col items-center justify-center h-screen bg-radial from-sidebar-accent to-sidebar">
			<div className="flex flex-1 items-center justify-center px-8 py-4">
				<div className="flex flex-col items-center justify-center gap-y-6 bg-background rounded-lg p-10 shadow-sm">
					<div className="flex flex-col gap-y-2 text-center">
						<h6 className="text-lg font-medium">You have ended the call</h6>
						<p className="text-sm">Summary will appear in few minutes</p>
					</div>
					<Button asChild>
						<Link href={`/interview/${interviewId}`}>Back to interviews</Link>
					</Button>
				</div>
			</div>
		</div>
	);
};
