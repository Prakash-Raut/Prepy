import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";

const Hero = () => {
	return (
		<div className="container px-4 md:px-6">
			<div className="flex flex-col items-center text-center space-y-4 md:space-y-6">
				<div className="inline-block rounded-full bg-blue-100 px-3 py-1 text-sm font-medium text-sky-700 mb-4">
					YC S23 • Backed by top investors
				</div>
				<h1 className="text-4xl md:text-6xl font-bold tracking-tighter max-w-3xl">
					Ace your next interview with AI-powered preparation
				</h1>
				<p className="text-muted-foreground text-lg md:text-xl max-w-2xl">
					Practice technical, behavioral, and system design interviews with our
					AI interviewer. Get real-time feedback and improve your skills.
				</p>
				<div className="flex flex-col sm:flex-row gap-4 mt-4">
					<Link href="/signup">
						<Button size="lg" className="text-white">
							Get started for free
							<ArrowRight className="ml-2 h-4 w-4" />
						</Button>
					</Link>
					<Link href="#how-it-works">
						<Button size="lg" variant="outline">
							See how it works
						</Button>
					</Link>
				</div>
				<div className="mt-8 text-sm text-muted-foreground">
					No credit card required • Free plan available
				</div>
			</div>
		</div>
	);
};

export default Hero;
