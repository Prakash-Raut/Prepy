import PostHogClient from "@/app/posthog";
import Image from "next/image";
import Link from "next/link";
import { LoginForm } from "./login-form";

export default function LoginPage() {
	const posthog = PostHogClient();

	posthog.capture({
		distinctId: crypto.randomUUID(),
		event: "signin_page_viewed",
	});

	return (
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
			<div className="flex w-full max-w-sm flex-col gap-6">
				<Link
					href="/"
					className="flex items-center gap-2 self-center font-medium"
				>
					<div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
						<Image
							src="/prepy-logo-2.png"
							alt="Prepy Logo"
							width={48}
							height={48}
						/>
					</div>
					Prepy
				</Link>
				<LoginForm />
			</div>
		</div>
	);
}
