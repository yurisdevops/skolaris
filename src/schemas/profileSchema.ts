import { z } from "zod";
import { cnpj } from "cpf-cnpj-validator";

export const institutionSchema = z.object({
  name: z.string().min(2, "Nome obrigatório"),
  cnpj: z.string().refine(cnpj.isValid, {
    message: "CNPJ inválido",
  }),
  cep: z
    .string()
    .min(9, "CEP inválido")
    .regex(/^\d{5}-\d{3}$/, "CEP deve estar no formato 99999-999"),
  type: z.enum(["Escola", "Faculdade", "Curso Técnico", "Outro"]),
  modality: z.enum(["Presencial", "EAD", "Híbrido"]),
  foundedYear: z.coerce.number().min(1900).max(new Date().getFullYear()),
  email: z.string().email("Email inválido"),
  phone: z.string().min(10, "Telefone inválido"),
  address: z.string().min(4),
  city: z.string(),
  state: z.string(),
  responsible: z.object({
    name: z.string(),
    role: z.string(),
    email: z.string().email(),
    phone: z.string().min(10, "Telefone inválido"),
  }),
});

export type institutionData = z.infer<typeof institutionSchema>;
