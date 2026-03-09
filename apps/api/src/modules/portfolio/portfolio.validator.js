import { z } from "zod";

export const portfolioSlugParamSchema = z.object({
  slug: z.string().min(2)
});

export const portfolioIdParamSchema = z.object({
  id: z.string().uuid()
});

export const createPortfolioSchema = z.object({
  title: z.string().min(2).max(180),
  category: z.string().min(2).max(120).default("General"),
  description: z.string().min(2),
  techStack: z.array(z.string().min(1)).min(1),
  timeline: z.string().min(2).max(120).optional().or(z.literal("")),
  outcome: z.string().min(2).optional().or(z.literal("")),
  featuredImage: z.string().url().optional().or(z.literal("")),
  isPublished: z.boolean().default(true)
});

export const updatePortfolioSchema = createPortfolioSchema;
