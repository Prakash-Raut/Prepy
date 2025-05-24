import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
	return (
		<header className="border-b">
			<div className="container flex items-center justify-between py-4">
				<div className="flex items-center gap-2">
					<div className="h-8 w-8 rounded-xl flex items-center justify-center">
						<Image src="/prepy-logo-2.png" alt="Logo" width={48} height={48} />
					</div>
					<span className="text-xl font-bold">Prepy</span>
				</div>
				<nav className="hidden md:flex items-center gap-6">
					<Link
						href="#features"
						className="text-sm font-medium transition-colors"
					>
						Features
					</Link>
					<Link
						href="#how-it-works"
						className="text-sm font-medium transition-colors"
					>
						How it works
					</Link>
					<Link
						href="#testimonials"
						className="text-sm font-medium transition-colors"
					>
						Testimonials
					</Link>
					<Link
						href="#pricing"
						className="text-sm font-medium transition-colors"
					>
						Pricing
					</Link>
				</nav>
				<div className="flex items-center gap-4">
					<Link href="/signin">
						<Button variant="ghost" size="sm">
							Sign in
						</Button>
					</Link>
					<Link href="/signup">
						<Button size="sm" className="text-white">
							Sign up
						</Button>
					</Link>
				</div>
			</div>
		</header>
	);
};

export default Navbar;
