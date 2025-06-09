import { getAllInterview } from "@/actions/interview";
import { InterviewCard } from "@/components/interview-card";
import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

const categories = [
	{ id: "software", name: "Software", icon: "🔧" },
	{ id: "data-science", name: "Data science", icon: "📊" },
	{ id: "finance", name: "Finance", icon: "📈" },
	{ id: "product", name: "Product", icon: "🧩" },
	{ id: "consulting", name: "Consulting", icon: "👥" },
	{ id: "writing", name: "Writing", icon: "📝" },
	{ id: "legal", name: "Legal", icon: "⚖️" },
	{ id: "marketing", name: "Marketing", icon: "📣" },
];

export default async function InterviewListPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}
	const { items } = await getAllInterview(
		{
			page: "1",
			pageSize: "10",
		},
		session.user.id,
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

			{/* Categories */}
			<div className="border-b">
				<div className="container py-4">
					<div className="flex space-x-4 min-w-max justify-center">
						{categories.map((category) => (
							<Button key={category.id} variant="outline">
								<span className="text-xl mb-1">{category.icon}</span>
								<span className="text-sm">{category.name}</span>
							</Button>
						))}
					</div>
				</div>
			</div>

			{/* Interview Cards */}
			<div className="container py-8">
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
					{items.map((interview) => (
						<InterviewCard
							key={interview.id}
							interview={interview}
							userId={session.user.id}
						/>
					))}
				</div>
			</div>
		</div>
	);
}
