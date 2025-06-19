import { drizzle } from "drizzle-orm/neon-http";
import { Config } from "@/config/env";

export const db = drizzle(Config.DATABASE_URL);
