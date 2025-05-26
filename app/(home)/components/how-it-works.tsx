const HowItWorks = () => {
	return (
		<div className="container px-4 md:px-6">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
					How Prepy works
				</h2>
				<p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
					A simple three-step process to improve your interview skills
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
		</div>
	);
};

export default HowItWorks;
