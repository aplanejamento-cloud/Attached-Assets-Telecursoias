import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";

export const iaVideosTable = pgTable("ia_videos", {
  id: text("id").primaryKey(),
  iaId: text("ia_id").notNull(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  videoUrl: text("video_url").notNull(),
  durationSeconds: integer("duration_seconds").notNull().default(0),
  views: integer("views").notNull().default(0),
  publishedAt: timestamp("published_at", { withTimezone: true }).notNull().defaultNow(),
});

export type IaVideoRow = typeof iaVideosTable.$inferSelect;
