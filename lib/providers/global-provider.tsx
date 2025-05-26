import type { ChildrenProps } from "@/types";
import { DeepgramContextProvider } from "./deepgram-provider";
import { MicrophoneContextProvider } from "./microphone-provider";
import { PostHogProvider } from "./posthog-provider";
import { ThemeProvider } from "./theme-provider";

const GlobalProvider = ({ children }: ChildrenProps) => {
	return (
		<ThemeProvider
			attribute="class"
			defaultTheme="light"
			forcedTheme="light"
			disableTransitionOnChange
		>
			<PostHogProvider>
				<MicrophoneContextProvider>
					<DeepgramContextProvider>{children}</DeepgramContextProvider>
				</MicrophoneContextProvider>
			</PostHogProvider>
		</ThemeProvider>
	);
};

export default GlobalProvider;
