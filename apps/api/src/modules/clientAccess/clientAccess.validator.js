import { z } from "zod";

export const clientAccessEntityIdParamSchema = z.object({
  id: z.string().uuid()
});

const projectStatuses = ["active", "paused", "completed", "archived"];

export const clientAccessProjectSchema = z.object({
  name: z.string().min(2).max(160),
  slug: z.string().min(2).max(180),
  description: z.string().max(5000).optional().default(""),
  status: z.enum(projectStatuses).default("active"),
  clientUserIds: z.array(z.string().uuid()).default([])
});

export const clientAccessUserCreateSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(120),
  isActive: z.boolean().default(true),
  projectIds: z.array(z.string().uuid()).default([])
});

export const clientAccessUserUpdateSchema = z.object({
  fullName: z.string().min(2).max(120),
  email: z.string().email(),
  password: z.string().min(8).max(120).optional().or(z.literal("")),
  isActive: z.boolean().default(true),
  projectIds: z.array(z.string().uuid()).default([])
});
