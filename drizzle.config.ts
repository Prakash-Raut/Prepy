import "dotenv/config";
import { defineConfig } from "drizzle-kit";
import { Config } from "./config/env";

export default defineConfig({
	schema: "./db/schema.ts",
	out: "./migrations",
	dialect: "postgresql",
	dbCredentials: {
		url: Config.DATABASE_URL,
	},
});
