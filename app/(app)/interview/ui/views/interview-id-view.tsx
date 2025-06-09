"use client";

import { deleteInterview, getInterview } from "@/actions/interview";
import { ErrorState } from "@/components/error-state";
import { LoadingState } from "@/components/loading-state";
import { useConfirm } from "@/hooks/use-confirm";
import {
	useMutation,
	useQueryClient,
	useSuspenseQuery,
} from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ActiveState } from "../components/active-state";
import { CancelledState } from "../components/cancelled-state";
// import { CompletedState } from "../components/completed-state";
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

	const { data } = useSuspenseQuery({
		queryKey: ["interview", interviewId],
		queryFn: () => getInterview(interviewId, userId),
	});

	const removeInterview = useMutation({
		mutationKey: ["interview", interviewId],
		mutationFn: () => deleteInterview(interviewId, userId),
		onSuccess: async () => {
			await queryClient.invalidateQueries({
				queryKey: ["interview", interviewId],
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

	const isActive = data.status === "active";
	const isUpcoming = data.status === "upcoming";
	const isCancelled = data.status === "cancelled";
	const isCompleted = data.status === "completed";
	const isProcessing = data.status === "processing";

	return (
		<>
			<RemoveConfirmationDialog />
			{/* <UpdateinterviewDialog
				open={updateinterviewDialogOpen}
				onOpenChange={setUpdateinterviewDialogOpen}
				initialValues={data}
			/> */}
			<div className="flex-1 p-4 md:px-8 flex flex-col gap-y-4">
				<InterviewIdViewHeader
					interviewId={interviewId}
					interviewName={data.name}
					onEdit={() => setUpdateinterviewDialogOpen(true)}
					onRemove={handleRemoveinterview}
				/>
				{isCancelled && <CancelledState />}
				{isCompleted && "Completed"}
				{isProcessing && <ProcessingState />}
				{isUpcoming && (
					<UpcomingState
						interviewId={interviewId}
						onCancelInterview={handleRemoveinterview}
						isCancelling={removeInterview.isPending}
					/>
				)}
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
