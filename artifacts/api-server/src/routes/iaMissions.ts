import { Router, type IRouter } from "express";
import { db, iaMissionsTable, missionEventsTable } from "@workspace/db";
import { eq, asc } from "drizzle-orm";
import {
  ListIaMissionsQueryParams,
  UpdateMissionStatusBody,
  UpdateMissionStatusParams,
} from "@workspace/api-zod";

const router: IRouter = Router();

router.get("/ia-missions", async (req, res) => {
  const params = ListIaMissionsQueryParams.parse(req.query);
  const rows = await db
    .select()
    .from(iaMissionsTable)
    .where(eq(iaMissionsTable.iaId, params.iaId))
    .orderBy(asc(iaMissionsTable.order));
  res.json(rows);
});

router.patch("/ia-missions/:id/status", async (req, res) => {
  const { id } = UpdateMissionStatusParams.parse(req.params);
  const { status } = UpdateMissionStatusBody.parse(req.body);

  const [updated] = await db
    .update(iaMissionsTable)
    .set({ status })
    .where(eq(iaMissionsTable.id, id))
    .returning();

  if (!updated) return res.status(404).json({ error: "Missão não encontrada" });

  if (status === "in_progress" || status === "done") {
    await db.insert(missionEventsTable).values({
      missionId: updated.id,
      iaId: updated.iaId,
      action: status === "done" ? "completed" : "started",
    });
  }

  res.json(updated);
});

export default router;
