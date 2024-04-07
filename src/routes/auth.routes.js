import { Router } from "express";
import {
  login,
  logout,
  verifyToken,
  profile,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema } from "../schemas/auth.schema.js";

const router = Router();

//? Rutas de Usuario
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.get("/verify", verifyToken);
router.get("/profile/:id", profile);

//? Rutas de Parámetros

export default router;
