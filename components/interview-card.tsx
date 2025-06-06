import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types";
import { Clock } from "lucide-react";
import Link from "next/link";

const bgMap = {
	easy: "bg-sky-100",
	medium: "bg-amber-100",
	hard: "bg-red-100",
};

const difficultyMap = {
	easy: "bg-green-500 hover:bg-green-600",
	medium: "bg-amber-500 hover:bg-amber-600",
	hard: "bg-red-500 hover:bg-red-600",
};

const InterviewCard = ({ interview }: { interview: Interview }) => {
	return (
		<Link
			href={`/practice-interview/${interview.id}`}
			key={interview.id}
			className="block"
		>
			<div className="rounded-xl overflow-hidden h-full flex flex-col">
				<div
					className={cn(
						"p-8 flex items-center justify-center",
						bgMap[interview.difficulty],
					)}
				>
					<div className="h-16 w-16 rounded-full flex items-center justify-center shadow-md">
						<span className="text-indigo-500 font-bold text-2xl">P</span>
					</div>
				</div>
				<div className="p-4 border border-t-0 rounded-b-xl flex-1 flex flex-col">
					<h3 className="font-bold text-lg">{interview.title}</h3>
					<p className="text-sm">{interview.description}</p>
					<div className="mt-auto pt-4 flex items-center gap-4">
						<div className="flex items-center gap-1">
							<Clock className="h-4 w-4" />
							<span className="text-sm">{interview.duration}m</span>
						</div>
						<Badge
							className={cn(
								"text-sm text-white capitalize",
								difficultyMap[interview.difficulty],
							)}
						>
							{interview.difficulty}
						</Badge>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default InterviewCard;
