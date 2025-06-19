import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PostHogClient from "@/app/posthog";
import { auth } from "@/lib/auth";
import { DashboardOverview } from "./ui/views/dashboard-overview";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	const posthog = PostHogClient();

	posthog.capture({
		distinctId: session.user.id,
		event: "home_page_viewed",
	});

	return (
		<div className="flex min-h-screen flex-col px-24">
			<DashboardOverview
				userId={session.user.id}
				userName={session.user.name}
			/>
		</div>
	);
}
