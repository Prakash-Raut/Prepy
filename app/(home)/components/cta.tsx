import Link from "next/link";

const CTA = () => {
	return (
		<div className="container px-4 md:px-6 bg-sky-600 py-8 rounded-2xl">
			<div className="flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
				<h2 className="text-white text-4xl md:text-7xl font-medium tracking-tight max-w-xs md:max-w-xl text-center">
					Ready to ace your next interview?
				</h2>
				<p className="text-xl text-white">
					Join thousands of successful candidates who landed their dream jobs
					with Prepy.
				</p>
				<div className="flex flex-col items-center justify-center gap-2">
					<Link
						className="bg-white text-black font-semibold text-sm h-10 w-fit px-4 rounded-full flex items-center justify-center shadow-md"
						href="/signup"
					>
						Start Your Free Practice Today
					</Link>
					<span className="text-white text-sm">
						Cancel anytime, no questions asked
					</span>
				</div>
			</div>
		</div>
	);
};

export default CTA;
