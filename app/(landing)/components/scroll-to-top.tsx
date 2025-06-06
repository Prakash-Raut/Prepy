"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { FaAngleUp } from "react-icons/fa";

const ScrollToTop = () => {
	const [showTopBtn, setShowTopBtn] = useState(false);

	useEffect(() => {
		const handleScroll = () => {
			if (window.scrollY > 400) {
				setShowTopBtn(true);
			} else {
				setShowTopBtn(false);
			}
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	const goToTop = () => {
		window.scrollTo({ top: 0, behavior: "smooth" });
	};

	return (
		<div>
			{showTopBtn && (
				<Button
					variant="outline"
					className="fixed bottom-24 right-4 size-16 rounded-3xl"
					onClick={goToTop}
				>
					<FaAngleUp className="size-10 text-sky-950" />
				</Button>
			)}
		</div>
	);
};

export default ScrollToTop;
