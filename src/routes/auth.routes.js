import { Router } from "express";
import {
  login,
  userRegister,
  logout,
  showUsers,
  updateUser,
  deleteUser,
  showUser,
  verifyToken,
} from "../controllers/auth.controller.js";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  registerSchema,
  loginSchema,
  updateSchema,
} from "../schemas/auth.schema.js";

const router = Router();

//? Rutas de Usuario
router.post("/login", validateSchema(loginSchema), login);
router.post("/logout", logout);
router.post("/register", validateSchema(registerSchema), userRegister);
router.get("/users", authRequired, showUsers);
router.get("/users/:id", authRequired, showUser);
router.put(
  "/users/:id",
  authRequired,
  validateSchema(updateSchema),
  updateUser
);
router.delete("/users/:id", authRequired, deleteUser);
router.get("/verify", verifyToken);

//? Rutas de Parámetros

export default router;
