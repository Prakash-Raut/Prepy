import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from "@/components/ui/card";
import { BarChart, BookOpen, Clock, Code, Users } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {
	return (
		<div className="flex min-h-screen flex-col px-24">
			{/* Main Content */}
			<main className="flex-1 py-8">
				<div className="container">
					<div className="flex flex-col gap-8">
						{/* Welcome Section */}
						<div>
							<h1 className="text-3xl font-bold tracking-tight">
								Welcome back, John!
							</h1>
							<p className="text-muted-foreground mt-2">
								Continue your interview preparation journey.
							</p>
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
									<div className="text-2xl font-bold">12</div>
									<p className="text-xs text-muted-foreground">
										+2 from last week
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
									<div className="text-2xl font-bold">5</div>
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
									<div className="text-2xl font-bold">4</div>
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
									<div className="text-2xl font-bold">3</div>
									<p className="text-xs text-muted-foreground">
										Average score: 7.5/10
									</p>
								</CardContent>
							</Card>
						</div>

						{/* Recent Activity */}
						<div>
							<h2 className="text-xl font-bold mb-4">Recent Activity</h2>
							<Card>
								<CardContent className="p-0">
									<div className="divide-y">
										<div className="flex items-center justify-between p-4">
											<div className="flex items-center gap-4">
												<div className="rounded-full bg-purple-100 p-2">
													<Code className="h-4 w-4 text-purple-600" />
												</div>
												<div>
													<p className="font-medium">
														Technical Interview: Algorithms & Data Structures
													</p>
													<p className="text-sm text-muted-foreground">
														Medium difficulty • 30 minutes
													</p>
												</div>
											</div>
											<div className="text-right">
												<p className="font-medium">8.5/10</p>
												<p className="text-sm text-muted-foreground">
													2 days ago
												</p>
											</div>
										</div>
										<div className="flex items-center justify-between p-4">
											<div className="flex items-center gap-4">
												<div className="rounded-full bg-purple-100 p-2">
													<Users className="h-4 w-4 text-purple-600" />
												</div>
												<div>
													<p className="font-medium">
														Behavioral Interview: Leadership & Teamwork
													</p>
													<p className="text-sm text-muted-foreground">
														Easy difficulty • 20 minutes
													</p>
												</div>
											</div>
											<div className="text-right">
												<p className="font-medium">7.8/10</p>
												<p className="text-sm text-muted-foreground">
													4 days ago
												</p>
											</div>
										</div>
										<div className="flex items-center justify-between p-4">
											<div className="flex items-center gap-4">
												<div className="rounded-full bg-purple-100 p-2">
													<BarChart className="h-4 w-4 text-purple-600" />
												</div>
												<div>
													<p className="font-medium">
														System Design: E-commerce Platform
													</p>
													<p className="text-sm text-muted-foreground">
														Hard difficulty • 45 minutes
													</p>
												</div>
											</div>
											<div className="text-right">
												<p className="font-medium">7.2/10</p>
												<p className="text-sm text-muted-foreground">
													1 week ago
												</p>
											</div>
										</div>
									</div>
								</CardContent>
								<CardFooter className="border-t p-4">
									<Link
										href="/dashboard/history"
										className="text-sm text-purple-600 hover:text-purple-500"
									>
										View all activity
									</Link>
								</CardFooter>
							</Card>
						</div>

						{/* Recommended Interviews */}
						<div>
							<div className="flex items-center justify-between mb-4">
								<h2 className="text-xl font-bold">Recommended for You</h2>
								<Link href="/interviews">
									<Button variant="outline" size="sm">
										View all
									</Button>
								</Link>
							</div>
							<div className="grid gap-4 md:grid-cols-3">
								<Card>
									<CardHeader>
										<div className="flex items-center gap-2 mb-2">
											<div className="rounded-full bg-purple-100 p-2">
												<Code className="h-4 w-4 text-purple-600" />
											</div>
											<span className="text-sm font-medium text-purple-600">
												Technical
											</span>
										</div>
										<CardTitle>System Design Patterns</CardTitle>
										<CardDescription>
											Practice implementing common design patterns in real-world
											scenarios.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Clock className="h-4 w-4" />
											<span>30 minutes</span>
										</div>
										<div className="mt-2 flex items-center gap-2">
											<span className="inline-block h-2 w-2 rounded-full bg-orange-500" />
											<span className="text-sm">Medium difficulty</span>
										</div>
									</CardContent>
									<CardFooter>
										<Link href="/interview/technical-1">
											<Button className="w-full">Start Interview</Button>
										</Link>
									</CardFooter>
								</Card>
								<Card>
									<CardHeader>
										<div className="flex items-center gap-2 mb-2">
											<div className="rounded-full bg-purple-100 p-2">
												<Users className="h-4 w-4 text-purple-600" />
											</div>
											<span className="text-sm font-medium text-purple-600">
												Behavioral
											</span>
										</div>
										<CardTitle>Conflict Resolution</CardTitle>
										<CardDescription>
											Improve your ability to discuss how you handle workplace
											conflicts.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Clock className="h-4 w-4" />
											<span>20 minutes</span>
										</div>
										<div className="mt-2 flex items-center gap-2">
											<span className="inline-block h-2 w-2 rounded-full bg-green-500" />
											<span className="text-sm">Easy difficulty</span>
										</div>
									</CardContent>
									<CardFooter>
										<Link href="/interview/behavioral-1">
											<Button className="w-full">Start Interview</Button>
										</Link>
									</CardFooter>
								</Card>
								<Card>
									<CardHeader>
										<div className="flex items-center gap-2 mb-2">
											<div className="rounded-full bg-purple-100 p-2">
												<BarChart className="h-4 w-4 text-purple-600" />
											</div>
											<span className="text-sm font-medium text-purple-600">
												System Design
											</span>
										</div>
										<CardTitle>Distributed Cache System</CardTitle>
										<CardDescription>
											Design a scalable distributed caching system for a
											high-traffic application.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center gap-2 text-sm text-muted-foreground">
											<Clock className="h-4 w-4" />
											<span>45 minutes</span>
										</div>
										<div className="mt-2 flex items-center gap-2">
											<span className="inline-block h-2 w-2 rounded-full bg-red-500" />
											<span className="text-sm">Hard difficulty</span>
										</div>
									</CardContent>
									<CardFooter>
										<Link href="/interview/system-design-1">
											<Button className="w-full">Start Interview</Button>
										</Link>
									</CardFooter>
								</Card>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}
