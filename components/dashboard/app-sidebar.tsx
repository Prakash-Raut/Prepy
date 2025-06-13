"use client";

import {
	HomeIcon,
	type LucideIcon,
	SearchIcon,
	Settings2Icon,
	VideoIcon,
} from "lucide-react";
import type * as React from "react";

import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Separator } from "../ui/separator";
import { NavMain } from "./nav-main";
import { NavUser } from "./nav-user";

const navMenu: {
	title: string;
	url: string;
	icon?: LucideIcon;
	isActive?: boolean;
	items?: {
		title: string;
		url: string;
	}[];
}[] = [
	{
		title: "Home",
		url: "/home",
		icon: HomeIcon,
		isActive: true,
	},
	{
		icon: SearchIcon,
		title: "Explore",
		url: "/explore",
	},
	{
		icon: VideoIcon,
		title: "Interviews",
		url: "/interview",
	},
	{
		icon: Settings2Icon,
		title: "Settings",
		url: "/settings",
	},
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
	const router = useRouter();
	return (
		<Sidebar collapsible="icon" {...props}>
			<SidebarHeader>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton
							size="lg"
							onClick={() => router.push("/")}
							className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
						>
							<div className="flex aspect-square size-8 items-center justify-center rounded-lg">
								<Image
									src="/interview.svg"
									alt="Prep AI"
									width={36}
									height={36}
									priority
								/>
							</div>
							<div className="grid flex-1 text-left text-sm leading-tight">
								<p className="text-2xl font-semibold text-white">Prep AI</p>
							</div>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarHeader>
			<div className="px-4 py-2">
				<Separator className="opacity-10 text-[#5D6B68]" />
			</div>
			<SidebarContent>
				<NavMain items={navMenu} />
			</SidebarContent>
			<SidebarFooter>
				<NavUser />
			</SidebarFooter>
			<SidebarRail />
		</Sidebar>
	);
}
