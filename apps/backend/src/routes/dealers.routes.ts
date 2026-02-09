import { Router } from "express";
import { searchDealersController } from "../controllers/dealers.controller.js";
import { exportDealersController } from "../controllers/dealers-export.controller.js";

const router = Router();

router.get("/", searchDealersController);
router.get("/export", exportDealersController);

export default router;
