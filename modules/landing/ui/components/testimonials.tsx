import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { MotionDiv } from "@/lib/dynamic-motion";
import Link from "next/link";
import type { ComponentProps } from "react";
import { Marquee } from "../../../../components/ui/marquee";

const testimonials = [
	{
		id: 1,
		name: "Ravi Sharma",
		designation: "Software Engineer",
		company: "Tata Consultancy Services",
		testimonial:
			"Prepy felt like having a personal coach 24/7. The mock interviews were spot on and helped me stay calm and confident during my actual interviews.",
		avatar: "https://randomuser.me/api/portraits/men/32.jpg",
	},
	{
		id: 2,
		name: "Aisha Khan",
		designation: "Frontend Developer",
		company: "Zeta",
		testimonial:
			"I cracked my dream role thanks to Prepy. The AI feedback on my answers was super detailed and actionable.",
		avatar: "https://randomuser.me/api/portraits/women/45.jpg",
	},
	{
		id: 3,
		name: "Ankit Verma",
		designation: "Backend Developer",
		company: "Paytm",
		testimonial:
			"Practicing DSA and system design with Prepy gave me a huge edge. It felt like a friend grilling me before the real deal.",
		avatar: "https://randomuser.me/api/portraits/men/76.jpg",
	},
	{
		id: 4,
		name: "Sneha Roy",
		designation: "Product Manager",
		company: "Flipkart",
		testimonial:
			"Prepy’s behavioral interview simulations were a game-changer. It helped me frame my stories clearly and confidently.",
		avatar: "https://randomuser.me/api/portraits/women/65.jpg",
	},
	{
		id: 5,
		name: "Kunal Joshi",
		designation: "SDE-1",
		company: "Amazon",
		testimonial:
			"The structured prep and instant feedback made Prepy my go-to resource. It’s way more effective than watching random YouTube videos.",
		avatar: "https://randomuser.me/api/portraits/men/84.jpg",
	},
	{
		id: 6,
		name: "Meera Iyer",
		designation: "ML Engineer",
		company: "CureAI",
		testimonial:
			"Prepy didn’t just prepare me for interviews, it made me reflect on my experiences deeply. That made a huge difference during HR rounds.",
		avatar: "https://randomuser.me/api/portraits/women/71.jpg",
	},
];

const Testimonial = () => (
	<div className="container mx-auto px-4 h-full w-full md:px-6">
		<MotionDiv
			initial={{ opacity: 0, y: 20 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.5 }}
		>
			<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center mb-4">
				Hear From Our <span className="text-gradient">Success Stories</span>
			</h2>
			<p className="text-xl text-gray-600 max-w-2xl mx-auto text-center mb-10">
				Join thousands of professionals who've transformed their careers with
				Prepy.
			</p>
		</MotionDiv>
		<div className="relative">
			<div className="z-10 absolute left-0 inset-y-0 w-[15%] bg-gradient-to-r from-background to-transparent" />
			<div className="z-10 absolute right-0 inset-y-0 w-[15%] bg-gradient-to-l from-background to-transparent" />
			<Marquee pauseOnHover className="[--duration:20s]">
				<TestimonialList />
			</Marquee>
			<Marquee pauseOnHover reverse className="mt-0 [--duration:20s]">
				<TestimonialList />
			</Marquee>
		</div>
	</div>
);

const TestimonialList = () =>
	testimonials.map((testimonial) => (
		<div
			key={testimonial.id}
			className="min-w-96 max-w-sm bg-accent rounded-xl p-6"
		>
			<div className="flex items-center justify-between">
				<div className="flex items-center gap-4">
					<Avatar>
						<AvatarFallback className="text-xl font-medium bg-primary text-primary-foreground">
							{testimonial.name.charAt(0)}
						</AvatarFallback>
					</Avatar>
					<div>
						<p className="text-lg font-semibold">{testimonial.name}</p>
						<p className="text-sm text-gray-500">{testimonial.designation}</p>
					</div>
				</div>
				<Button variant="ghost" size="icon" asChild>
					<Link href="#" target="_blank">
						<TwitterLogo className="w-4 h-4" />
					</Link>
				</Button>
			</div>
			<p className="mt-5 text-[17px]">{testimonial.testimonial}</p>
		</div>
	));

const TwitterLogo = (props: ComponentProps<"svg">) => (
	<svg
		role="img"
		viewBox="0 0 24 24"
		xmlns="http://www.w3.org/2000/svg"
		{...props}
	>
		<title>X</title>
		<path
			fill="currentColor"
			d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
		/>
	</svg>
);

export default Testimonial;
