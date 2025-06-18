import { getAllInterview } from "@/actions/interview";
import PostHogClient from "@/app/posthog";
import { InterviewCard } from "@/components/general/interview-card";
import { auth } from "@/lib/auth";
import { getOrSetCache } from "@/lib/cache";
import type { Interview } from "@/types";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function ExplorePage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	const posthog = PostHogClient();

	posthog.capture({
		distinctId: session.user.id,
		event: "explore_page_viewed",
	});

	const interviews: Interview[] = await getOrSetCache(
		"interviews:page=1:pageSize=10",
		async () =>
			getAllInterview({
				page: "1",
				pageSize: "10",
			}).then((res) => res.items),
	);

	return (
		<div className="min-h-screen px-24">
			<div className="border-b">
				<div className="container py-8">
					<h1 className="text-5xl font-bold text-center">
						Software mock interviews
					</h1>
					<p className="text-center mt-4 max-w-2xl mx-auto">
						Practice with 100+ expert-vetted interviews, get feedback on your
						performance, and land your dream opportunity.
					</p>
				</div>
			</div>

			<div className="container py-8">
				<div
					className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 
					xl:grid-cols-4 gap-2 sm:gap-3 md:gap-4 justify-center w-full"
				>
					{interviews.map((interview) => (
						<InterviewCard key={interview.id} interview={interview} />
					))}
				</div>
			</div>
		</div>
	);
}
