import { z } from "zod";

export const userIdParamSchema = z.object({
  id: z.string().uuid()
});

export const createUserSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  role: z.string().min(2).max(40),
  products: z.array(z.string().min(1)).default([]),
  isActive: z.boolean().default(true)
});

export const updateUserSchema = createUserSchema;
