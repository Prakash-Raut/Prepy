"use server";

import { logger } from "@/lib/logger";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { z } from "zod";

const loginSchema = z.object({
	email: z.string().email(),
	password: z.string().min(8),
});

export async function login(
	prevState: Record<string, unknown>,
	formData: FormData,
) {
	const supabase = await createClient();

	const result = loginSchema.safeParse({
		email: formData.get("email") as string,
		password: formData.get("password") as string,
	});

	if (!result.success) {
		return {
			type: "error",
			message: result.error.message,
		};
	}

	const { error } = await supabase.auth.signInWithPassword(result.data);

	if (error) {
		logger.error(error.message);
		return {
			type: "error",
			message: error.message,
		};
	}

	revalidatePath("/", "layout");
	redirect("/home");
}
