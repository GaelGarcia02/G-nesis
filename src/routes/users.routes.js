import { Router } from "express";
import { authRequired } from "../middlewares/validateToken.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import {
  deleteUser,
  showUser,
  showUsers,
  updateUser,
  userRegister,
  verifyPassword,
} from "../controllers/user.controller.js";
import { registerSchema, updateSchema } from "../schemas/user.schema.js";

const router = Router();

router.post("/users", validateSchema(registerSchema), userRegister);
router.post("/users/:id/verify-password", authRequired, verifyPassword);
router.get("/users", authRequired, showUsers);
router.get("/users/:id", authRequired, showUser);
router.put(
  "/users/:id",
  authRequired,
  validateSchema(updateSchema),
  updateUser
);
router.delete("/users/:id", authRequired, deleteUser);

export default router;
