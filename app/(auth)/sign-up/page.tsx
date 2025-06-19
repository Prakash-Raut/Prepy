import { headers } from "next/headers";
import { redirect } from "next/navigation";
import PostHogClient from "@/app/posthog";
import { auth } from "@/lib/auth";
import { SignUpForm } from "./sign-up-form";

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/home");
	}

	const posthog = PostHogClient();

	posthog.capture({
		distinctId: crypto.randomUUID(),
		event: "signin_page_viewed",
	});

	return <SignUpForm />;
}
