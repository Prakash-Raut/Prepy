"use client";

import {
	BellIcon,
	PanelLeftCloseIcon,
	PanelLeftIcon,
	SearchIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useSidebar } from "@/components/ui/sidebar";
import { Badge } from "../ui/badge";
import { DashboardCommand } from "./dashboard-command";

export const DashboardNavbar = () => {
	const [commandOpen, setCommandOpen] = useState(false);
	const { state, toggleSidebar, isMobile } = useSidebar();

	useEffect(() => {
		const down = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setCommandOpen((open) => !open);
			}
		};
		document.addEventListener("keydown", down);
		return () => document.removeEventListener("keydown", down);
	}, []);

	return (
		<>
			<DashboardCommand open={commandOpen} setOpen={setCommandOpen} />
			<nav className="flex px-4 gap-x-2 items-center justify-between py-3 border-b bg-background">
				<Button className="size-9 " variant="outline" onClick={toggleSidebar}>
					{state === "collapsed" || isMobile ? (
						<PanelLeftIcon className="size-4" />
					) : (
						<PanelLeftCloseIcon className="size-4" />
					)}
				</Button>
				<Button
					className="h-9 w-[440px] justify-start font-normal text-muted-foreground hover:text-muted-foreground"
					variant="outline"
					size="sm"
					onClick={() => setCommandOpen((open) => !open)}
				>
					<SearchIcon className="size-4" />
					<span className="ml-2">Search</span>
					<kbd className="ml-auto pointer-events-none inline-flex h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium text-muted-foreground opacity-100">
						<span>&#8984;</span>K
					</kbd>
				</Button>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" size="icon" className="relative h-9 w-9">
							<BellIcon className="h-4 w-4" />
							<Badge
								variant="destructive"
								className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 text-xs"
							>
								3
							</Badge>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent align="end" className="w-80">
						<div className="p-4 border-b border-slate-200 dark:border-slate-700">
							<h4 className="font-semibold">Notifications</h4>
						</div>
						<div className="max-h-64 overflow-y-auto">
							<DropdownMenuItem className="flex flex-col items-start p-4">
								<div className="font-medium">Interview Scheduled</div>
								<div className="text-sm text-slate-500 dark:text-slate-400">
									Your interview with TechCorp is scheduled for tomorrow at 2 PM
								</div>
								<div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
									2 hours ago
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className="flex flex-col items-start p-4">
								<div className="font-medium">Feedback Available</div>
								<div className="text-sm text-slate-500 dark:text-slate-400">
									Your interview feedback from DataCorp is now available
								</div>
								<div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
									1 day ago
								</div>
							</DropdownMenuItem>
							<DropdownMenuItem className="flex flex-col items-start p-4">
								<div className="font-medium">Practice Session Complete</div>
								<div className="text-sm text-slate-500 dark:text-slate-400">
									Your AI practice session has been analyzed
								</div>
								<div className="text-xs text-slate-400 dark:text-slate-500 mt-1">
									2 days ago
								</div>
							</DropdownMenuItem>
						</div>
					</DropdownMenuContent>
				</DropdownMenu>
			</nav>
		</>
	);
};
