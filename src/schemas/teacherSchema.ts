// schemas/teacherSchema.ts
import { z } from "zod";

export const teacherSchema = z
  .object({
    fullName: z.string().min(3, "Nome Completo é obrigatório"),

    email: z.string().email("Email inválido"),

    phone: z
      .string()
      .min(10, "Telefone é obrigatório")
      .regex(
        /^\(?\d{2}\)?\s?\d\s?\d{4}-\d{4}$/,
        "Formato de telefone inválido"
      ),

    subjects: z
      .array(z.string().min(2))
      .min(1, "Selecione pelo menos uma disciplina"),

    role: z.enum(["Professor", "Coordenador", "Outro"], {
      message: "Cargo é obrigatório",
    }),

    zipCode: z
      .string()
      .min(9, "CEP inválido")
      .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 99999-999"),

    address: z.string().min(4, "Endereço é obrigatório"),
    city: z.string().min(2, "Cidade é obrigatória"),
    state: z.string().min(2, "Estado é obrigatório"),

    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
    confirmPassword: z.string().min(6, "A confirmação é obrigatória"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type TeacherData = z.infer<typeof teacherSchema>;
