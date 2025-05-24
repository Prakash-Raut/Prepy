import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import Link from "next/link";

type Interview = {
	id: string;
	title: string;
	description: string;
	duration: number;
	difficulty: string;
	category: string;
	backgroundColor: string;
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
					className={`${interview.backgroundColor} p-8 flex items-center justify-center`}
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
						<Button
							size="sm"
							className={`text-sm ${interview.difficulty === "Easy" ? "bg-green-500 text-white hover:bg-green-600" : interview.difficulty === "Medium" ? "bg-yellow-500 text-black hover:bg-yellow-600" : "bg-red-500 text-white hover:bg-red-600"}`}
						>
							{interview.difficulty}
						</Button>
					</div>
				</div>
			</div>
		</Link>
	);
};

export default InterviewCard;
