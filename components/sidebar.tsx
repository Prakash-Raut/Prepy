"use client";

import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { authClient } from "@/lib/auth-client";
import { Home, Search, Settings, UserIcon, Video } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export function Sidebar() {
	const router = useRouter();
	const pathname = usePathname();

	const isActive = (path: string) => {
		return pathname === path;
	};

	const navItems = [
		{
			name: "Home",
			href: "/home",
			icon: Home,
		},
		{
			name: "Explore",
			href: "/explore",
			icon: Search,
		},
		{
			name: "Interviews",
			href: "/interview-list",
			icon: Video,
		},
		{
			name: "Settings",
			href: "/settings",
			icon: Settings,
		},
	];

	const signOut = async () => {
		await authClient.signOut({
			fetchOptions: {
				onSuccess: () => {
					router.push("/sign-in");
				},
			},
		});
	};

	return (
		<div className="fixed left-0 top-0 h-full w-[80px] border-r flex flex-col items-center py-6">
			{/* Logo */}
			<div className="mb-8">
				<div className="h-12 w-12 rounded-xl flex items-center justify-center">
					<Image src="/prepy-logo-2.png" alt="Logo" width={48} height={48} />
				</div>
			</div>

			{/* Navigation */}
			<nav className="flex flex-col items-center gap-6 flex-1">
				{navItems.map((item) => (
					<Link
						key={item.name}
						href={item.href}
						className="flex flex-col items-center w-full px-2 py-2 text-xs"
					>
						<div
							className={`rounded-2xl flex items-center justify-center group w-fit cursor-pointer p-2 text-gray-900 transition-all duration-300 ${isActive(item.href) ? "group-hover:bg-indigo-50 bg-indigo-50 hover:bg-indigo-50 hover:text-indigo-600" : ""}`}
						>
							<item.icon
								className={`h-5 w-6 mb-1 ${isActive(item.href) ? "h-6 w-6 shrink-0 mx-auto transition-all duration-300 text-indigo-600" : "group-hover:scale-110"}`}
							/>
						</div>

						<span>{item.name}</span>
					</Link>
				))}
			</nav>

			{/* User Profile */}
			<div className="mt-auto">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="outline">
							<UserIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="w-56" align="start">
						<DropdownMenuItem onClick={() => signOut()}>
							Log out
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</div>
	);
}
