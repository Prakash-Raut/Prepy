import { auth } from "@/lib/auth";
import { SignUpForm } from "@/modules/auth/ui/components/sign-up-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignUpPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/home");
	}

	return <SignUpForm />;
}
