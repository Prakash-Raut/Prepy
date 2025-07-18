import { boolean, pgEnum, pgTable, text, timestamp } from "drizzle-orm/pg-core";
import { nanoid } from "nanoid";

export const user = pgTable("user", {
	id: text("id").primaryKey(),
	name: text("name").notNull(),
	email: text("email").notNull().unique(),
	emailVerified: boolean("email_verified")
		.$defaultFn(() => false)
		.notNull(),
	image: text("image"),
	createdAt: timestamp("created_at")
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => new Date())
		.notNull(),
});

export const session = pgTable("session", {
	id: text("id").primaryKey(),
	expiresAt: timestamp("expires_at").notNull(),
	token: text("token").notNull().unique(),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
	ipAddress: text("ip_address"),
	userAgent: text("user_agent"),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
});

export const account = pgTable("account", {
	id: text("id").primaryKey(),
	accountId: text("account_id").notNull(),
	providerId: text("provider_id").notNull(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	accessToken: text("access_token"),
	refreshToken: text("refresh_token"),
	idToken: text("id_token"),
	accessTokenExpiresAt: timestamp("access_token_expires_at"),
	refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
	scope: text("scope"),
	password: text("password"),
	createdAt: timestamp("created_at").notNull(),
	updatedAt: timestamp("updated_at").notNull(),
});

export const verification = pgTable("verification", {
	id: text("id").primaryKey(),
	identifier: text("identifier").notNull(),
	value: text("value").notNull(),
	expiresAt: timestamp("expires_at").notNull(),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const agents = pgTable("agents", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: text("name").notNull(),
	instructions: text("instructions").notNull(),
	createdAt: timestamp("created_at")
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => new Date())
		.notNull(),
});

export const interviewStatus = pgEnum("meeting_status", [
	"upcoming",
	"active",
	"completed",
	"processing",
	"cancelled",
]);

export const interviewDifficulty = pgEnum("interview_difficulty", [
	"easy",
	"medium",
	"hard",
]);

export const interviewDuration = pgEnum("interview_duration", [
	"15",
	"30",
	"45",
	"60",
]);

export const interviews = pgTable("interviews", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	name: text("name").notNull(),
	description: text("description").notNull().default("No description"),
	agentId: text("agent_id")
		.notNull()
		.references(() => agents.id, { onDelete: "cascade" }),
	difficulty: interviewDifficulty("difficulty").notNull().default("medium"),
	durationInMinutes: interviewDuration("duration_in_minutes")
		.notNull()
		.default("15"),
	createdAt: timestamp("created_at")
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => new Date())
		.notNull(),
});

export const userInterviews = pgTable("user_interviews", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => nanoid()),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	interviewId: text("interview_id")
		.notNull()
		.references(() => interviews.id, { onDelete: "cascade" }),
	agentId: text("agent_id")
		.notNull()
		.references(() => agents.id, { onDelete: "cascade" }),
	status: interviewStatus("status").notNull().default("upcoming"),
	startedAt: timestamp("started_at"),
	endedAt: timestamp("ended_at"),
	transcriptUrl: text("transcript_url"),
	recordingUrl: text("recording_url"),
	summary: text("summary"),
	createdAt: timestamp("created_at")
		.$defaultFn(() => new Date())
		.notNull(),
	updatedAt: timestamp("updated_at")
		.$defaultFn(() => new Date())
		.notNull(),
});
