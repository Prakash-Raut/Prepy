import { MotionDiv } from "@/lib/dynamic-motion";
import Link from "next/link";

const CTA = () => {
	return (
		<div className="container relative mx-auto px-4 md:px-6 py-8 rounded-2xl overflow-hidden">
			<div className="absolute inset-0 bg-gradient-to-br from-sky-900 to-sky-700 opacity-95 z-0" />

			<div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
				<div className="absolute top-1/4 left-1/4 w-72 h-72 bg-sky-300 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float" />
				<div
					className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-sky-400 rounded-full mix-blend-overlay filter blur-3xl opacity-20 animate-float"
					style={{ animationDelay: "2s" }}
				/>
			</div>
			<div className="container relative flex flex-col items-center text-center space-y-4 md:space-y-6 max-w-3xl mx-auto">
				<MotionDiv
					initial={{ opacity: 0, y: 20 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true }}
					transition={{ duration: 0.5 }}
				>
					<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
						Ready to{" "}
						<span className="relative inline-block">
							<span className="relative z-10">ace</span>
							<span className="absolute bottom-1 left-0 w-full h-3 bg-blue-400/30 -z-10 transform -rotate-1" />
						</span>{" "}
						your next interview?
					</h2>
					<p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto">
						Join thousands of professionals who've landed their dream jobs using
						Prepy. Start your free trial today.
					</p>
				</MotionDiv>
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
