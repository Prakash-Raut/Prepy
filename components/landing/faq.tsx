import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { PlusIcon } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem } from "../ui/accordion";

const faq = [
	{
		question: "What is Prepy?",
		answer:
			"Prepy is an AI-powered interview preparation platform that offers mock interviews, instant feedback, and personalized practice plans for tech roles."
	},
	{
		question: "How does Prepy help me prepare for interviews?",
		answer:
			"Prepy simulates real interview scenarios using AI, covering DSA, system design, and behavioral rounds. You receive detailed feedback on your answers to improve your performance."
	},
	{
		question: "Is Prepy suitable for freshers?",
		answer:
			"Absolutely! Prepy offers beginner-friendly content and practice questions, making it ideal for freshers aiming for their first job or internship."
	},
	{
		question: "Can I practice system design with Prepy?",
		answer:
			"Yes, Prepy includes guided system design practice with real-world problem statements, scoring rubrics, and feedback on your approach."
	},
	{
		question: "Do I need to schedule sessions with a mentor?",
		answer:
			"No scheduling is needed. Prepy is available 24/7, offering on-demand mock interviews and feedback without the wait."
	},
	{
		question: "What companies does Prepy prepare me for?",
		answer:
			"Prepy prepares you for interviews at top product-based companies like Google, Microsoft, Amazon, and startups, with tailored practice for each."
	},
	{
		question: "Can I track my progress?",
		answer:
			"Yes, Prepy provides a personalized dashboard where you can monitor your improvement, revisit past sessions, and refine weak areas."
	},
	{
		question: "Is there a free trial?",
		answer:
			"Yes, we offer a limited free trial so you can explore key features and experience how Prepy improves your interview skills before upgrading."
	}
];

const FAQ = () => {
	return (
		<div className="min-h-screen flex items-center justify-center px-6">
			<div className="w-full max-w-2xl">
				<h2 className="text-4xl md:text-5xl !leading-[1.15] font-bold tracking-tight">
					Frequently Asked Questions
				</h2>
				<p className="mt-1.5 text-lg text-muted-foreground">
					Quick answers to common questions about our products and services.
				</p>

				<Accordion
					type="single"
					collapsible
					className="mt-8 space-y-4"
					defaultValue="question-0"
				>
					{faq.map(({ question, answer }, index) => (
						<AccordionItem
							key={question}
							value={`question-${index}`}
							className="bg-accent py-1 px-4 rounded-xl border-none"
						>
							<AccordionPrimitive.Header className="flex">
								<AccordionPrimitive.Trigger
									className={cn(
										"flex flex-1 items-center justify-between py-4 font-semibold tracking-tight transition-all hover:underline [&[data-state=open]>svg]:rotate-45",
										"text-start text-lg"
									)}
								>
									{question}
									<PlusIcon className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-200" />
								</AccordionPrimitive.Trigger>
							</AccordionPrimitive.Header>
							<AccordionContent>{answer}</AccordionContent>
						</AccordionItem>
					))}
				</Accordion>
			</div>
		</div>
	);
};

export default FAQ;
