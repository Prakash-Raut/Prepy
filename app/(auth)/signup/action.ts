"use server";

import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const signupSchema = z.object({
	name: z.string().min(1),
	email: z.string().email(),
	password: z.string().min(8),
});

export async function signup(
	prevState: Record<string, unknown>,
	formData: FormData,
) {
	const supabase = await createClient();

	const result = signupSchema.safeParse({
		email: formData.get("email") as string,
		password: formData.get("password") as string,
		name: formData.get("name") as string,
	});

	if (!result.success) {
		return {
			type: "error",
			message: result.error.message,
		};
	}

	const { error } = await supabase.auth.signUp(result.data);

	if (error) {
		logger.error(error.message);
		return {
			type: "error",
			message: error.message,
		};
	}

	revalidatePath("/", "layout");
	redirect("/signin");
}
