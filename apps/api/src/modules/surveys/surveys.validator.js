import { z } from "zod";

const optionalText = (max) => z.string().max(max).optional().or(z.literal(""));

export const createSurveySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().optional().or(z.literal("")),
  role: optionalText(120),
  recommended_features: z.array(z.string().min(1).max(160)).max(20).optional().default([]),
  helpful_classes_or_exams: optionalText(255),
  needs_multilingual_support: z.boolean(),
  specific_requirements: optionalText(1000),
  feedback: z.string().max(2000).optional().or(z.literal(""))
});
