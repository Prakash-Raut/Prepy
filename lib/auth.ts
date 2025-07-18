import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { Config } from "@/config/env";
import { db } from "@/db";
import * as schema from "@/db/schema";

export const auth = betterAuth({
	secret: Config.BETTER_AUTH_SECRET,
	database: drizzleAdapter(db, {
		provider: "pg",
		schema: {
			...schema,
		},
	}),
	emailAndPassword: {
		enabled: true,
	},
	socialProviders: {
		google: {
			clientId: Config.GOOGLE_CLIENT_ID,
			clientSecret: Config.GOOGLE_CLIENT_SECRET,
		},
		github: {
			clientId: Config.GITHUB_CLIENT_ID,
			clientSecret: Config.GITHUB_CLIENT_SECRET,
		},
	},
});
