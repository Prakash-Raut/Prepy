import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { useId } from "react";
import { auth } from "@/lib/auth";
import PostHogClient from "../posthog";
import CTA from "./components/cta";
import FAQ from "./components/faq";
import Feature from "./components/feature";
import Footer from "./components/footer";
import Hero from "./components/hero";
import HowItWorks from "./components/how-it-works";
import FloatingCompanyLogos from "./components/logos";
import Navbar from "./components/navbar/navbar";
import Pricing from "./components/pricing";
import ScrollToTop from "./components/scroll-to-top";
import Testimonial from "./components/testimonials";

export default async function LandingPage() {
	const featuresId = useId();
	const howItWorksId = useId();
	const testimonialsId = useId();
	const pricingId = useId();
	const faqId = useId();

	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/home");
	}

	const posthog = PostHogClient();

	posthog.capture({
		distinctId: crypto.randomUUID(),
		event: "landing_page_viewed",
	});

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />

			<section className="sm:px-24 md:py-28 lg:px-10">
				<Hero />
			</section>

			<section className="sm:px-24 py-1 lg:px-10">
				<FloatingCompanyLogos />
			</section>

			<section id={featuresId} className="sm:px-24 py-20 lg:px-10">
				<Feature />
			</section>

			<section id={howItWorksId} className="sm:px-24 py-20 lg:px-10">
				<HowItWorks />
			</section>

			<section id={testimonialsId} className="sm:px-24 py-20 lg:px-10">
				<Testimonial />
			</section>

			<section id={pricingId} className="sm:px-24 py-20 lg:px-10">
				<Pricing />
			</section>

			<section id={faqId} className="sm:px-24 py-20 lg:px-10">
				<FAQ />
			</section>

			<section className="sm:px-24 py-20 lg:px-10">
				<CTA />
			</section>

			<Footer />
			<ScrollToTop />
		</div>
	);
}
