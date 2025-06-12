"use client";

import { GeneratedAvatar } from "@/components/generated-avatar";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { formatDuration } from "@/lib/utils";
import type { UserInterviewWithRelations } from "@/types";
import { format } from "date-fns";
import {
	BookOpenTextIcon,
	ClockFadingIcon,
	FileTextIcon,
	FileVideoIcon,
	SparklesIcon,
} from "lucide-react";
import Link from "next/link";
import Markdown from "react-markdown";
import { ChatProvider } from "./chat-provider";
import { Transcript } from "./transcript";

interface Props {
	data: UserInterviewWithRelations;
}

export const CompletedState = ({ data }: Props) => {
	return (
		<div className="flex flex-col gap-y-4">
			<Tabs defaultValue="summary">
				<div className="px-3">
					<ScrollArea className="h-[300px]">
						<TabsList className="p-0 bg-white border rounded-none w-full justify-start h-13 mb-5">
							<TabsTrigger
								value="summary"
								className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
							>
								<BookOpenTextIcon />
								Summary
							</TabsTrigger>
							<TabsTrigger
								value="transcript"
								className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
							>
								<FileTextIcon />
								Transcript
							</TabsTrigger>
							<TabsTrigger
								value="recording"
								className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
							>
								<FileVideoIcon />
								Recording
							</TabsTrigger>
							<TabsTrigger
								value="chat"
								className="text-muted-foreground rounded-none bg-background data-[state=active]:shadow-none border-b-2 border-transparent data-[state=active]:border-b-primary data-[state=active]:text-accent-foreground h-full hover:text-accent-foreground"
							>
								<SparklesIcon />
								Ask AI
							</TabsTrigger>
						</TabsList>
						<TabsContent value="summary">
							<div className="bg-white rounded-lg border">
								<div className="flex flex-col gap-y-5 col-span-5 px-4 py-5">
									<h2 className="text-2xl font-medium capitalize">
										{data.interview.name}
									</h2>
									<div className="flex gap-x-2 items-center">
										<Link
											href={`/agents/${data.agentId}`}
											className="flex items-center gap-x-2 underline underline-offset-4 capitalize"
										>
											<GeneratedAvatar
												variant="botttsNeutral"
												seed={data.agent.name}
												className="size-5"
											/>
											{data.agent.name}
										</Link>
										<p>{data.startedAt ? format(data.startedAt, "PPP") : ""}</p>
									</div>
									<div className="flex flex-col gap-x-2">
										<SparklesIcon className="size-4" />
										<p>General Summary</p>
										<Badge
											variant="outline"
											className="flex items-center gap-x-2 [&>svg]:size-4"
										>
											<ClockFadingIcon className="text-blue-700" />
											{data.interview.durationInMinutes
												? formatDuration(
														Number(data.interview.durationInMinutes),
													)
												: "No duration"}
										</Badge>
										<div>
											<Markdown
												components={{
													h1: (props) => (
														<h1
															className="text-2xl font-medium mb-6"
															{...props}
														/>
													),
													h2: (props) => (
														<h2
															className="text-xl font-medium mb-6"
															{...props}
														/>
													),
													h3: (props) => (
														<h3
															className="text-lg font-medium mb-6"
															{...props}
														/>
													),
													h4: (props) => (
														<h4
															className="text-base font-medium mb-6"
															{...props}
														/>
													),
													p: (props) => (
														<p className="leading-relaxed mb-6" {...props} />
													),
													ul: (props) => (
														<ul
															className="list-disc list-inside mb-6"
															{...props}
														/>
													),
													ol: (props) => (
														<ol
															className="list-decimal list-inside mb-6"
															{...props}
														/>
													),
													li: (props) => <li className="mb-1" {...props} />,
													strong: (props) => (
														<strong className="font-semibold" {...props} />
													),
													code: (props) => (
														<code
															className="bg-gray-100 px-0.5 py-1 rounded"
															{...props}
														/>
													),
													blockquote: (props) => (
														<blockquote
															className="border-l-4 pl-4 italic my-4"
															{...props}
														/>
													),
												}}
											>
												{data.summary}
											</Markdown>
										</div>
									</div>
								</div>
							</div>
						</TabsContent>
						<TabsContent value="transcript">
							<Transcript interviewId={data.id} userId={data.userId} />
						</TabsContent>
						<TabsContent value="recording">
							<div className="bg-white rounded-lg border px-4 py-5">
								{data.recordingUrl ? (
									<video
										src={data.recordingUrl}
										controls
										className="w-full rounded-lg"
									>
										<track
											kind="captions"
											src="/captions.vtt"
											srcLang="en"
											label="English"
											default
										/>
									</video>
								) : (
									<div className="flex flex-col items-center justify-center h-full">
										<p className="text-sm text-muted-foreground">
											No recording available
										</p>
									</div>
								)}
							</div>
						</TabsContent>
						<TabsContent value="chat">
							<ChatProvider
								interviewId={data.id}
								interviewName={data.interview.name}
							/>
						</TabsContent>
						<ScrollBar orientation="horizontal" />
					</ScrollArea>
				</div>
			</Tabs>
		</div>
	);
};
