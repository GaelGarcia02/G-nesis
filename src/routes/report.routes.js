import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  deleteReport,
  getReport,
  getReports,
  updateReport,
  createReport,
} from "../controllers/report.controller.js";
import { regRepSchema, upRepSchema } from "../schemas/report.schema.js";

const router = Router();

router.post(
  "/reports",
  authRequired,
  validateSchema(regRepSchema),
  createReport
);
router.get("/reports", authRequired, getReports);
router.get("/reports/:id", authRequired, getReport);
router.put(
  "/reports/:id",
  authRequired,
  validateSchema(upRepSchema),
  updateReport
);
router.delete("/reports/:id", authRequired, deleteReport);

export default router;
