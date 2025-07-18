// schemas/teacherSchema.ts
import { z } from "zod";

export const teacherSchema = z
  .object({
    fullName: z.string().min(3, "Full name is required"),

    email: z.string().email("Invalid email"),

    phone: z
      .string()
      .min(10, "Phone number is required")
      .regex(/^\(?\d{2}\)?\s?\d\s?\d{4}-\d{4}$/, "Invalid phone format"),

    subjects: z.array(z.string().min(2)).min(1, "Select at least one subject"),

    role: z.enum(["Professor", "Coordinator", "Other"], {
      message: "Role is required",
    }),

    zipCode: z
      .string()
      .min(9, "Invalid ZIP code")
      .regex(/^\d{5}-\d{3}$/, "ZIP must be in format 99999-999"),

    address: z.string().min(4, "Address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),

    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string().min(6, "Confirmation is required"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type TeacherData = z.infer<typeof teacherSchema>;
