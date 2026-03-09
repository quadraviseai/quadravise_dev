import { z } from "zod";

export const createLeadSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email(),
  mobile_number: z.string().max(30).optional().or(z.literal("")),
  company: z.string().max(150).optional().or(z.literal("")),
  project_type: z.string().min(2),
  budget: z.string().max(100).optional().or(z.literal("")),
  description: z
    .string()
    .max(2000)
    .optional()
    .or(z.literal(""))
    .refine((value) => !value || value.length >= 20, {
      message: "Description must be at least 20 characters if provided"
    })
});
