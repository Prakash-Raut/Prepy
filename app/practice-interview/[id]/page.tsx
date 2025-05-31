"use client";

import { Button } from "@/components/ui/button";
import {
	CameraIcon,
	ChevronDown,
	Clock,
	Mic2Icon,
	Volume2Icon,
} from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";

type Interview = {
	title: string;
	subtitle: string;
	duration: string;
	difficulty: string;
	description: string;
};

const similarInterviews = [
	{
		id: "software-engineering",
		title: "Software Engineering",
		description: "New Grad E3: Technical interview #1",
		duration: 20,
		difficulty: "Medium",
		backgroundColor: "bg-purple-100",
	},
	{
		id: "stacks-vs-queues",
		title: "Stacks vs Queues",
		description: "Learn the FIFO and LIFO flows",
		duration: 5,
		difficulty: "Medium",
		backgroundColor: "bg-green-100",
	},
	{
		id: "hash-tables",
		title: "Hash Tables",
		description: "Master the magic of key-to-index storage",
		duration: 5,
		difficulty: "Medium",
		backgroundColor: "bg-purple-100",
	},
];

export default function PracticeInterviewPage() {
	const { id } = useParams();
	const router = useRouter();
	const videoRef = useRef<HTMLVideoElement>(null);
	const [stream, setStream] = useState<MediaStream | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [hasPermissions, setHasPermissions] = useState(false);
	const [isExpanded, setIsExpanded] = useState(false);

	// Mock interview data - in real app, fetch based on params.id
	const interview: Interview = {
		title: "Software Engineering",
		subtitle: "New Grad E3: Technical interview #1",
		duration: "20m",
		difficulty: "Medium",
		description:
			"This Meta Software Engineer Mock Interview, ideal for new grads and entry-level engineers targeting roles like E3, is a focused 25-minute session designed to simulate real-world technical interviews. The interview begins with a brief introduction where candidates discuss their background and highlight a project or work experience, followed by targeted questions to explore their technical skills in. Read more",
	};

	useEffect(() => {
		let mediaStream: MediaStream;
		const initializeCamera = async () => {
			try {
				mediaStream = await navigator.mediaDevices.getUserMedia({
					video: true,
					audio: false,
				});
				setStream(mediaStream);
				if (videoRef.current) {
					videoRef.current.srcObject = mediaStream;
				}
				setHasPermissions(true);
			} catch (error) {
				console.error("Error accessing camera/microphone:", error);
				setHasPermissions(false);
			} finally {
				setIsLoading(false);
			}
		};

		initializeCamera();

		return () => {
			if (mediaStream) {
				for (const track of mediaStream.getTracks()) {
					track.stop();
				}
			}
		};
	}, []);

	const handleStartInterview = () => {
		router.push(`/practice-interview/${id}/interview`);
	};

	return (
		<div className="min-h-screen px-24">
			{/* Breadcrumb */}
			<div className="container py-4">
				<div className="flex items-center gap-2 text-sm">
					<Link
						href="/interview-list"
						className="text-muted-foreground hover:underline"
					>
						Interviews
					</Link>
					<span>/</span>
					<Link
						href="/interview-list"
						className="text-muted-foreground hover:underline"
					>
						Software
					</Link>
				</div>
			</div>

			{/* Interview Header */}
			<div className="container">
				<div className="flex items-center gap-2">
					<div className="inline-flex items-center gap-2">
						<span className="inline-block h-5 w-5 text-muted-foreground">
							<Clock className="h-5 w-5" />
						</span>
						<span>{interview.duration}</span>
					</div>
					<Button className="text-sm">{interview.difficulty}</Button>
				</div>
				<h1 className="text-3xl font-bold mt-2">{interview.title}</h1>
				<p>{interview.subtitle}</p>
			</div>

			{/* Main Content */}
			<div className="container py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* Video Section - 2/3 width */}
				<div className="lg:col-span-2">
					<div className="relative">
						<div className="relative flex items-center justify-center bg-stone-900 rounded-xl p-1.5 sm:p-0">
							{isLoading ? (
								<div className="w-full h-full flex items-center justify-center">
									<div className="text-white">Loading camera...</div>
								</div>
							) : hasPermissions ? (
								<video
									ref={videoRef}
									autoPlay
									muted
									playsInline
									className="w-full h-full object-cover lg:aspect-video rounded-lg"
									style={{ objectFit: "cover", transform: "scaleX(-1)" }}
								/>
							) : (
								<div className="w-full h-full flex items-center justify-center">
									<div className="text-white text-center">
										<CameraIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
										<p>Camera access required</p>
									</div>
								</div>
							)}

							{/* Audio Level Detector */}
							<div className="absolute bottom-4 left-4 z-10 h-7 w-7 rounded-full">
								<section className="flex h-7 w-7 items-center justify-center gap-0.5 rounded-full bg-blue-600">
									<div
										className="w-1 bg-white rounded-full"
										style={{ height: "4px" }}
									/>
									<div
										className="w-1 bg-white rounded-full"
										style={{ height: "4px" }}
									/>
									<div
										className="w-1 bg-white rounded-full"
										style={{ height: "4px" }}
									/>
								</section>
							</div>
						</div>

						<div className="sm:flex mt-3 w-full gap-0 grid grid-cols-2">
							<div className="flex gap-4">
								<Button variant="outline" className="flex items-center gap-2">
									<Mic2Icon className="w-4 h-4" />
									Microphone
									<ChevronDown className="w-4 h-4" />
								</Button>
								<Button variant="outline" className="flex items-center gap-2">
									<Volume2Icon className="w-4 h-4" />
									Speakers
									<ChevronDown className="w-4 h-4" />
								</Button>
								<Button variant="outline" className="flex items-center gap-2">
									<CameraIcon className="w-4 h-4" />
									Integrated Camera
									<ChevronDown className="w-4 h-4" />
								</Button>
							</div>
						</div>
					</div>
				</div>

				{/* Interview Info - 1/3 width */}
				<div className="space-y-6">
					<div className="rounded-lg border p-6">
						<h2 className="text-xl font-bold">Ready to join?</h2>
						<div className="flex flex-col items-center mt-6 mb-4">
							<div className="h-16 w-16 rounded-full border flex items-center justify-center shadow-sm mb-2">
								<span className="font-bold text-2xl">P</span>
							</div>
							<p className="text-sm">Prepy AI is speaking</p>
						</div>
						<Button
							className="w-full"
							onClick={handleStartInterview}
							disabled={!hasPermissions}
						>
							Start Interview
						</Button>
						<Button variant="outline" className="w-full mt-2">
							I'm having issues
						</Button>
						<p className="text-xs text-muted-foreground text-center mt-4">
							Prepy uses generative AI to conduct the AI interview
						</p>
					</div>
				</div>
			</div>

			{/* About This Interview */}
			<div className="container py-8 border-t">
				<h2 className="text-2xl font-bold">About this interview</h2>
				<p className="mt-4">
					{interview.description}
					<button
						type="button"
						className="ml-1 hover:underline"
						onClick={() => setIsExpanded(!isExpanded)}
					>
						{isExpanded ? "Read less" : "Read more"}
					</button>
				</p>
			</div>

			{/* More Like This */}
			<div className="container py-8 border-t">
				<div className="flex items-center justify-between mb-6">
					<h2 className="text-2xl font-bold">More like this</h2>
					<Link
						href="/interview-list"
						className="text-blue-500 hover:underline"
					>
						Browse 100+ interviews →
					</Link>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{similarInterviews.map((interview) => (
						<Link
							href={`/practice-interview/${interview.id}`}
							key={interview.id}
							className="block"
						>
							<div className="rounded-xl overflow-hidden h-full flex flex-col">
								<div
									className={`${interview.backgroundColor} p-8 flex items-center justify-center`}
								>
									<div className="h-16 w-16 bg-white rounded-full flex items-center justify-center shadow-md">
										<span className="text-indigo-500 font-bold text-2xl">
											M
										</span>
									</div>
								</div>
								<div className="p-4 border border-t-0 rounded-b-xl flex-1 flex flex-col">
									<h3 className="font-bold text-lg">{interview.title}</h3>
									<p className="text-sm">{interview.description}</p>
									<div className="mt-auto pt-4 flex items-center gap-4">
										<div className="flex items-center gap-1">
											<Clock className="h-4 w-4" />
											<span className="text-sm">{interview.duration}m</span>
										</div>
										<Button size="sm" className="text-sm">
											{interview.difficulty}
										</Button>
									</div>
								</div>
							</div>
						</Link>
					))}
				</div>
			</div>
		</div>
	);
}
