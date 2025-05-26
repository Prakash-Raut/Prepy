import { BarChart, CheckCircle, Code, Users } from "lucide-react";

const Feature = () => {
	return (
		<div className="container px-4 md:px-6">
			<div className="text-center mb-12">
				<h2 className="text-3xl font-bold tracking-tighter md:text-4xl">
					Everything you need to succeed
				</h2>
				<p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
					Comprehensive interview preparation tools designed to help you land
					your dream job.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				<div className="flex flex-col p-6  rounded-xl border shadow-sm">
					<div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
						<Code className="h-6 w-6 text-blue-600" />
					</div>
					<h3 className="text-xl font-bold mb-2">Technical Interviews</h3>
					<p className="text-muted-foreground flex-grow">
						Practice coding challenges, algorithms, and data structures with
						real-time feedback.
					</p>
					<div className="mt-4 pt-4 border-t">
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">Multiple programming languages</span>
							</li>
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">Code execution & validation</span>
							</li>
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">Detailed explanations</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex flex-col p-6  rounded-xl border shadow-sm">
					<div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
						<Users className="h-6 w-6 text-blue-600" />
					</div>
					<h3 className="text-xl font-bold mb-2">Behavioral Interviews</h3>
					<p className="text-muted-foreground flex-grow">
						Master the art of storytelling and showcase your soft skills with
						structured practice.
					</p>
					<div className="mt-4 pt-4 border-t">
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">STAR method guidance</span>
							</li>
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">Company-specific questions</span>
							</li>
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">Personalized feedback</span>
							</li>
						</ul>
					</div>
				</div>
				<div className="flex flex-col p-6  rounded-xl border shadow-sm">
					<div className="rounded-full bg-blue-100 w-12 h-12 flex items-center justify-center mb-4">
						<BarChart className="h-6 w-6 text-blue-600" />
					</div>
					<h3 className="text-xl font-bold mb-2">System Design</h3>
					<p className="text-muted-foreground flex-grow">
						Learn to design scalable systems and articulate your thought process
						clearly.
					</p>
					<div className="mt-4 pt-4 border-t">
						<ul className="space-y-2">
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">Interactive whiteboarding</span>
							</li>
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">Architecture best practices</span>
							</li>
							<li className="flex items-center gap-2">
								<CheckCircle className="h-4 w-4 text-green-500" />
								<span className="text-sm">Real-world scenarios</span>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Feature;
