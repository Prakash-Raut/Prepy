import { Config } from "@/config/env";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "./schema";

export const db = drizzle(Config.DATABASE_URL, { schema });
