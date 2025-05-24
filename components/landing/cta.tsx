import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const CTA = () => {
	return (
		<div className="container px-4 md:px-6">
			<div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
				<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
					Ready to ace your next interview?
				</h2>
				<p className="text-xl text-muted-foreground">
					Join thousands of successful candidates who landed their dream jobs
					with Prepy.
				</p>
				<Link href="/signup">
					<Button size="lg" className=" text-white mt-4">
						Get started for free
						<ArrowRight className="ml-2 h-4 w-4" />
					</Button>
				</Link>
				<p className="text-sm text-muted-foreground mt-4">
					No credit card required • Free plan available
				</p>
			</div>
		</div>
	);
};

export default CTA;
