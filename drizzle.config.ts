import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { env } from "./config/env";

export default defineConfig({
	schema: "./db/schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: env.DATABASE_URL,
	},
});
