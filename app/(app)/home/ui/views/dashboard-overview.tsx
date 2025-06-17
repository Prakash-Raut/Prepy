"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	ArrowRight,
	Calendar,
	CheckCircle,
	FileText,
	Play,
	TrendingUp,
} from "lucide-react";
import { ActivityTimeline } from "../components/activity-timeline";
import { InterviewTable } from "../components/interview-table";
import { PerformanceChart } from "../components/performance-chart";

const metrics = [
	{
		title: "Upcoming Interviews",
		value: "3",
		description: "Next 7 days",
		icon: Calendar,
		color: "text-blue-600 dark:text-blue-400",
		bgColor: "bg-blue-50 dark:bg-blue-950/50",
	},
	{
		title: "Completed Interviews",
		value: "12",
		description: "This month",
		icon: CheckCircle,
		color: "text-green-600 dark:text-green-400",
		bgColor: "bg-green-50 dark:bg-green-950/50",
	},
	{
		title: "Average Score",
		value: "8.4",
		description: "+0.8 from last month",
		icon: TrendingUp,
		color: "text-purple-600 dark:text-purple-400",
		bgColor: "bg-purple-50 dark:bg-purple-950/50",
	},
	{
		title: "Practice Sessions",
		value: "24",
		description: "This week",
		icon: Play,
		color: "text-orange-600 dark:text-orange-400",
		bgColor: "bg-orange-50 dark:bg-orange-950/50",
	},
];

const quickActions = [
	{
		title: "Start Practice Interview",
		description: "Practice with AI interviewer",
		icon: Play,
		color: "bg-blue-600 hover:bg-blue-700",
	},
	{
		title: "Schedule Interview",
		description: "Book a new interview slot",
		icon: Calendar,
		color: "bg-green-600 hover:bg-green-700",
	},
	{
		title: "View Feedback",
		description: "Check latest interview feedback",
		icon: FileText,
		color: "bg-purple-600 hover:bg-purple-700",
	},
];

type Props = {
	userId: string;
	userName: string;
};

export function DashboardOverview({ userId, userName }: Props) {
	return (
		<div className="space-y-6">
			{/* Welcome Section */}
			<div className="flex items-center gap-2">
				<Cube />
				<div className="flex flex-col gap-2">
					<h1 className="text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
						Welcome back, {userName}! 👋
					</h1>
					<p className="text-slate-600 dark:text-slate-400">
						Here's what's happening with your interviews today.
					</p>
				</div>
			</div>

			{/* Metrics Cards */}
			<div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
				{metrics.map((metric) => (
					<Card
						key={metric.title}
						className="border-slate-200 dark:border-slate-800"
					>
						<CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
							<CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
								{metric.title}
							</CardTitle>
							<div className={`p-2 rounded-lg ${metric.bgColor}`}>
								<metric.icon className={`h-4 w-4 ${metric.color}`} />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
								{metric.value}
							</div>
							<p className="text-xs text-slate-500 dark:text-slate-400">
								{metric.description}
							</p>
						</CardContent>
					</Card>
				))}
			</div>

			{/* Quick Actions */}
			<Card className="border-slate-200 dark:border-slate-800">
				<CardHeader>
					<CardTitle className="text-slate-900 dark:text-slate-100">
						Quick Actions
					</CardTitle>
					<CardDescription>Get started with common tasks</CardDescription>
				</CardHeader>
				<CardContent>
					<div className="grid gap-4 md:grid-cols-3">
						{quickActions.map((action) => (
							<Button
								key={action.title}
								variant="outline"
								className="h-auto p-4 flex flex-col items-start gap-2 border-slate-200 dark:border-slate-700 hover:border-slate-300 dark:hover:border-slate-600"
							>
								<div className="flex items-center gap-2 w-full">
									<div className={`p-2 rounded-lg text-white ${action.color}`}>
										<action.icon className="h-4 w-4" />
									</div>
									<ArrowRight className="h-4 w-4 ml-auto text-slate-400" />
								</div>
								<div className="text-left">
									<div className="font-medium text-slate-900 dark:text-slate-100">
										{action.title}
									</div>
									<div className="text-sm text-slate-500 dark:text-slate-400">
										{action.description}
									</div>
								</div>
							</Button>
						))}
					</div>
				</CardContent>
			</Card>

			{/* Charts and Tables Grid */}
			<div className="grid gap-6 lg:grid-cols-2">
				{/* Performance Chart */}
				<Card className="border-slate-200 dark:border-slate-800">
					<CardHeader>
						<CardTitle className="text-slate-900 dark:text-slate-100">
							Performance Trends
						</CardTitle>
						<CardDescription>Your interview scores over time</CardDescription>
					</CardHeader>
					<CardContent>
						<PerformanceChart />
					</CardContent>
				</Card>

				{/* Activity Timeline */}
				<Card className="border-slate-200 dark:border-slate-800">
					<CardHeader>
						<CardTitle className="text-slate-900 dark:text-slate-100">
							Recent Activity
						</CardTitle>
						<CardDescription>Your latest interview activities</CardDescription>
					</CardHeader>
					<CardContent>
						<ActivityTimeline />
					</CardContent>
				</Card>
			</div>

			{/* Interview Table */}
			<Card className="border-slate-200 dark:border-slate-800">
				<CardHeader>
					<CardTitle className="text-slate-900 dark:text-slate-100">
						Recent Interviews
					</CardTitle>
					<CardDescription>
						Your latest interview sessions and results
					</CardDescription>
				</CardHeader>
				<CardContent>
					<InterviewTable />
				</CardContent>
			</Card>
		</div>
	);
}

function Cube() {
	return (
		<div className="size-40 p-10 perspective-1000">
			<div className="size-20 [transform-style:preserve-3d] animate-[spinCube_5s_linear_infinite]">
				<div className="absolute inset-0 translate-z-12 bg-sky-300/75 text-center text-4xl leading-20 font-bold text-sky-900 backface-visible dark:bg-sky-400/85 dark:text-white">
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
			<style>
				{`
          @keyframes spinCube {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
          }
        `}
			</style>
		</div>
	);
}
