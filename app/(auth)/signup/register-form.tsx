"use client";

import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Loader2Icon } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useActionState } from "react";
import { signup } from "./action";

const initialState = {
	type: "",
	message: "",
};

export function RegisterForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const router = useRouter();
	const [state, formAction, pending] = useActionState(signup, initialState);

	if (state?.type === "success") {
		router.push("/signin");
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader className="text-center">
					<CardTitle className="text-xl">Create an account</CardTitle>
					<CardDescription>
						Sign up with your email and password
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form action={formAction}>
						<div className="grid gap-6">
							<div className="grid gap-6">
								<div className="grid gap-2">
									<Label htmlFor="name">Name</Label>
									<Input
										id="name"
										name="name"
										type="text"
										placeholder="John Doe"
										required
									/>
								</div>
								<div className="grid gap-2">
									<Label htmlFor="email">Email</Label>
									<Input
										id="email"
										name="email"
										type="email"
										placeholder="m@example.com"
										required
									/>
								</div>
								<div className="grid gap-2">
									<div className="flex items-center">
										<Label htmlFor="password">Password</Label>
										<Link
											href="/forgot-password"
											className="ml-auto text-sm underline-offset-4 hover:underline"
										>
											Forgot your password?
										</Link>
									</div>
									<Input
										id="password"
										name="password"
										type="password"
										required
									/>
								</div>
								<p
									aria-live="polite"
									className={cn("text-sm", {
										"text-red-500": state?.type === "error",
										"text-green-500": state?.type === "success",
									})}
								>
									{state?.message}
								</p>
								<Button type="submit" className="w-full" disabled={pending}>
									{pending ? (
										<Loader2Icon className="animate-spin" />
									) : (
										"Sign up"
									)}
								</Button>
							</div>
							<div className="text-center text-sm">
								Already have an account?{" "}
								<Link href="/signin" className="underline underline-offset-4">
									Sign in
								</Link>
							</div>
						</div>
					</form>
				</CardContent>
			</Card>
			<div className="text-balance text-center text-xs text-muted-foreground [&_a]:underline [&_a]:underline-offset-4 [&_a]:hover:text-primary  ">
				By clicking continue, you agree to our{" "}
				<Link href="#">Terms of Service</Link> and{" "}
				<Link href="#">Privacy Policy</Link>.
			</div>
		</div>
	);
}
