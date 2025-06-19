import { PlayIcon, VideoIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const Hero = () => {
	return (
		<main className="container mx-auto px-4 pt-8">
			<div className="max-w-4xl mx-auto text-center">
				{/* Badge */}
				<Badge
					variant="secondary"
					className="mb-8 bg-gray-100 text-gray-700 px-4 py-2 rounded-full"
				>
					<span className="mr-2">🎯</span>
					Introducing AI-powered mock interviews
				</Badge>

				{/* Main Headline */}
				<h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
					Ace your next <span className="text-sky-500">Interview</span>
					<br />
					<span className="text-gradient">with AI Preparation</span>
				</h1>

				{/* Subtitle */}
				<p className="text-xl text-gray-600 mb-12 max-w-2xl mx-auto leading-relaxed">
					Practice with our AI interviewer that adapts to your industry and
					role. Get real-time feedback, improve your answers, and land your
					dream job with confidence.
				</p>
				{/* CTA Buttons */}
				<div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
					<Button
						size="lg"
						className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
					>
						Start Free Practice
					</Button>
					<Button
						variant="outline"
						size="lg"
						className="text-gray-700 px-8 py-3 text-lg"
					>
						<VideoIcon size={20} />
						Watch Demo
					</Button>
				</div>

				{/* Video Demo Section */}
				<div className="relative max-w-4xl mx-auto">
					<div className="relative bg-gradient-to-br from-blue-400 via-blue-500 to-blue-600 rounded-3xl p-8 md:p-16 shadow-2xl overflow-hidden">
						{/* Gradient overlay for depth */}
						<div className="absolute inset-0 bg-gradient-to-t from-blue-600/20 to-transparent rounded-3xl" />

						{/* Mock interview interface preview */}
						<div className="relative z-10 bg-white/10 backdrop-blur-sm rounded-2xl p-6 mb-8 border border-white/20">
							<div className="flex items-center justify-between mb-4">
								<div className="flex items-center space-x-2">
									<div className="w-3 h-3 bg-red-400 rounded-full" />
									<div className="w-3 h-3 bg-yellow-400 rounded-full" />
									<div className="w-3 h-3 bg-green-400 rounded-full" />
								</div>
								<div className="text-white/80 text-sm font-medium">
									AI Mock Interview
								</div>
							</div>
							<div className="space-y-3">
								<div className="bg-white/20 rounded-lg p-3 text-left">
									<div className="text-white/90 text-sm font-medium mb-1">
										AI Interviewer
									</div>
									<div className="text-white/70 text-sm">
										{"Tell me about a challenging project you've worked on..."}
									</div>
								</div>
								<div className="bg-blue-500/30 rounded-lg p-3 text-right ml-8">
									<div className="text-white/90 text-sm font-medium mb-1">
										You
									</div>
									<div className="text-white/70 text-sm">
										{"In my previous role, I led a team to..."}
									</div>
								</div>
							</div>
						</div>

						{/* Play button */}
						<div className="relative z-10 flex items-center justify-center">
							<Button
								size="lg"
								className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-sm border border-white/30 hover:bg-white/30 transition-all duration-300 shadow-lg"
							>
								<PlayIcon
									className="h-8 w-8 text-white ml-1"
									fill="currentColor"
								/>
							</Button>
						</div>

						{/* Decorative elements */}
						<div className="absolute top-8 left-8 w-2 h-2 bg-white/30 rounded-full" />
						<div className="absolute top-12 right-12 w-3 h-3 bg-white/20 rounded-full" />
						<div className="absolute bottom-16 left-16 w-1.5 h-1.5 bg-white/40 rounded-full" />

						{/* Floating elements */}
						<div className="absolute top-1/4 right-8 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
							<div className="text-white/90 text-xs font-medium">
								Real-time Feedback
							</div>
							<div className="text-white/70 text-xs mt-1">Confidence: 85%</div>
						</div>

						<div className="absolute bottom-1/4 left-8 bg-white/10 backdrop-blur-sm rounded-lg p-3 border border-white/20">
							<div className="text-white/90 text-xs font-medium">
								Interview Progress
							</div>
							<div className="text-white/70 text-xs mt-1">Question 3 of 8</div>
						</div>
					</div>

					{/* Shadow effect */}
					<div className="absolute inset-0 bg-blue-600/20 rounded-3xl blur-3xl transform translate-y-8 -z-10" />
				</div>
			</div>
		</main>
	);
};

export default Hero;
