import { z } from "zod";

export const regHorSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
  }),

  age: z.string({
    required_error: "La edad es requerida",
  }),

  breed: z.string({
    required_error: "La raza es requerido",
  }),

  diseases: z.string({
    required_error: "Se requiere la información de sus enfermedades",
  }),
});

export const updHorSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .optional(),

  age: z
    .string({
      required_error: "La edad es requerida",
    })
    .optional(),

  breed: z
    .string({
      required_error: "La raza es requerida",
    })
    .optional(),

  diseases: z
    .string({
      required_error: "Se requiere la información de sus enfermedades",
    })
    .optional(),
});
