import Link from "next/link";

const Footer = () => {
	return (
		<footer className="border-t py-12 px-24 mt-auto">
			<div className="container px-4 md:px-6">
				<div className="grid grid-cols-2 md:grid-cols-4 gap-8">
					<div>
						<div className="flex items-center gap-2 mb-4">
							<div className=" w-8 h-8 rounded-md" />
							<span className="text-xl font-bold">Prepy</span>
						</div>
						<p className="text-sm text-muted-foreground">
							AI-powered interview preparation for ambitious professionals.
						</p>
					</div>
					<div>
						<h3 className="font-medium mb-4">Product</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link href="#features" className=" transition-colors">
									Features
								</Link>
							</li>
							<li>
								<Link href="#pricing" className=" transition-colors">
									Pricing
								</Link>
							</li>
							<li>
								<Link href="#" className=" transition-colors">
									Testimonials
								</Link>
							</li>
							<li>
								<Link href="#" className=" transition-colors">
									FAQ
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-medium mb-4">Company</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link href="#" className=" transition-colors">
									About
								</Link>
							</li>
							<li>
								<Link href="#" className=" transition-colors">
									Blog
								</Link>
							</li>
							<li>
								<Link href="#" className=" transition-colors">
									Careers
								</Link>
							</li>
							<li>
								<Link href="#" className=" transition-colors">
									Contact
								</Link>
							</li>
						</ul>
					</div>
					<div>
						<h3 className="font-medium mb-4">Legal</h3>
						<ul className="space-y-2 text-sm text-muted-foreground">
							<li>
								<Link href="#" className=" transition-colors">
									Privacy Policy
								</Link>
							</li>
							<li>
								<Link href="#" className=" transition-colors">
									Terms of Service
								</Link>
							</li>
							<li>
								<Link href="#" className=" transition-colors">
									Cookie Policy
								</Link>
							</li>
						</ul>
					</div>
				</div>
				<div className="border-t mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
					<p className="text-sm text-muted-foreground">
						© 2025 Prepy, Inc. All rights reserved.
					</p>
					<div className="flex space-x-4 mt-4 md:mt-0">
						<Link href="#" className="text-muted-foreground  transition-colors">
							<span className="sr-only">Twitter</span>
							Twitter
						</Link>
						<Link href="#" className="text-muted-foreground  transition-colors">
							<span className="sr-only">LinkedIn</span>
							LinkedIn
						</Link>
						<Link href="#" className="text-muted-foreground  transition-colors">
							<span className="sr-only">GitHub</span>
							GitHub
						</Link>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
