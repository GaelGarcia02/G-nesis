import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  deleteHorse,
  showHorse,
  showHorses,
  updateHorse,
  horseRegister,
  showParams,
  showSensors,
} from "../controllers/horse.controller.js";
import { regHorSchema, updHorSchema } from "../schemas/horse.schema.js";

const router = Router();

//? Rutas de Caballos
router.post(
  "/horses",
  authRequired,
  validateSchema(regHorSchema),
  horseRegister
);
router.get("/horses", authRequired, showHorses);
router.get("/horses/:id", authRequired, showHorse);
router.get("/sensors", authRequired, showSensors);
router.get("/sensors/:sensor", authRequired, showParams);
router.put(
  "/horses/:id",
  authRequired,
  validateSchema(updHorSchema),
  updateHorse
);
router.delete("/horses/:id", authRequired, deleteHorse);

export default router;
