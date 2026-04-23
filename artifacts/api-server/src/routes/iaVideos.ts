import { Router, type IRouter } from "express";
import { db, iaVideosTable, iaProfilesTable } from "@workspace/db";
import { eq } from "drizzle-orm";
import { ListIaVideosQueryParams } from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/ia-videos", async (req, res) => {
  const params = ListIaVideosQueryParams.parse(req.query);

  const baseRows = await db
    .select({
      id: iaVideosTable.id,
      iaId: iaVideosTable.iaId,
      title: iaVideosTable.title,
      description: iaVideosTable.description,
      thumbnailUrl: iaVideosTable.thumbnailUrl,
      videoUrl: iaVideosTable.videoUrl,
      durationSeconds: iaVideosTable.durationSeconds,
      views: iaVideosTable.views,
      publishedAt: iaVideosTable.publishedAt,
      iaName: iaProfilesTable.name,
    })
    .from(iaVideosTable)
    .leftJoin(iaProfilesTable, eq(iaProfilesTable.id, iaVideosTable.iaId))
    .where(params.iaId ? eq(iaVideosTable.iaId, params.iaId) : undefined);

  res.json(baseRows.map((r) => ({ ...r, iaName: r.iaName ?? "" })));
});

router.get("/ia-videos/:id", async (req, res) => {
  const { id } = req.params;
  const [row] = await db
    .select({
      id: iaVideosTable.id,
      iaId: iaVideosTable.iaId,
      title: iaVideosTable.title,
      description: iaVideosTable.description,
      thumbnailUrl: iaVideosTable.thumbnailUrl,
      videoUrl: iaVideosTable.videoUrl,
      durationSeconds: iaVideosTable.durationSeconds,
      views: iaVideosTable.views,
      publishedAt: iaVideosTable.publishedAt,
      iaName: iaProfilesTable.name,
    })
    .from(iaVideosTable)
    .leftJoin(iaProfilesTable, eq(iaProfilesTable.id, iaVideosTable.iaId))
    .where(eq(iaVideosTable.id, id));

  if (!row) return res.status(404).json({ error: "Vídeo não encontrado" });
  res.json({ ...row, iaName: row.iaName ?? "" });
});

export default router;
