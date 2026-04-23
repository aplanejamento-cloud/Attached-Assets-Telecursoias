import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";

export const missionEventsTable = pgTable("mission_events", {
  id: serial("id").primaryKey(),
  missionId: text("mission_id").notNull(),
  iaId: text("ia_id").notNull(),
  action: text("action").notNull(), // 'started' | 'completed'
  at: timestamp("at", { withTimezone: true }).notNull().defaultNow(),
});

export type MissionEventRow = typeof missionEventsTable.$inferSelect;
