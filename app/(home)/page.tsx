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
import Testimonial from "./components/testimonials";

export default function LandingPage() {
	const posthog = PostHogClient();

	posthog.capture({
		distinctId: crypto.randomUUID(),
		event: "landing_page_viewed",
	});

	return (
		<div className="flex flex-col min-h-screen">
			<Navbar />

			<section className="px-24 md:py-28">
				<Hero />
			</section>

			<section className="px-24 py-10">
				<FloatingCompanyLogos />
			</section>

			<section id="features" className="py-20 px-24">
				<Feature />
			</section>

			<section id="how-it-works" className="py-20 px-24">
				<HowItWorks />
			</section>

			<section id="testimonials" className="py-20 px-24">
				<Testimonial />
			</section>

			<section id="pricing" className="py-20 px-24 ">
				<Pricing />
			</section>

			<section id="faq" className="py-20 px-24">
				<FAQ />
			</section>

			<section className="py-20 px-24">
				<CTA />
			</section>

			<Footer />
		</div>
	);
}
