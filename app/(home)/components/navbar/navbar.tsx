import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar = () => {
	return (
		<div className="bg-muted">
			<nav className="fixed top-6 inset-x-4 h-16 bg-background border dark:border-slate-700/70 max-w-screen-xl mx-auto rounded-full">
				<div className="h-full flex items-center justify-between mx-auto px-4">
					<div className="flex items-center gap-2">
						<div className="h-8 w-8 rounded-xl flex items-center justify-center">
							<Image
								src="/prepy-logo-2.png"
								alt="Logo"
								width={48}
								height={48}
							/>
						</div>
						<span className="text-xl font-bold">Prepy</span>
					</div>

					{/* Desktop Menu */}
					<NavMenu className="hidden md:block" />

					<div className="flex items-center gap-3">
						<Button
							variant="outline"
							className="hidden sm:inline-flex rounded-full"
							asChild
						>
							<Link href="/signin">Sign in</Link>
						</Button>
						<Button className="rounded-full">Try for Free</Button>

						{/* Mobile Menu */}
						<div className="md:hidden">
							<NavigationSheet />
						</div>
					</div>
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
