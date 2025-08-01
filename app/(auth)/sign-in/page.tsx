import { auth } from "@/lib/auth";
import { SignInForm } from "@/modules/auth/ui/components/sign-in-form";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export default async function SignInPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		redirect("/home");
	}

	return <SignInForm />;
}
