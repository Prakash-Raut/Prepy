import GlobalProvider from "@/lib/providers/global-provider";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";

const inter = Inter({
	variable: "--font-inter",
	subsets: ["latin"],
});

export const metadata: Metadata = {
	title: "Prepy - AI-Powered Mock Interviews to Ace Your Next Job",
	description:
		"Prepare for job interviews with Prepy's AI-powered mock interview platform. Get personalized feedback, track your progress, and land your dream job.",
	keywords: [
		"mock interview",
		"AI interview",
		"interview preparation",
		"interview practice",
		"job interview",
		"career coaching",
		"interview questions",
	],
	authors: [{ name: "Prepy Team" }],
	robots: "index, follow",
	category: "technology",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<body className={`${inter.variable} antialiased`}>
				<GlobalProvider>{children}</GlobalProvider>
				<Toaster />
			</body>
		</html>
	);
}
