import { z } from "zod";

export const registerSchema = z.object({
  username: z.string({
    required_error: "El nombre de usuario es requerido",
  }),
  name: z.string({
    required_error: "El nombre es requerido",
  }),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email invalido",
    }),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener como mínimo 6 caracteres",
    }),
});

export const updateSchema = z.object({
  username: z
    .string({
      required_error: "El nombre de usuario es requerido",
    })
    .optional(),
  name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .optional(),
  email: z
    .string({
      required_error: "El email es requerido",
    })
    .email({
      message: "Email invalido",
    })
    .optional(),
  password: z
    .string({
      required_error: "La contraseña es requerida",
    })
    .min(6, {
      message: "La contraseña debe tener como mínimo 6 caracteres",
    })
    .optional(),
});
