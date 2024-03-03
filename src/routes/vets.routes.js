import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  deleteVet,
  showVet,
  showVets,
  updateVet,
  vetRegister,
} from "../controllers/vet.controller.js";
import { regVetSchema, upVetSchema } from "../schemas/vet.schema.js";

const router = Router();

//? Rutas de Veterinarios
router.post("/vets", authRequired, validateSchema(regVetSchema), vetRegister);
router.get("/vets", authRequired, showVets);
router.get("/vets/:id", authRequired, showVet);
router.put("/vets/:id", authRequired, validateSchema(upVetSchema), updateVet);
router.delete("/vets/:id", authRequired, deleteVet);

export default router;
