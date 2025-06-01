"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle, Clock, Star, TrendingUp } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

export default function InterviewResultsPage() {
	const { id } = useParams();
	const router = useRouter();

	const results = {
		overallScore: 85,
		duration: "18m 32s",
		strengths: [
			"Clear communication skills",
			"Strong technical knowledge",
			"Good problem-solving approach",
		],
		improvements: [
			"Consider edge cases more thoroughly",
			"Explain time complexity analysis",
		],
		feedback:
			"Great job! You demonstrated solid technical skills and clear communication. Your approach to problem-solving was methodical and well-structured.",
	};

	return (
		<div className="min-h-screen bg-gray-50">
			<div className="max-w-4xl mx-auto p-6">
				<div className="text-center mb-8">
					<CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
					<h1 className="text-3xl font-bold text-gray-900 mb-2">
						Interview Complete!
					</h1>
					<p className="text-gray-600">
						Here's how you performed in your technical interview
					</p>
				</div>

				<div className="grid gap-6 md:grid-cols-2 mb-8">
					<Card className="p-6">
						<div className="flex items-center gap-3 mb-4">
							<Star className="w-6 h-6 text-yellow-500" />
							<h2 className="text-xl font-semibold">Overall Score</h2>
						</div>
						<div className="text-4xl font-bold text-green-600 mb-2">
							{results.overallScore}%
						</div>
						<p className="text-gray-600">Excellent performance!</p>
					</Card>

					<Card className="p-6">
						<div className="flex items-center gap-3 mb-4">
							<Clock className="w-6 h-6 text-blue-500" />
							<h2 className="text-xl font-semibold">Duration</h2>
						</div>
						<div className="text-2xl font-bold text-gray-900 mb-2">
							{results.duration}
						</div>
						<p className="text-gray-600">Out of 20 minutes</p>
					</Card>
				</div>

				<div className="grid gap-6 md:grid-cols-2 mb-8">
					<Card className="p-6">
						<h3 className="text-lg font-semibold text-green-700 mb-4">
							Strengths
						</h3>
						<ul className="space-y-2">
							{results.strengths.map((strength) => (
								<li key={strength} className="flex items-center gap-2">
									<CheckCircle className="w-4 h-4 text-green-500" />
									<span className="text-gray-700">{strength}</span>
								</li>
							))}
						</ul>
					</Card>

					<Card className="p-6">
						<h3 className="text-lg font-semibold text-orange-700 mb-4">
							Areas for Improvement
						</h3>
						<ul className="space-y-2">
							{results.improvements.map((improvement) => (
								<li key={improvement} className="flex items-center gap-2">
									<TrendingUp className="w-4 h-4 text-orange-500" />
									<span className="text-gray-700">{improvement}</span>
								</li>
							))}
						</ul>
					</Card>
				</div>

				<Card className="p-6 mb-8">
					<h3 className="text-lg font-semibold mb-4">Detailed Feedback</h3>
					<p className="text-gray-700 leading-relaxed">{results.feedback}</p>
				</Card>

				<div className="flex gap-4 justify-center">
					<Button
						onClick={() => router.push("/interview-list")}
						variant="outline"
					>
						Back to Interviews
					</Button>
					<Button
						onClick={() => router.push(`/practice-interview/${id}/interview`)}
					>
						Retake Interview
					</Button>
				</div>
			</div>
		</div>
	);
}
