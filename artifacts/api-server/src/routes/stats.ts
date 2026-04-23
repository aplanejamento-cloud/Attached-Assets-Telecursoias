import { Router, type IRouter } from "express";
import { db, iaProfilesTable, iaVideosTable, iaMissionsTable, missionEventsTable } from "@workspace/db";
import { eq, sql, desc } from "drizzle-orm";

const router: IRouter = Router();

router.get("/stats/overview", async (_req, res) => {
  const [iaCountRow] = await db
    .select({ c: sql<number>`COUNT(*)::int` })
    .from(iaProfilesTable);
  const [vidCountRow] = await db
    .select({ c: sql<number>`COUNT(*)::int` })
    .from(iaVideosTable);
  const [missionsCountRow] = await db
    .select({
      total: sql<number>`COUNT(*)::int`,
      done: sql<number>`SUM(CASE WHEN ${iaMissionsTable.status} = 'done' THEN 1 ELSE 0 END)::int`,
      points: sql<number>`COALESCE(SUM(CASE WHEN ${iaMissionsTable.status} = 'done' THEN ${iaMissionsTable.rewardPoints} ELSE 0 END), 0)::int`,
    })
    .from(iaMissionsTable);

  const [streakRow] = await db
    .select({
      days: sql<number>`COALESCE(COUNT(DISTINCT DATE(${missionEventsTable.at})), 0)::int`,
    })
    .from(missionEventsTable)
    .where(sql`${missionEventsTable.at} > NOW() - INTERVAL '7 days'`);

  res.json({
    totalIas: iaCountRow?.c ?? 0,
    totalVideos: vidCountRow?.c ?? 0,
    totalMissions: missionsCountRow?.total ?? 0,
    completedMissions: missionsCountRow?.done ?? 0,
    totalPoints: missionsCountRow?.points ?? 0,
    streakDays: streakRow?.days ?? 0,
  });
});

router.get("/stats/recent-activity", async (_req, res) => {
  const rows = await db
    .select({
      id: missionEventsTable.id,
      iaId: missionEventsTable.iaId,
      action: missionEventsTable.action,
      at: missionEventsTable.at,
      missionTitle: iaMissionsTable.title,
      iaName: iaProfilesTable.name,
      iaAvatarUrl: iaProfilesTable.avatarUrl,
    })
    .from(missionEventsTable)
    .leftJoin(iaMissionsTable, eq(iaMissionsTable.id, missionEventsTable.missionId))
    .leftJoin(iaProfilesTable, eq(iaProfilesTable.id, missionEventsTable.iaId))
    .orderBy(desc(missionEventsTable.at))
    .limit(15);

  res.json(
    rows.map((r) => ({
      id: String(r.id),
      iaId: r.iaId,
      iaName: r.iaName ?? "",
      iaAvatarUrl: r.iaAvatarUrl ?? "",
      missionTitle: r.missionTitle ?? "",
      action: r.action,
      at: r.at,
    })),
  );
});

router.get("/stats/ia/:id/progress", async (req, res) => {
  const { id } = req.params;
  const [row] = await db
    .select({
      total: sql<number>`COUNT(*)::int`,
      done: sql<number>`SUM(CASE WHEN ${iaMissionsTable.status} = 'done' THEN 1 ELSE 0 END)::int`,
      inProgress: sql<number>`SUM(CASE WHEN ${iaMissionsTable.status} = 'in_progress' THEN 1 ELSE 0 END)::int`,
      earnedPoints: sql<number>`COALESCE(SUM(CASE WHEN ${iaMissionsTable.status} = 'done' THEN ${iaMissionsTable.rewardPoints} ELSE 0 END), 0)::int`,
    })
    .from(iaMissionsTable)
    .where(eq(iaMissionsTable.iaId, id));

  const total = row?.total ?? 0;
  const done = row?.done ?? 0;
  res.json({
    iaId: id,
    total,
    done,
    inProgress: row?.inProgress ?? 0,
    percentComplete: total > 0 ? Math.round((done / total) * 100) : 0,
    earnedPoints: row?.earnedPoints ?? 0,
  });
});

export default router;
