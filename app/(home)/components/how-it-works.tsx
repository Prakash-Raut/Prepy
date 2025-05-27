import { Button } from "@/components/ui/button";

const HowItWorks = () => {
	return (
		<div className="container mx-auto px-4 md:px-6">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
					Your Path to Interview <span className="text-gradient">Success</span>
				</h2>
				<p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
					Our proven three-step process will transform your interview
					performance and confidence.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
				<div className="flex flex-col items-center text-center p-6">
					<div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
						<span className="text-2xl font-bold text-blue-600">1</span>
					</div>
					<h3 className="text-xl font-bold mb-2">Choose your interview</h3>
					<p className="text-muted-foreground">
						Select from technical, behavioral, or system design interviews with
						your preferred difficulty and duration.
					</p>
				</div>
				<div className="flex flex-col items-center text-center p-6">
					<div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
						<span className="text-2xl font-bold text-blue-600">2</span>
					</div>
					<h3 className="text-xl font-bold mb-2">Practice with AI</h3>
					<p className="text-muted-foreground">
						Engage in a realistic interview with our AI interviewer that adapts
						to your responses in real-time.
					</p>
				</div>
				<div className="flex flex-col items-center text-center p-6">
					<div className="rounded-full bg-blue-100 w-16 h-16 flex items-center justify-center mb-4">
						<span className="text-2xl font-bold text-blue-600">3</span>
					</div>
					<h3 className="text-xl font-bold mb-2">Get detailed feedback</h3>
					<p className="text-muted-foreground">
						Receive personalized feedback, improvement suggestions, and track
						your progress over time.
					</p>
				</div>
			</div>

			<div className="mt-20 bg-blue-50 rounded-2xl p-8 md:p-12 overflow-hidden relative">
				<div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
					<div>
						<h3 className="text-2xl md:text-3xl font-bold mb-4">
							See Prepy in Action
						</h3>
						<p className="text-gray-600 mb-6">
							Watch how our AI-powered platform simulates realistic interviews,
							provides real-time feedback, and helps you improve with each
							practice session.
						</p>
						<Button className="bg-blue-800 hover:bg-blue-700 text-white group">
							<span className="flex items-center">
								<svg
									className="w-5 h-5 mr-2"
									fill="currentColor"
									viewBox="0 0 20 20"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>Watch Demo</title>
									<path
										fillRule="evenodd"
										d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
										clipRule="evenodd"
									/>
								</svg>
								Watch Demo
							</span>
						</Button>
					</div>
					<div className="relative">
						<div className="aspect-video bg-white rounded-lg shadow-lg overflow-hidden relative group cursor-pointer">
							<div className="absolute inset-0 flex items-center justify-center">
								<div className="w-20 h-20 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
									<svg
										className="w-10 h-10"
										fill="currentColor"
										viewBox="0 0 20 20"
										xmlns="http://www.w3.org/2000/svg"
									>
										<title>Watch Demo</title>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
											clipRule="evenodd"
										/>
									</svg>
								</div>
							</div>
							<img
								src="https://images.unsplash.com/photo-1633158829585-23ba8f7c8caf?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80"
								alt="Prepy demo video thumbnail"
								className="w-full h-full object-cover opacity-80"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default HowItWorks;
