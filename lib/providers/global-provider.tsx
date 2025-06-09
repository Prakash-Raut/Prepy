import type { ChildrenProps } from "@/types";
import { NuqsAdapter } from "nuqs/adapters/next";
import { PostHogProvider } from "./posthog-provider";
import { QueryProvider } from "./query-provider";
import { ThemeProvider } from "./theme-provider";

const GlobalProvider = ({ children }: ChildrenProps) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			forcedTheme="light"
			disableTransitionOnChange
		>
			<NuqsAdapter>
				<QueryProvider>
					<PostHogProvider>{children}</PostHogProvider>
				</QueryProvider>
			</NuqsAdapter>
		</ThemeProvider>
	);
};

export default GlobalProvider;
