"use client";

import { getInterview } from "@/actions/interview";
import { useSuspenseQuery } from "@tanstack/react-query";
import { InterviewProvider } from "../components/interview-provider";

interface Props {
	interviewId: string;
	userId: string;
}

export const InterviewView = ({ interviewId, userId }: Props) => {
	const { data } = useSuspenseQuery({
		queryKey: ["interview", interviewId],
		queryFn: () => getInterview(interviewId, userId),
	});

	return (
		<InterviewProvider interviewId={interviewId} interviewName={data.name} />
	);
};
