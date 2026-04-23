import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const iaProfilesTable = pgTable("ia_profiles", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").notNull(),
  tagline: text("tagline").notNull(),
  description: text("description").notNull(),
  avatarUrl: text("avatar_url").notNull(),
  coverUrl: text("cover_url"),
  category: text("category").notNull(),
  difficulty: text("difficulty").notNull(),
  followerCount: integer("follower_count").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type IaProfileRow = typeof iaProfilesTable.$inferSelect;
