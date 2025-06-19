"use client";

import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { type Dispatch, type SetStateAction, useState } from "react";
import { getAllInterview } from "@/actions/interview";
import {
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
	CommandResponsiveDialog,
} from "@/components/ui/command";
import { GeneratedAvatar } from "../general/generated-avatar";

type Props = {
	open: boolean;
	setOpen: Dispatch<SetStateAction<boolean>>;
};

export const DashboardCommand = ({ open, setOpen }: Props) => {
	const router = useRouter();
	const [search, setSearch] = useState("");

	const interviews = useQuery({
		queryKey: ["interviews"],
		queryFn: () =>
			getAllInterview({
				page: "1",
				pageSize: "10",
			}),
	});

	return (
		<CommandResponsiveDialog
			shouldFilter={false}
			open={open}
			onOpenChange={setOpen}
		>
			<CommandInput
				placeholder="Find an interview..."
				value={search}
				onValueChange={(value) => setSearch(value)}
			/>
			<CommandList>
				<CommandGroup heading="Interviews">
					<CommandEmpty>
						<span className="text-sm text-muted-foreground">
							No interviews found
						</span>
					</CommandEmpty>
					{interviews.data?.items.map((interview) => (
						<CommandItem
							key={interview.id}
							onSelect={() => {
								router.push(`/interview/${interview.id}`);
								setOpen(false);
							}}
						>
							<GeneratedAvatar
								seed={interview.name}
								variant="initials"
								className="size-5"
							/>
							{interview.name}
						</CommandItem>
					))}
				</CommandGroup>
			</CommandList>
		</CommandResponsiveDialog>
	);
};
