import { z } from "zod";

const optionalText = (max) => z.string().max(max).optional().or(z.literal(""));

export const createSurveySchema = z.object({
  email: z.string().email().optional().or(z.literal("")),
  respondent_type: z.enum(["Student", "Parent/Guardian", "Teacher", "Other"]),
  tracking_methods: z.array(z.string()).max(5).optional().default([]),
  tracking_methods_other: optionalText(255),
  concept_confidence: z.enum(["Very confident", "Somewhat confident", "Not confident", "No visibility at all"]),
  learning_challenges: z.array(z.string()).max(2).optional().default([]),
  content_over_understanding: z.enum(["Yes", "No", "Not sure"]),
  study_routine: z.enum(["Daily", "Few times a week", "Rarely", "Never"]),
  learning_health_score: z.coerce.number().int().min(1).max(5),
  valuable_features: z.array(z.string()).max(2).optional().default([]),
  motivation_with_streaks: z.enum(["Yes, highly motivating", "Somewhat motivating", "Not motivating"]),
  willingness_to_pay: z.enum(["Yes", "Maybe", "No"]),
  monthly_price_range: z.enum(["Free only", "₹99 – ₹299", "₹300 – ₹600", "₹600+"])
});
