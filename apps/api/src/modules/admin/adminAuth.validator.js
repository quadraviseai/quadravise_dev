import { z } from "zod";

export const adminLoginSchema = z.object({
  username: z.string().email(),
  password: z.string().min(1)
});

export const forgotPasswordSchema = z.object({
  email: z.string().email().optional()
}).default({});

export const resetPasswordSchema = z.object({
  token: z.string().min(16),
  newPassword: z.string().min(8).max(128)
});
