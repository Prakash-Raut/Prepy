import CTA from "@/components/landing/cta";
import FAQ from "@/components/landing/faq";
import Feature from "@/components/landing/feature";
import Footer from "@/components/landing/footer";
import Hero from "@/components/landing/hero";
import HowItWorks from "@/components/landing/how-it-works";
import Navbar from "@/components/landing/navbar";
import Pricing from "@/components/landing/pricing";
import Testimonial from "@/components/landing/testimonials";
import FloatingCompanyLogos from "@/components/logos";

export default function LandingPage() {
	return (
		<div className="flex flex-col min-h-screen px-24">
			<Navbar />

			<section className="py-20 md:py-28">
				<Hero />
			</section>

			<section>
				<FloatingCompanyLogos />
			</section>

			<section id="features" className="py-20">
				<Feature />
			</section>

			<section id="how-it-works" className="py-20">
				<HowItWorks />
			</section>

			<section id="testimonials" className="py-20">
				<Testimonial />
			</section>

			<section id="pricing" className="py-20 ">
				<Pricing />
			</section>

			<section id="faq" className="py-20">
				<FAQ />
			</section>

			<section className="py-20">
				<CTA />
			</section>

			<Footer />
		</div>
	);
}
