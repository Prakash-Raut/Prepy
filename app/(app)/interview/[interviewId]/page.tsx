import { getInterview } from "@/actions/interview";
import { auth } from "@/lib/auth";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
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

	const queryClient = await getQueryClient();

	queryClient.prefetchQuery({
		queryKey: ["interview", interviewId],
		queryFn: () => getInterview(interviewId, session.user.id),
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
