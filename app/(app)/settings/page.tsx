import { Button } from "@/components/ui/button";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { useId } from "react";

export default async function Settings() {
	const settingsId = useId();
	const nameId = useId();
	const emailId = useId();
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		redirect("/sign-in");
	}

	return (
		<section id={settingsId} className="container mx-auto px-24 py-6">
			<form>
				<div className="space-y-12">
					<div className="border-b border-gray-900/10 pb-12">
						<h2 className="text-base/7 font-semibold text-gray-900">
							Personal Information
						</h2>
						<p className="mt-1 text-sm/6 text-gray-600">
							Use a permanent email where you can receive mail.
						</p>

						<div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
							<div className="sm:col-span-3">
								<label
									htmlFor="name"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Name
								</label>
								<div className="mt-2">
									<input
										id={nameId}
										name="name"
										type="text"
										value={session.user?.name ?? ""}
										readOnly={true}
										autoComplete="given-name"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									/>
								</div>
							</div>
							<div className="sm:col-span-4">
								<label
									htmlFor="email"
									className="block text-sm/6 font-medium text-gray-900"
								>
									Email address
								</label>
								<div className="mt-2">
									<input
										id={emailId}
										name="email"
										type="email"
										value={session.user?.email ?? ""}
										readOnly={true}
										autoComplete="email"
										className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600 sm:text-sm/6"
									/>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="mt-6 flex items-center justify-end gap-x-6">
					<Button type="button" variant="outline">
						Cancel
					</Button>
					<Button type="submit">Save</Button>
				</div>
			</form>
		</section>
	);
}
