import { getInterview } from "@/actions/interview";
import { auth } from "@/lib/auth";
import { getQueryClient } from "@/lib/query-client";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { InterviewView } from "../ui/views/interview-view";

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
				<InterviewView interviewId={interviewId} userId={session.user.id} />
			</HydrationBoundary>
		</>
	);
};

export default Page;
