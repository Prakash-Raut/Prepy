import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
	server: {
		DATABASE_URL: z.string().url(),
		BETTER_AUTH_SECRET: z.string(),
		GOOGLE_CLIENT_ID: z.string(),
		GOOGLE_CLIENT_SECRET: z.string(),
		GITHUB_CLIENT_ID: z.string(),
		GITHUB_CLIENT_SECRET: z.string(),
		STREAM_VIDEO_API_SECRET: z.string(),
		STREAM_CHAT_API_SECRET: z.string(),
		OPENAI_API_KEY: z.string(),
	},
	client: {
		NEXT_PUBLIC_STREAM_VIDEO_API_KEY: z.string(),
		NEXT_PUBLIC_STREAM_CHAT_API_KEY: z.string(),
		NEXT_PUBLIC_POSTHOG_KEY: z.string(),
		NEXT_PUBLIC_POSTHOG_HOST: z.string().url(),
	},
	clientPrefix: "NEXT_PUBLIC_",
	// Loads from process.env
	runtimeEnv: process.env,
	// Skip validation in development to allow partial .env files
	skipValidation: process.env.NODE_ENV !== "production",
});
