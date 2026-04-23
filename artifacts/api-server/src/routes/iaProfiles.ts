import { Router, type IRouter } from "express";
import { db, iaProfilesTable, iaVideosTable, iaMissionsTable } from "@workspace/db";
import { eq, ilike, sql, and } from "drizzle-orm";
import { ListIaProfilesQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/ia-profiles", async (req, res) => {
  const params = ListIaProfilesQueryParams.parse(req.query);

  const conds = [];
  if (params.search) conds.push(ilike(iaProfilesTable.name, `%${params.search}%`));
  if (params.type) conds.push(eq(iaProfilesTable.type, params.type));

  const rows = await db
    .select({
      id: iaProfilesTable.id,
      name: iaProfilesTable.name,
      type: iaProfilesTable.type,
      tagline: iaProfilesTable.tagline,
      description: iaProfilesTable.description,
      avatarUrl: iaProfilesTable.avatarUrl,
      coverUrl: iaProfilesTable.coverUrl,
      category: iaProfilesTable.category,
      difficulty: iaProfilesTable.difficulty,
      followerCount: iaProfilesTable.followerCount,
      createdAt: iaProfilesTable.createdAt,
      videoCount: sql<number>`(SELECT COUNT(*)::int FROM ${iaVideosTable} WHERE ${iaVideosTable.iaId} = ${iaProfilesTable.id})`,
      missionCount: sql<number>`(SELECT COUNT(*)::int FROM ${iaMissionsTable} WHERE ${iaMissionsTable.iaId} = ${iaProfilesTable.id})`,
    })
    .from(iaProfilesTable)
    .where(conds.length ? and(...conds) : undefined);

  res.json(rows.map((r) => ({ ...r, coverUrl: r.coverUrl ?? undefined })));
});

router.get("/ia-profiles/:id", async (req, res) => {
  const { id } = req.params;
  const [row] = await db
    .select({
      id: iaProfilesTable.id,
      name: iaProfilesTable.name,
      type: iaProfilesTable.type,
      tagline: iaProfilesTable.tagline,
      description: iaProfilesTable.description,
      avatarUrl: iaProfilesTable.avatarUrl,
      coverUrl: iaProfilesTable.coverUrl,
      category: iaProfilesTable.category,
      difficulty: iaProfilesTable.difficulty,
      followerCount: iaProfilesTable.followerCount,
      createdAt: iaProfilesTable.createdAt,
      videoCount: sql<number>`(SELECT COUNT(*)::int FROM ${iaVideosTable} WHERE ${iaVideosTable.iaId} = ${iaProfilesTable.id})`,
      missionCount: sql<number>`(SELECT COUNT(*)::int FROM ${iaMissionsTable} WHERE ${iaMissionsTable.iaId} = ${iaProfilesTable.id})`,
    })
    .from(iaProfilesTable)
    .where(eq(iaProfilesTable.id, id));

  if (!row) return res.status(404).json({ error: "IA não encontrada" });
  res.json({ ...row, coverUrl: row.coverUrl ?? undefined });
});

export default router;
