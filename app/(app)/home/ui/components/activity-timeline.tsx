"use client";

import { Calendar, CheckCircle, Clock, FileText, Play } from "lucide-react";

const activities = [
	{
		id: 1,
		type: "interview",
		title: "Interview Completed",
		description: "TechCorp - Senior Frontend Developer",
		time: "2 hours ago",
		icon: CheckCircle,
		color: "text-green-600 dark:text-green-400",
		bgColor: "bg-green-50 dark:bg-green-950/50",
	},
	{
		id: 2,
		type: "feedback",
		title: "Feedback Received",
		description: "DataFlow Inc interview feedback available",
		time: "1 day ago",
		icon: FileText,
		color: "text-blue-600 dark:text-blue-400",
		bgColor: "bg-blue-50 dark:bg-blue-950/50",
	},
	{
		id: 3,
		type: "practice",
		title: "Practice Session",
		description: "AI Mock Interview - JavaScript Fundamentals",
		time: "2 days ago",
		icon: Play,
		color: "text-purple-600 dark:text-purple-400",
		bgColor: "bg-purple-50 dark:bg-purple-950/50",
	},
	{
		id: 4,
		type: "scheduled",
		title: "Interview Scheduled",
		description: "AI Startup - React Developer position",
		time: "3 days ago",
		icon: Calendar,
		color: "text-orange-600 dark:text-orange-400",
		bgColor: "bg-orange-50 dark:bg-orange-950/50",
	},
	{
		id: 5,
		type: "reminder",
		title: "Upcoming Interview",
		description: "CloudTech interview in 2 hours",
		time: "1 week ago",
		icon: Clock,
		color: "text-red-600 dark:text-red-400",
		bgColor: "bg-red-50 dark:bg-red-950/50",
	},
];

export function ActivityTimeline() {
	return (
		<div className="space-y-4">
			{activities.map((activity, index) => (
				<div key={activity.id} className="flex items-start gap-4">
					<div className={`p-2 rounded-lg ${activity.bgColor} flex-shrink-0`}>
						<activity.icon className={`h-4 w-4 ${activity.color}`} />
					</div>
					<div className="flex-1 min-w-0">
						<div className="flex items-center justify-between">
							<h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
								{activity.title}
							</h4>
							<span className="text-xs text-slate-500 dark:text-slate-400">
								{activity.time}
							</span>
						</div>
						<p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
							{activity.description}
						</p>
					</div>
				</div>
			))}
		</div>
	);
}
