import { auth } from "@/lib/auth";
import { DashboardOverview } from "@/modules/home/ui/views/dashboard-overview";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<div className="flex min-h-screen flex-col px-24">
			<DashboardOverview
				userId={session.user.id}
				userName={session.user.name}
			/>
		</div>
	);
}
