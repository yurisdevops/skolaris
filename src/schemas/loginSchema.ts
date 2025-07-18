import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, "Email obrigatório"),
  password: z.string().min(6, "Senha deve conter no mínimo 6 caracteres."),
});

export type LoginData = z.infer<typeof loginSchema>;
