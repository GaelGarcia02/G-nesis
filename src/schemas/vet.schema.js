import { z } from "zod";

export const regVetSchema = z.object({
  firstName: z.string({
    required_error: "El nombre es requerido",
  }),
  lastName: z.string({
    required_error: "El apellido es requerido",
  }),
  age: z.string({
    required_error: "La edad es requerida",
  }),
  gender: z.string({
    required_error: "El genero es requerido",
  }),
  email: z
    .string({
      required_error: "El correo electrónico es requerido",
    })
    .email({
      message: "Email invalido",
    }),
  phone: z
    .string({
      required_error: "El numero de teléfono es requerido",
    })
    .refine((value) => value.length === 10, {
      message: "El número de teléfono debe tener 10 dígitos",
    }),
});

export const upVetSchema = z.object({
  firstName: z
    .string({
      required_error: "El nombre es requerido",
    })
    .optional(),
  lastName: z
    .string({
      required_error: "El apellido es requerido",
    })
    .optional(),
  age: z
    .string({
      required_error: "La edad es requerida",
    })
    .optional(),
  gender: z
    .string({
      required_error: "El genero es requerido",
    })
    .optional(),
  email: z
    .string({
      required_error: "El correo electrónico es requerido",
    })
    .email({
      message: "Email invalido",
    })
    .optional(),
  phone: z
    .string({
      required_error: "El numero de teléfono es requerido",
    })
    .refine((value) => value.length === 10, {
      message: "El número de teléfono debe tener 10 dígitos",
    })
    .optional(),
});
