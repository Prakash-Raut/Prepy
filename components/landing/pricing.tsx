import { CheckCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Pricing = () => {
	return (
		<div className="container px-4 md:px-6">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
					Simple, transparent pricing
				</h2>
				<p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
					Start for free, upgrade when you're ready
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
				<div className="flex flex-col p-6  rounded-xl border shadow-sm">
					<div className="mb-4">
						<h3 className="text-xl font-bold">Free</h3>
						<p className="text-muted-foreground">For casual preparation</p>
					</div>
					<div className="mb-4">
						<span className="text-4xl font-bold">$0</span>
						<span className="text-muted-foreground">/month</span>
					</div>
					<ul className="space-y-2 mb-6 flex-grow">
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">3 practice interviews/month</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Basic feedback</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Community access</span>
						</li>
					</ul>
					<Link href="/signup">
						<Button className="w-full" variant="outline">
							Get started
						</Button>
					</Link>
				</div>
				<div className="flex flex-col p-6 bg-gradient-to-b rounded-xl border border-blue-200 shadow-md relative">
					<div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-sky-600 text-white px-4 py-1 rounded-full text-sm font-medium">
						Most Popular
					</div>
					<div className="mb-4">
						<h3 className="text-xl font-bold">Pro</h3>
						<p className="text-muted-foreground">For serious job seekers</p>
					</div>
					<div className="mb-4">
						<span className="text-4xl font-bold">$29</span>
						<span className="text-muted-foreground">/month</span>
					</div>
					<ul className="space-y-2 mb-6 flex-grow">
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Unlimited interviews</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Detailed feedback & analysis</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Company-specific preparation</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Progress tracking</span>
						</li>
					</ul>
					<Link href="/signup">
						<Button className="w-full text-white">Get started</Button>
					</Link>
				</div>
				<div className="flex flex-col p-6  rounded-xl border shadow-sm">
					<div className="mb-4">
						<h3 className="text-xl font-bold">Enterprise</h3>
						<p className="text-muted-foreground">For teams & organizations</p>
					</div>
					<div className="mb-4">
						<span className="text-4xl font-bold">Custom</span>
					</div>
					<ul className="space-y-2 mb-6 flex-grow">
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Everything in Pro</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Team management</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Custom interview questions</span>
						</li>
						<li className="flex items-center gap-2">
							<CheckCircle className="h-4 w-4 text-green-500" />
							<span className="text-sm">Dedicated support</span>
						</li>
					</ul>
					<Link href="/contact">
						<Button className="w-full" variant="outline">
							Contact sales
						</Button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Pricing;
