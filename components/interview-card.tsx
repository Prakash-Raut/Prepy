"use client";

import { createInterview } from "@/actions/interview";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Interview } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { Clock } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { GeneratedAvatar } from "./generated-avatar";

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
	userId: string;
}

export const InterviewCard = ({ interview, userId }: Props) => {
	const router = useRouter();

	const createMeeting = useMutation({
		mutationKey: ["interview", "create"],
		mutationFn: () =>
			createInterview(
				{
					name: interview.name,
					agentId: interview.agentId,
				},
				userId,
			),
		onSuccess: async () => {
			router.push(`/interview/${interview.id}`);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const handleCreateInterview = () => {
		createMeeting.mutate();
	};

	return (
		<div
			className="block cursor-pointer"
			onClick={handleCreateInterview}
			onKeyDown={(e) => {
				if (e.key === "Enter" || e.key === " ") {
					handleCreateInterview();
				}
			}}
		>
			<div className="rounded-xl overflow-hidden h-full flex flex-col">
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
				<div className="p-4 border border-t-0 rounded-b-xl flex-1 flex flex-col">
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
			</div>
		</div>
	);
};
