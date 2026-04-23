import { Router, type IRouter } from "express";
import healthRouter from "./health";
import iaProfilesRouter from "./iaProfiles";
import iaVideosRouter from "./iaVideos";
import iaMissionsRouter from "./iaMissions";
import statsRouter from "./stats";

const router: IRouter = Router();

router.use(healthRouter);
router.use(iaProfilesRouter);
router.use(iaVideosRouter);
router.use(iaMissionsRouter);
router.use(statsRouter);

export default router;
