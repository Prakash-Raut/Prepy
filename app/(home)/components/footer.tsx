import {
	CreditCard,
	Facebook,
	Instagram,
	Linkedin,
	Shield,
	Twitter,
	Youtube,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

const features = [
	{
		id: 1,
		icon: <Shield className="h-8 w-8 text-sky-300" />,
		title: "Secure & Private",
		description: "Your data is protected with enterprise-grade security",
	},
	{
		id: 2,
		icon: <CreditCard className="h-8 w-8 text-sky-300" />,
		title: "Flexible Billing",
		description: "No contracts, cancel your subscription anytime",
	},
	{
		id: 3,
		icon: (
			<svg
				className="h-8 w-8 text-sky-300"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>24/7 Support</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
				/>
			</svg>
		),
		title: "24/7 Support",
		description: "Get help whenever you need it from our support team",
	},
	{
		id: 4,
		icon: (
			<svg
				className="h-8 w-8 text-sky-300"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
			>
				<title>Trusted & Verified</title>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
				/>
			</svg>
		),
		title: "Trusted & Verified",
		description: "Used by 10,000+ professionals from leading companies",
	},
];

const footerLinks = [
	{
		title: "Product",
		links: [
			{ id: 1, name: "Features", href: "#features" },
			{ id: 2, name: "How It Works", href: "#how-it-works" },
			{ id: 3, name: "Pricing", href: "#pricing" },
			{ id: 4, name: "FAQ", href: "#faq" },
			{ id: 5, name: "Reviews", href: "#testimonials" },
		],
	},
	{
		title: "Company",
		links: [
			{ id: 1, name: "About Us", href: "#about" },
			{ id: 2, name: "Careers", href: "#careers" },
			{ id: 3, name: "Press", href: "#press" },
			{ id: 4, name: "Blog", href: "#blog" },
			{ id: 5, name: "Contact", href: "#contact" },
		],
	},
	{
		title: "Resources",
		links: [
			{ id: 1, name: "Interview Tips", href: "#tips" },
			{ id: 2, name: "Career Guide", href: "#guide" },
			{ id: 3, name: "Success Stories", href: "#stories" },
			{ id: 4, name: "Research", href: "#research" },
			{ id: 5, name: "Help Center", href: "#help" },
		],
	},
	{
		title: "Legal",
		links: [
			{ id: 1, name: "Terms of Service", href: "#terms" },
			{ id: 2, name: "Privacy Policy", href: "#privacy" },
			{ id: 3, name: "Cookie Policy", href: "#cookies" },
			{ id: 4, name: "Accessibility", href: "#accessibility" },
		],
	},
];

const socialLinks = [
	{
		id: 1,
		icon: <Facebook className="h-5 w-5" />,
		href: "#",
		label: "Facebook",
	},
	{ id: 2, icon: <Twitter className="h-5 w-5" />, href: "#", label: "Twitter" },
	{
		id: 3,
		icon: <Instagram className="h-5 w-5" />,
		href: "#",
		label: "Instagram",
	},
	{
		id: 4,
		icon: <Linkedin className="h-5 w-5" />,
		href: "#",
		label: "LinkedIn",
	},
	{ id: 5, icon: <Youtube className="h-5 w-5" />, href: "#", label: "YouTube" },
];

export default function Footer() {
	return (
		<footer className="bg-sky-900 text-white pt-20 pb-10 sm:px-24 lg:px-10">
			<div className="container mx-auto px-4">
				{/* Trust badges */}
				<div className="mb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 border-b border-sky-800 pb-16">
					{features.map((item) => (
						<div key={item.id} className="flex">
							<div className="mr-4 flex-shrink-0">{item.icon}</div>
							<div>
								<h4 className="text-lg font-medium text-white mb-1">
									{item.title}
								</h4>
								<p className="text-white">{item.description}</p>
							</div>
						</div>
					))}
				</div>

				{/* Main footer content */}
				<div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-16">
					<div className="col-span-2 lg:col-span-1">
						<div className="flex items-start gap-2">
							<Image src="/interview.svg" alt="Logo" width={48} height={48} />
							<Link href="/" className="inline-block mb-6">
								<span className="text-white font-bold text-2xl">Prepy</span>
							</Link>
						</div>
						<p className="text-white mb-6 max-w-xs">
							Ace your interviews with AI-powered practice and personalized
							feedback.
						</p>
						<div className="flex space-x-4">
							{socialLinks.map((link) => (
								<Link
									key={link.id}
									href={link.href}
									className="bg-sky-800 hover:bg-sky-700 h-10 w-10 rounded-full flex items-center justify-center transition-colors"
									aria-label={link.label}
								>
									{link.icon}
								</Link>
							))}
						</div>
					</div>

					{footerLinks.map((column) => (
						<div key={column.title}>
							<h4 className="text-lg font-medium text-white mb-4">
								{column.title}
							</h4>
							<ul className="space-y-3">
								{column.links.map((link) => (
									<li key={link.id}>
										<Link
											href={link.href}
											className="text-white hover:text-sky-200 transition-colors"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom footer */}
				<div className="border-t border-sky-800 pt-8 flex flex-col md:flex-row justify-between items-center">
					<p className="text-white text-sm mb-4 md:mb-0">
						© {new Date().getFullYear()} Prepy. All rights reserved.
					</p>
					<div className="flex items-center space-x-8">
						<span className="text-white text-sm">
							Made with ❤️ by Prepy Team
						</span>
						<div>
							<Image src="/interview.svg" alt="Logo" width={48} height={48} />
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}
