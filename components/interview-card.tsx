"use client";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { GeneratedAvatar } from "./generated-avatar";
import { Card, CardContent } from "./ui/card";

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

interface Props {
	interview: Interview;
}

export const InterviewCard = ({ interview }: Props) => {
	const router = useRouter();

	return (
		<Card
			className="block cursor-pointer p-0"
			onClick={() => router.push(`/interview/${interview.id}`)}
		>
			<CardContent className="rounded-xl overflow-hidden h-full flex flex-col p-0">
				<div
					className={cn(
						"p-8 flex items-center justify-center",
						bgMap[interview.difficulty as keyof typeof bgMap],
					)}
				>
					<GeneratedAvatar
						seed={interview.name}
						variant="initials"
						className="h-16 w-16"
					/>
				</div>
				<div className="p-4 flex-1 flex flex-col">
					<h3 className="font-bold text-lg">{interview.name}</h3>
					<p className="text-sm">{interview.description}</p>
					<div className="mt-auto pt-4 flex items-center gap-4">
						<div className="flex items-center gap-1">
							<Clock className="h-4 w-4" />
							<span className="text-sm">{interview.durationInMinutes}m</span>
						</div>
						<Badge
							className={cn(
								"text-sm text-white capitalize",
								difficultyMap[
									interview.difficulty as keyof typeof difficultyMap
								],
							)}
						>
							{interview.difficulty}
						</Badge>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};
