import {
	boolean,
	integer,
	pgEnum,
	pgTable,
	text,
	timestamp,
} from "drizzle-orm/pg-core";

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

export const interviewTypeEnum = pgEnum("interview_type", [
	"mixed",
	"technical",
	"behavioral",
	"system_design",
]);

export const interviewStatusEnum = pgEnum("interview_status", [
	"scheduled",
	"in_progress",
	"completed",
]);

export const speakerEnum = pgEnum("speaker", ["user", "ai"]);

export const difficultyEnum = pgEnum("difficulty", ["easy", "medium", "hard"]);

export const interview = pgTable("interview", {
	id: text("id").primaryKey(),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	interviewType: interviewTypeEnum("interview_type").notNull().default("mixed"),
	interviewStatus: interviewStatusEnum("interview_status")
		.notNull()
		.default("scheduled"),
	difficulty: difficultyEnum("difficulty").notNull().default("medium"),
	durationInMinutes: integer("duration_in_minutes").notNull().default(15),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const transcript = pgTable("transcript", {
	id: text("id").primaryKey(),
	interviewId: text("interview_id")
		.notNull()
		.references(() => interview.id, { onDelete: "cascade" }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	speaker: speakerEnum("speaker").notNull(),
	content: text("content").notNull(),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const score = pgTable("score", {
	id: text("id").primaryKey(),
	interviewId: text("interview_id")
		.notNull()
		.references(() => interview.id, { onDelete: "cascade" }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	score: integer("score").notNull(),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const feedback = pgTable("feedback", {
	id: text("id").primaryKey(),
	interviewId: text("interview_id")
		.notNull()
		.references(() => interview.id, { onDelete: "cascade" }),
	userId: text("user_id")
		.notNull()
		.references(() => user.id, { onDelete: "cascade" }),
	overallScore: integer("overall_score").notNull(),
	strengths: text("strengths").notNull(),
	improvements: text("improvements").notNull(),
	feedback: text("feedback").notNull(),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});

export const predefinedInterview = pgTable("predefined_interview", {
	id: text("id").primaryKey(),
	title: text("title").notNull(),
	category: text("category").notNull(),
	difficulty: difficultyEnum("difficulty").notNull().default("medium"),
	description: text("description").notNull(),
	duration: integer("duration").notNull().default(15),
	createdAt: timestamp("created_at").$defaultFn(() => new Date()),
	updatedAt: timestamp("updated_at").$defaultFn(() => new Date()),
});
