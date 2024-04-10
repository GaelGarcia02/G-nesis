import { z } from "zod";

export const regRepSchema = z.object({
  name: z.string({
    required_error: "El nombre es requerido",
  }),
  medicines: z.string({
    required_error: "Las medicinas son requeridas",
  }),
  specifications: z.string({
    required_error: "Las especificaciones son requeridas",
  }),
  food: z.string({
    required_error: "La comida es requerida",
  }),
  horseshoes: z.string({
    required_error: "El herraje es requerido",
  }),
  job: z.number({
    required_error: "La trabajo realizado es requerido",
  }),
});

export const upRepSchema = z.object({
  name: z
    .string({
      required_error: "El nombre es requerido",
    })
    .optional(),
  medicines: z
    .string({
      required_error: "Las medicinas son requeridas",
    })
    .optional(),
  specifications: z
    .string({
      required_error: "Las especificaciones son requeridas",
    })
    .optional(),
  food: z
    .string({
      required_error: "La comida es requerida",
    })
    .optional(),
  horseshoes: z
    .string({
      required_error: "El herraje es requerido",
    })
    .optional(),
  job: z
    .number({
      required_error: "La trabajo realizado es requerido",
    })
    .optional(),
});
