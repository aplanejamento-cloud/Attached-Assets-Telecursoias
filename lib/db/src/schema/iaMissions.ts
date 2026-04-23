import { pgTable, text, integer } from "drizzle-orm/pg-core";

export const iaMissionsTable = pgTable("ia_missions", {
  id: text("id").primaryKey(),
  iaId: text("ia_id").notNull(),
  order: integer("order").notNull().default(0),
  title: text("title").notNull(),
  description: text("description").notNull(),
  content: text("content").notNull(),
  requirements: text("requirements").array().notNull().default([]),
  rewardPoints: integer("reward_points").notNull().default(10),
  status: text("status").notNull().default("todo"),
});

export type IaMissionRow = typeof iaMissionsTable.$inferSelect;
