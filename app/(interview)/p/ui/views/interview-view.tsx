"use client";

import { getUserInterview } from "@/actions/user-interview";
import { useSuspenseQuery } from "@tanstack/react-query";
import { InterviewProvider } from "../components/interview-provider";

interface Props {
	interviewId: string;
	userId: string;
}

export const InterviewView = ({ interviewId, userId }: Props) => {
	const { data } = useSuspenseQuery({
		queryKey: ["user-interview", interviewId],
		queryFn: () => getUserInterview(interviewId, userId),
	});

	return (
		<InterviewProvider
			interviewId={interviewId}
			interviewName={data.interview.name}
		/>
	);
};
