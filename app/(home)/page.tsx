import { createClient } from "@/lib/supabase/server";
import PostHogClient from "../posthog";

import { redirect } from "next/navigation";
import CTA from "./components/cta";
import FAQ from "./components/faq";
import Feature from "./components/feature";
import Footer from "./components/footer";
import Hero from "./components/hero";
import HowItWorks from "./components/how-it-works";
import FloatingCompanyLogos from "./components/logos";
import Navbar from "./components/navbar/navbar";
import Pricing from "./components/pricing";
import Testimonial from "./components/testimonials";

export default async function LandingPage() {
	const supabase = await createClient();
	const {
		data: { session },
	} = await supabase.auth.getSession();

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

			<section id="features" className="sm:px-24 py-20 lg:px-10">
				<Feature />
			</section>

			<section id="how-it-works" className="sm:px-24 py-20 lg:px-10">
				<HowItWorks />
			</section>

			<section id="testimonials" className="sm:px-24 py-20 lg:px-10">
				<Testimonial />
			</section>

			<section id="pricing" className="sm:px-24 py-20 lg:px-10">
				<Pricing />
			</section>

			<section id="faq" className="sm:px-24 py-20 lg:px-10">
				<FAQ />
			</section>

			<section className="sm:px-24 py-20 lg:px-10">
				<CTA />
			</section>

			<Footer />
		</div>
	);
}
