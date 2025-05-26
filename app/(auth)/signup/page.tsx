import PostHogClient from "@/app/posthog";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";

export default function SignUpPage() {
	const posthog = PostHogClient();

	posthog.capture({
		distinctId: crypto.randomUUID(),
		event: "signup_page_viewed",
	});

	return (
		<div className="flex min-h-screen flex-col">
			<div className="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8">
				<div className="sm:mx-auto sm:w-full sm:max-w-sm">
					<div className="flex justify-center">
						<Link href="/" className="flex items-center gap-2">
							<div className="bg-gradient-to-r from-purple-600 to-indigo-600 w-8 h-8 rounded-md" />
							<span className="text-xl font-bold">Prepy</span>
						</Link>
					</div>
					<h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
						Create your account
					</h2>
				</div>

				<div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
					<form className="space-y-6" action="#" method="POST">
						<div className="grid grid-cols-2 gap-4">
							<div>
								<Label htmlFor="first-name">First name</Label>
								<div className="mt-2">
									<Input
										id="first-name"
										name="first-name"
										type="text"
										autoComplete="given-name"
										required
										placeholder="First name"
									/>
								</div>
							</div>
							<div>
								<Label htmlFor="last-name">Last name</Label>
								<div className="mt-2">
									<Input
										id="last-name"
										name="last-name"
										type="text"
										autoComplete="family-name"
										required
										placeholder="Last name"
									/>
								</div>
							</div>
						</div>

						<div>
							<Label htmlFor="email">Email address</Label>
							<div className="mt-2">
								<Input
									id="email"
									name="email"
									type="email"
									autoComplete="email"
									required
									placeholder="Enter your email"
								/>
							</div>
						</div>

						<div>
							<Label htmlFor="password">Password</Label>
							<div className="mt-2">
								<Input
									id="password"
									name="password"
									type="password"
									autoComplete="new-password"
									required
									placeholder="Create a password"
								/>
							</div>
						</div>

						<div className="flex items-center space-x-2">
							<Checkbox id="terms" required />
							<Label
								htmlFor="terms"
								className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
							>
								I agree to the{" "}
								<Link
									href="#"
									className="text-purple-600 hover:text-purple-500"
								>
									Terms of Service
								</Link>{" "}
								and{" "}
								<Link
									href="#"
									className="text-purple-600 hover:text-purple-500"
								>
									Privacy Policy
								</Link>
							</Label>
						</div>

						<div>
							<Button
								type="submit"
								className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white"
							>
								Sign up
							</Button>
						</div>
					</form>

					<p className="mt-10 text-center text-sm text-gray-500">
						Already have an account?{" "}
						<Link
							href="/signin"
							className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
						>
							Sign in
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}
