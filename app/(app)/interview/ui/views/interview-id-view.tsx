"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// import { CompletedState } from "../components/completed-state";
import {
	deleteUserInterview,
	getUserInterview,
} from "@/actions/user-interview";
import { ErrorState } from "@/components/general/error-state";
import { LoadingState } from "@/components/general/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import type { UserInterviewWithRelations } from "@/types";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
import { CompletedState } from "../components/completed-state";
import { InterviewIdViewHeader } from "../components/interview-id-view-header";
import { ProcessingState } from "../components/processing-state";
import { UpcomingState } from "../components/upcoming-state";

interface Props {
	interviewId: string;
	userId: string;
}

export function InterviewIdView({ interviewId, userId }: Props) {
	const router = useRouter();
	const queryClient = useQueryClient();

	const [updateinterviewDialogOpen, setUpdateinterviewDialogOpen] =
		useState(false);

	const { data, isLoading, error } = useQuery<UserInterviewWithRelations>({
		queryKey: ["user-interview", interviewId],
		queryFn: () => getUserInterview(interviewId, userId),
		initialData: () =>
			queryClient.getQueryData<UserInterviewWithRelations>([
				"user-interview",
				interviewId,
			]),
		staleTime: 5 * 60 * 1000, // 5 minutes
		refetchOnWindowFocus: false,
	});

	const removeInterview = useMutation({
		mutationKey: ["interview", interviewId],
		mutationFn: () => deleteUserInterview(interviewId, userId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["user-interview", interviewId],
			});
			router.push("/explore");
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});

	const [RemoveConfirmationDialog, confirmRemove] = useConfirm(
		"Are you sure?",
		"The folowing action will remove this interview.",
	);

	const handleRemoveinterview = async () => {
		const ok = await confirmRemove();
		if (!ok) return;
		removeInterview.mutate();
	};

	// Handle loading and error states
	if (isLoading) return <InterviewIdViewLoader />;
	if (error) return <InterviewIdViewError />;
	if (!data) return <InterviewIdViewError />;

	const isActive = data.status === "active";
	const isUpcoming = data.status === "upcoming";
	const isCancelled = data.status === "cancelled";
	const isCompleted = data.status === "completed";
	const isProcessing = data.status === "processing";

	return (
		<>
			<RemoveConfirmationDialog />
			<div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4">
				<InterviewIdViewHeader
					interviewId={interviewId}
					interviewName={data.interview.name}
					onEdit={() => setUpdateinterviewDialogOpen(true)}
					onRemove={handleRemoveinterview}
				/>
				{isCancelled && <CancelledState />}
				{isCompleted && <CompletedState data={data} />}
				{isProcessing && <ProcessingState />}
				{isUpcoming && <UpcomingState interviewId={interviewId} />}
				{isActive && <ActiveState interviewId={interviewId} />}
			</div>
		</>
	);
}

export const InterviewIdViewLoader = () => {
	return (
		<LoadingState
			title="Loading interviews"
			description="This may take a few seconds"
		/>
	);
};

export const InterviewIdViewError = () => {
	return (
		<ErrorState
			title="Error loading interviews"
			description="Please try again later"
		/>
	);
};
