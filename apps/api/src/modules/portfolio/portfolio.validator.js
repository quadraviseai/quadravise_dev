import { z } from "zod";

export const portfolioSlugParamSchema = z.object({
  slug: z.string().min(2)
});

export const portfolioIdParamSchema = z.object({
  id: z.string().uuid()
});

const kpiMetricSchema = z.object({
  label: z.string().min(1).max(180),
  value: z.string().min(1).max(120)
});

const galleryImageSchema = z.object({
  id: z.string().min(1).max(120).optional(),
  url: z.string().url(),
  relativeUrl: z.string().optional().or(z.literal("")),
  altText: z.string().max(255).optional().default("")
});

const documentAttachmentSchema = z.object({
  id: z.string().min(1).max(120).optional(),
  title: z.string().min(1).max(180),
  url: z.string().url(),
  relativeUrl: z.string().optional().or(z.literal("")),
  fileName: z.string().max(255).optional().or(z.literal(""))
});

const videoUrlSchema = z
  .string()
  .url("Enter a valid video URL")
  .refine((value) => {
    const normalized = value.toLowerCase();
    return normalized.includes("youtube.com") || normalized.includes("youtu.be") || normalized.includes("vimeo.com");
  }, "Video URL must be from YouTube or Vimeo");

const optionalUrl = () => z.string().url().optional().or(z.literal(""));
const optionalText = (schema) => schema.optional().or(z.literal(""));

const dateStringSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "Date must use YYYY-MM-DD format")
  .refine((value) => {
    const parsed = new Date(`${value}T00:00:00Z`);
    if (Number.isNaN(parsed.getTime())) {
      return false;
    }

    return parsed.toISOString().slice(0, 10) === value;
  }, "Invalid date");

const portfolioPayloadSchema = z
  .object({
    title: z.string().min(2).max(180),
    category: z.string().min(2).max(120).default("General"),
    slug: z.string().min(2).max(220).optional().or(z.literal("")),
    slugManuallyEdited: z.boolean().optional().default(false),
    shortSummary: z.string().max(300).optional().default(""),
    description: z.string().max(5000).optional().default(""),
    detailedDescription: z.string().max(50000).optional().default(""),
    techStack: z.array(z.string().min(1)).optional().default([]),
    frontendTechnologies: z.array(z.string().min(1)).optional().default([]),
    backendTechnologies: z.array(z.string().min(1)).optional().default([]),
    databaseTechnologies: z.array(z.string().min(1)).optional().default([]),
    timeline: z.string().min(2).max(120).optional().or(z.literal("")),
    projectStartDate: dateStringSchema.optional().or(z.literal("")),
    projectEndDate: dateStringSchema.optional().or(z.literal("")),
    projectLaunchDate: dateStringSchema.optional().or(z.literal("")),
    projectDuration: z.string().max(120).optional().or(z.literal("")),
    clientSatisfaction: z.string().max(120).optional().or(z.literal("")),
    outcome: z.string().min(2).optional().or(z.literal("")),
    featuredImageAlt: z.string().max(255).optional().or(z.literal("")),
    galleryImages: z.array(galleryImageSchema).optional().default([]),
    videoUrl: videoUrlSchema.optional().or(z.literal("")),
    demoUrl: optionalUrl(),
    liveUrl: optionalUrl(),
    designUrl: optionalUrl(),
    documentAttachments: z.array(documentAttachmentSchema).optional().default([]),
    testimonialContent: z.string().max(20000).optional().default(""),
    testimonialAuthorName: z.string().max(180).optional().or(z.literal("")),
    testimonialAuthorDesignation: z.string().max(180).optional().or(z.literal("")),
    testimonialAuthorImage: optionalUrl(),
    testimonialRating: z.coerce.number().int().min(1).max(5).optional(),
    showTestimonial: z.boolean().optional().default(false),
    metaTitle: z.string().max(70).optional().or(z.literal("")),
    metaDescription: z.string().max(160).optional().or(z.literal("")),
    ogImage: optionalUrl(),
    seoKeywords: z.array(z.string().min(1).max(80)).optional().default([]),
    canonicalUrl: optionalUrl(),
    noindex: z.boolean().optional().default(false),
    showOnHomepage: z.boolean().optional().default(false),
    sortOrder: z.coerce.number().int().min(0).optional(),
    projectBadge: optionalText(z.string().max(80)),
    visibility: z.enum(["public", "private", "hidden"]).optional().default("public"),
    projectType: z.string().max(120).optional().or(z.literal("")),
    clientName: z.string().max(180).optional().or(z.literal("")),
    clientIndustry: z.string().max(180).optional().or(z.literal("")),
    clientLocation: z.string().max(180).optional().or(z.literal("")),
    clientWebsite: z.string().url().optional().or(z.literal("")),
    showClientName: z.boolean().optional().default(true),
    servicesProvided: z.array(z.string().min(1)).optional().default([]),
    engagementType: z.string().max(80).optional().or(z.literal("")),
    teamSize: z.coerce.number().int().positive().optional(),
    projectRole: z.string().max(255).optional().or(z.literal("")),
    businessProblem: z.string().max(20000).optional().default(""),
    technicalChallenges: z.string().max(20000).optional().default(""),
    projectGoals: z.string().max(20000).optional().default(""),
    solutionSummary: z.string().max(50000).optional().default(""),
    featuresDelivered: z.array(z.string().min(1)).optional().default([]),
    modulesImplemented: z.array(z.string().min(1)).optional().default([]),
    integrationsUsed: z.array(z.string().min(1)).optional().default([]),
    architectureOverview: z.string().max(50000).optional().default(""),
    kpiMetrics: z.array(kpiMetricSchema).optional().default([]),
    beforeValue: z.string().max(500).optional().or(z.literal("")),
    afterValue: z.string().max(500).optional().or(z.literal("")),
    impactSummary: z.string().max(20000).optional().default(""),
    outcomeDescription: z.string().max(20000).optional().default(""),
    featuredImage: optionalUrl(),
    isFeatured: z.boolean().optional().default(false),
    isConfidential: z.boolean().optional().default(false),
    isPublished: z.boolean().default(false)
  })
  .refine(
    (payload) => {
      if (!payload.projectStartDate || !payload.projectEndDate) {
        return true;
      }

      const start = new Date(`${payload.projectStartDate}T00:00:00Z`);
      const end = new Date(`${payload.projectEndDate}T00:00:00Z`);

      return end.getTime() > start.getTime();
    },
    {
      message: "Project end date must be after the start date",
      path: ["projectEndDate"]
    }
  );

export const createPortfolioSchema = portfolioPayloadSchema;
export const updatePortfolioSchema = portfolioPayloadSchema;

export const portfolioBulkActionSchema = z.object({
  ids: z.array(z.string().uuid()).min(1)
});

export const portfolioLinkClickSchema = z.object({
  linkType: z.enum(["demo", "live", "design", "video", "document", "clientWebsite"]),
  targetUrl: z.string().url()
});

export const portfolioAnalyticsQuerySchema = z.object({
  from: z.string().optional().or(z.literal("")),
  to: z.string().optional().or(z.literal(""))
});
