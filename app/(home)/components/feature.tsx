import { Button } from "@/components/ui/button";
import {
	Award,
	BarChart3,
	MessageSquare,
	Target,
	Video,
	Zap,
} from "lucide-react";

const features = [
	{
		id: 1,
		icon: <Zap className="w-10 h-10 text-white" />,
		title: "AI-Powered Interviews",
		description:
			"Our advanced AI simulates realistic interview scenarios tailored to your industry and role.",
	},
	{
		id: 2,
		icon: <Target className="w-10 h-10 text-white" />,
		title: "Personalized Feedback",
		description:
			"Get instant, detailed feedback on your responses to improve your interview skills.",
	},
	{
		id: 3,
		icon: <BarChart3 className="w-10 h-10 text-white" />,
		title: "Performance Analytics",
		description:
			"Track your progress over time with detailed metrics and improvement suggestions.",
	},
	{
		id: 4,
		icon: <Award className="w-10 h-10 text-white" />,
		title: "Industry-Specific Questions",
		description:
			"Practice with real questions from your target companies and industry verticals.",
	},
	{
		id: 5,
		icon: <Video className="w-10 h-10 text-white" />,
		title: "Video Recording",
		description:
			"Record your interviews to analyze your body language, tone, and presentation.",
	},
	{
		id: 6,
		icon: <MessageSquare className="w-10 h-10 text-white" />,
		title: "Communication Coaching",
		description:
			"Improve your communication skills with AI-powered language and delivery analysis.",
	},
];

const Feature = () => {
	return (
		<div className="container mx-auto px-4 md:px-6">
			<div className="text-center mb-12">
				<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
					Everything You Need to <span className="text-gradient">Succeed</span>
				</h2>
				<p className="mt-4 text-xl text-muted-foreground max-w-2xl mx-auto">
					Comprehensive interview preparation tools designed to help you land
					your dream job.
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
				{features.map((feature) => (
					<div
						key={feature.id}
						className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100"
					>
						<div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-blue-600 to-blue-800 transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out z-0 opacity-90" />

						<div className="relative z-10 p-8">
							<div className="mb-6 bg-blue-100 group-hover:bg-blue-700/30 w-16 h-16 rounded-xl flex items-center justify-center transition-colors duration-300">
								<div className="text-blue-800 group-hover:text-white transition-colors duration-300">
									{feature.icon}
								</div>
							</div>

							<h3 className="text-xl font-bold mb-3 group-hover:text-white transition-colors duration-300">
								{feature.title}
							</h3>

							<p className="text-gray-600 group-hover:text-blue-50 transition-colors duration-300">
								{feature.description}
							</p>

							<div className="mt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300 transform translate-y-4 group-hover:translate-y-0">
								<Button
									variant="ghost"
									className="px-0 text-white hover:text-white hover:bg-transparent p-0"
								>
									Learn more →
								</Button>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Feature;
