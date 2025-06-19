"use client";

import { Download, Eye } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";

const interviews = [
	{
		id: 1,
		company: "TechCorp",
		position: "Senior Frontend Developer",
		date: "2024-01-15",
		status: "completed",
		score: 8.5,
		duration: "45 min",
	},
	{
		id: 2,
		company: "DataFlow Inc",
		position: "Full Stack Engineer",
		date: "2024-01-12",
		status: "completed",
		score: 7.8,
		duration: "60 min",
	},
	{
		id: 3,
		company: "AI Startup",
		position: "React Developer",
		date: "2024-01-18",
		status: "scheduled",
		score: null,
		duration: "45 min",
	},
	{
		id: 4,
		company: "CloudTech",
		position: "Software Engineer",
		date: "2024-01-10",
		status: "completed",
		score: 9.2,
		duration: "50 min",
	},
];

export function InterviewTable() {
	const getStatusBadge = (status: string) => {
		switch (status) {
			case "completed":
				return (
					<Badge
						variant="default"
						className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
					>
						Completed
					</Badge>
				);
			case "scheduled":
				return (
					<Badge
						variant="default"
						className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
					>
						Scheduled
					</Badge>
				);
			case "cancelled":
				return <Badge variant="destructive">Cancelled</Badge>;
			default:
				return <Badge variant="secondary">{status}</Badge>;
		}
	};

	const getScoreBadge = (score: number | null) => {
		if (score === null) return <span className="text-slate-400">-</span>;

		if (score >= 9)
			return (
				<Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300">
					Excellent
				</Badge>
			);
		if (score >= 8)
			return (
				<Badge className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
					Good
				</Badge>
			);
		if (score >= 7)
			return (
				<Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300">
					Average
				</Badge>
			);
		return (
			<Badge className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300">
				Needs Improvement
			</Badge>
		);
	};

	return (
		<div className="rounded-md border border-slate-200 dark:border-slate-800">
			<Table>
				<TableHeader>
					<TableRow className="border-slate-200 dark:border-slate-800">
						<TableHead className="text-slate-600 dark:text-slate-400">
							Company
						</TableHead>
						<TableHead className="text-slate-600 dark:text-slate-400">
							Position
						</TableHead>
						<TableHead className="text-slate-600 dark:text-slate-400">
							Date
						</TableHead>
						<TableHead className="text-slate-600 dark:text-slate-400">
							Status
						</TableHead>
						<TableHead className="text-slate-600 dark:text-slate-400">
							Score
						</TableHead>
						<TableHead className="text-slate-600 dark:text-slate-400">
							Duration
						</TableHead>
						<TableHead className="text-slate-600 dark:text-slate-400">
							Actions
						</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{interviews.map((interview) => (
						<TableRow
							key={interview.id}
							className="border-slate-200 dark:border-slate-800"
						>
							<TableCell className="font-medium text-slate-900 dark:text-slate-100">
								{interview.company}
							</TableCell>
							<TableCell className="text-slate-600 dark:text-slate-400">
								{interview.position}
							</TableCell>
							<TableCell className="text-slate-600 dark:text-slate-400">
								{new Date(interview.date).toLocaleDateString()}
							</TableCell>
							<TableCell>{getStatusBadge(interview.status)}</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<span className="text-slate-900 dark:text-slate-100">
										{interview.score || "-"}
									</span>
									{interview.score && getScoreBadge(interview.score)}
								</div>
							</TableCell>
							<TableCell className="text-slate-600 dark:text-slate-400">
								{interview.duration}
							</TableCell>
							<TableCell>
								<div className="flex items-center gap-2">
									<Button variant="ghost" size="sm">
										<Eye className="h-4 w-4" />
									</Button>
									{interview.status === "completed" && (
										<Button variant="ghost" size="sm">
											<Download className="h-4 w-4" />
										</Button>
									)}
								</div>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</div>
	);
}
