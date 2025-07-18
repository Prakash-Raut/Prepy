"use client";

import { LoaderIcon } from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { generateAvatarUri } from "@/lib/avatar";
import { InterviewConnect } from "./interview-connect";

interface Props {
	interviewId: string;
	interviewName: string;
}

export const InterviewProvider = ({ interviewId, interviewName }: Props) => {
	const { data, isPending } = authClient.useSession();

	if (!data || isPending) {
		return (
			<div className="flex h-screen items-center justify-center bg-radial from-sidebar-accent to-sidebar">
				<LoaderIcon className="size-6 animate-spin text-white" />
			</div>
		);
	}

	return (
		<InterviewConnect
			interviewId={interviewId}
			interviewName={interviewName}
			userId={data.user.id}
			userName={data.user.name}
			userImage={
				data.user.image ??
				generateAvatarUri({ seed: data.user.name, variant: "initials" })
			}
		/>
	);
};
