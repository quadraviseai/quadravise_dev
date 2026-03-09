import { z } from "zod";

const optionalText = (schema) => z.preprocess((value) => (value == null ? "" : value), schema.optional().or(z.literal("")));
const optionalUrl = () => optionalText(z.string().url());

const distributionSchema = z.object({
  publishToWebsite: z.boolean().default(true),
  shareToLinkedin: z.boolean().default(false),
  shareToFacebook: z.boolean().default(false),
  linkedinAccountId: optionalText(z.string().uuid()),
  facebookAccountId: optionalText(z.string().uuid()),
  linkedinCaption: optionalText(z.string().max(1000)),
  facebookCaption: optionalText(z.string().max(1000)),
  useFeaturedImageForSocial: z.boolean().default(true),
  socialPublishAt: optionalText(z.string().datetime()),
  autoShareAfterWebsitePublish: z.boolean().default(true)
});

export const blogSlugParamSchema = z.object({
  slug: z.string().min(2)
});

export const blogIdParamSchema = z.object({
  id: z.string().uuid()
});

export const createBlogSchema = z.object({
  title: z.string().min(2).max(180),
  slug: optionalText(
    z
      .string()
      .min(2)
      .max(220)
      .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/)
  ),
  excerpt: z.string().min(2),
  content: z.string().min(2),
  category: z.string().min(2).max(100).default("General"),
  tags: z.array(z.string().min(1).max(60)).default([]),
  author: z.string().min(2).max(120).default("Quadravise Team"),
  readingTime: optionalText(z.string().max(40)),
  coverImage: optionalUrl(),
  thumbnailImage: optionalUrl(),
  metaTitle: optionalText(z.string().max(60)),
  metaDescription: optionalText(z.string().max(160)),
  canonicalUrl: optionalUrl(),
  ogTitle: optionalText(z.string().max(120)),
  ogDescription: optionalText(z.string().max(220)),
  ogImage: optionalUrl(),
  status: z.enum(["draft", "published", "scheduled", "archived"]).default("published"),
  publishedAt: optionalText(z.string().datetime()),
  isFeatured: z.boolean().default(false),
  importSource: z.enum(["manual", "json"]).default("manual"),
  imageStatus: z.enum(["missing", "uploaded"]).default("missing"),
  distribution: distributionSchema.default({})
});

export const updateBlogSchema = createBlogSchema;
