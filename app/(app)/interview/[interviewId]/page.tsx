import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { getUserInterview } from "@/actions/user-interview";
import PostHogClient from "@/app/posthog";
import { auth } from "@/lib/auth";
import { getQueryClient } from "@/lib/query-client";
import {
	InterviewIdView,
	InterviewIdViewError,
	InterviewIdViewLoader,
} from "../ui/views/interview-id-view";

interface Props {
	params: Promise<{ interviewId: string }>;
}

const Page = async ({ params }: Props) => {
	const { interviewId } = await params;
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	const posthog = PostHogClient();

	posthog.capture({
		distinctId: session.user.id,
		event: "interview_page_viewed",
	});

	const queryClient = await getQueryClient();

	queryClient.prefetchQuery({
		queryKey: ["user-interview", interviewId],
		queryFn: () => getUserInterview(interviewId, session.user.id),
	});

	return (
		<>
			<HydrationBoundary state={dehydrate(queryClient)}>
				<Suspense fallback={<InterviewIdViewLoader />}>
					<ErrorBoundary fallback={<InterviewIdViewError />}>
						<InterviewIdView
							interviewId={interviewId}
							userId={session.user.id}
						/>
					</ErrorBoundary>
				</Suspense>
			</HydrationBoundary>
		</>
	);
};

export default Page;
