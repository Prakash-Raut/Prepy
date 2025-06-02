import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { auth } from "@/lib/auth";
import { BarChart, BookOpen, Code, Users } from "lucide-react";
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
			{/* Main Content */}
			<main className="flex-1 py-8">
				<div className="container">
					<div className="flex flex-col gap-8">
						{/* Welcome Section */}
						<div className="flex items-center gap-8">
							<Cube />
							<div>
								<h1 className="text-3xl font-bold tracking-tight">
									Welcome back, {session.user?.name}!
								</h1>
								<p className="text-muted-foreground mt-2">
									Continue your interview preparation journey.
								</p>
							</div>
						</div>

						{/* Stats */}
						<div className="grid gap-4 md:grid-cols-4">
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Total Interviews
									</CardTitle>
									<BookOpen className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">10</div>
									<p className="text-xs text-muted-foreground">
										+10 from last week
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Technical
									</CardTitle>
									<Code className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">10</div>
									<p className="text-xs text-muted-foreground">
										Average score: 8.2/10
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										Behavioral
									</CardTitle>
									<Users className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">10</div>
									<p className="text-xs text-muted-foreground">
										Average score: 7.8/10
									</p>
								</CardContent>
							</Card>
							<Card>
								<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
									<CardTitle className="text-sm font-medium">
										System Design
									</CardTitle>
									<BarChart className="h-4 w-4 text-muted-foreground" />
								</CardHeader>
								<CardContent>
									<div className="text-2xl font-bold">10</div>
									<p className="text-xs text-muted-foreground">
										Average score: 7.5/10
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Recent Activity */}
						{/* <div>
							<h2 className="text-xl font-bold mb-4">Recent Activity</h2>
							<Card>
								<CardContent className="p-0">
									<div className="divide-y">
										{cached.recentInterviews.map((interview) => (
											<div key={interview.id} className="flex items-center p-4">
												<div className="flex items-center gap-4">
													<div className="rounded-full bg-sky-100 p-2">
														<Code className="h-4 w-4 text-sky-600" />
													</div>
												</div>
												<div className="flex-1 px-2">
													<p className="font-medium">
														Software Engineer Interview:{" "}
														{interview.interviewType}
													</p>
													<div className="flex items-center gap-4 pt-2">
														<Badge className="bg-green-100 text-green-600">
															Easy
														</Badge>
														<span className="flex items-center gap-2 text-sm text-muted-foreground">
															<ClockIcon size={16} />
															{interview.durationMins} minutes
														</span>
													</div>
												</div>
												<div className="text-right">
													<p className="font-medium">8.5/10</p>
													<p className="text-sm text-muted-foreground">
														{format(interview.createdAt, "MMM d, yyyy")}
													</p>
												</div>
											</div>
										))}
									</div>
								</CardContent>
								<CardFooter className="border-t p-4">
									<Link
										href="#"
										className="text-sm text-sky-600 hover:text-sky-500"
									>
										View all activity
									</Link>
								</CardFooter>
							</Card>
						</div> */}
					</div>
				</div>
			</main>
		</div>
	);
}

function Cube() {
	return (
		<div className="size-40 p-10">
			<div className="size-20 rotate-[0.75_1_0.75_45deg] transform-3d">
				<div className="absolute inset-0 translate-z-12 rotate-x-0 bg-sky-300/75 text-center text-4xl leading-20 font-bold text-sky-900 backface-visible dark:bg-sky-400/85 dark:text-white">
					1
				</div>
				<div className="absolute inset-0 -translate-z-12 rotate-y-180 bg-sky-300/75 text-center text-4xl leading-20 font-bold text-sky-900 opacity-75 backface-visible dark:bg-sky-400/85 dark:text-white">
					2
				</div>
				<div className="absolute inset-0 translate-x-12 rotate-y-90 bg-sky-300/75 text-center text-4xl leading-20 font-bold text-sky-900 opacity-75 backface-visible dark:bg-sky-400/85 dark:text-white">
					3
				</div>
				<div className="absolute inset-0 -translate-x-12 -rotate-y-90 bg-sky-300/75 text-center text-4xl leading-20 font-bold text-sky-900 backface-visible dark:bg-sky-400/85 dark:text-white">
					4
				</div>
				<div className="absolute inset-0 -translate-y-12 rotate-x-90 bg-sky-300/75 text-center text-4xl leading-20 font-bold text-sky-900 opacity-75 backface-visible dark:bg-sky-400/85 dark:text-white">
					5
				</div>
				<div className="absolute inset-0 translate-y-12 -rotate-x-90 bg-sky-300/75 text-center text-4xl leading-20 font-bold text-sky-900 backface-visible dark:bg-sky-400/85 dark:text-white">
					6
				</div>
			</div>
		</div>
	);
}
