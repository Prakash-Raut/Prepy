"use client";

import type { LucideIcon } from "lucide-react";

import { Collapsible, CollapsibleTrigger } from "@/components/ui/collapsible";
import {
	SidebarGroup,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function NavMain({
	items,
}: {
	items: {
		title: string;
		url: string;
		icon?: LucideIcon;
		isActive?: boolean;
		items?: {
			title: string;
			url: string;
		}[];
	}[];
}) {
	const pathname = usePathname();

	return (
		<SidebarGroup>
			<SidebarMenu>
				{items.map((item) => (
					<Collapsible
						key={item.title}
						asChild
						defaultOpen={item.isActive}
						className="group/collapsible"
					>
						<SidebarMenuItem>
							<CollapsibleTrigger asChild>
								<SidebarMenuButton
									tooltip={item.title}
									className={cn(
										"h-10 hover:bg-linear-to-r/oklch border border-transparent hover-border-[#5D6B680]/10 from sidebar-accent from-5% via-30% via-sidebar/50 to-sidebar/50",
										pathname === item.url &&
											"bg-linear-to-r/okclh border-[#5D6B680]/10",
									)}
									isActive={pathname === item.url}
									asChild
								>
									<Link href={item.url}>
										{item.icon && <item.icon className="size-5" />}
										<span className="text-sm font-medium tracking-wide">
											{item.title}
										</span>
									</Link>
								</SidebarMenuButton>
							</CollapsibleTrigger>
						</SidebarMenuItem>
					</Collapsible>
				))}
			</SidebarMenu>
		</SidebarGroup>
	);
}
