"use client";

import { EmptyState } from "@/components/general/empty-state";

export const ProcessingState = () => {
	return (
		<div className="bg-white rounded-lg px-4 py-5 flex flex-col gap-y-8 items-center justify-center">
			<EmptyState
				image="/upcoming.svg"
				title="Meeting completed"
				description="This meeting was completed, a summary will appear soon"
			/>
		</div>
	);
};
