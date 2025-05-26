import { Button } from "@/components/ui/button";
import Image from "next/image";
import { NavMenu } from "./nav-menu";
import { NavigationSheet } from "./navigation-sheet";

const Navbar01Page = () => {
	return (
		<nav className="h-16 bg-background border-b">
			<div className="h-full flex items-center justify-between max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
				{/* <Logo /> */}
				<div className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-xl flex items-center justify-center">
						<Image src="/prepy-logo-2.png" alt="Logo" width={48} height={48} />
					</div>
					<span className="text-xl font-bold">Prepy</span>
				</div>

				{/* Desktop Menu */}
				<NavMenu className="hidden md:block" />

				<div className="flex items-center gap-3">
					<Button>Try for Free</Button>

					{/* Mobile Menu */}
					<div className="md:hidden">
						<NavigationSheet />
					</div>
				</div>
			</div>
		</nav>
	);
};

export default Navbar01Page;
