import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/server";
import type { Database } from "@/types/db";
import { LRUCache } from "lru-cache";
import { redirect } from "next/navigation";
import InterviewCard from "./interview-card";

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

const cache = new LRUCache({
	max: 1000 * 60 * 5, // 5 minutes
});

export default async function InterviewListPage() {
	const supabase = await createClient();

	const { data: session } = await supabase.auth.getUser();

	if (!session) {
		redirect("/signin");
	}

	const cacheKey = "predefined-interviews";

	let cached = cache.get(
		cacheKey,
	) as Database["public"]["Tables"]["PredefinedInterview"]["Row"][];

	if (!cached) {
		console.log("Cache miss");

		const { data: predefinedInterviews } = await supabase
			.from("PredefinedInterview")
			.select("*");

		if (!predefinedInterviews) {
			throw new Error("No predefined interviews found");
		}

		cached = predefinedInterviews;
		cache.set(cacheKey, predefinedInterviews);
	}

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
					{cached.map((interview) => (
						<InterviewCard key={interview.id} interview={interview} />
					))}
				</div>
			</div>
		</div>
	);
}
