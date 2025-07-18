import { z } from "zod";

export const registerSchema = z
  .object({
    email: z.string().min(1, "Email obrigatório"),
    password: z.string().min(6, "Senha obrigatória"),
    confirm: z.string().min(6, "Confirmação obrigatória"),
  })
  .refine((data) => data.password === data.confirm, {
    path: ["confirm"],
    message: "As senha devem ser iguais",
  });

export type RegisterData = z.infer<typeof registerSchema>;
