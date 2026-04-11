import { z } from "zod";

export const clientProjectSlugParamSchema = z.object({
  projectSlug: z.string().min(2).max(180)
});

export const clientProjectTicketParamSchema = z.object({
  projectSlug: z.string().min(2).max(180),
  ticketId: z.string().uuid()
});

const allowedStatuses = ["new", "in_progress", "need_clarification", "resolved", "closed", "reopened"];
const allowedSeverities = ["low", "medium", "high", "critical"];
const allowedSortFields = ["ticketNumber", "title", "severity", "status", "etaAt", "updatedAt", "createdAt"];
const allowedSortOrders = ["asc", "desc"];

function parseCsv(value) {
  return String(value || "")
    .split(",")
    .map((item) => item.trim().toLowerCase())
    .filter(Boolean);
}

function optionalTrimmedString(maxLength) {
  return z
    .string()
    .optional()
    .transform((value) => {
      const normalizedValue = String(value || "").trim();
      return normalizedValue ? normalizedValue.slice(0, maxLength) : undefined;
    });
}

function optionalDateOnlyString() {
  return z
    .string()
    .optional()
    .transform((value) => {
      const normalizedValue = String(value || "").trim();
      return normalizedValue || undefined;
    })
    .refine((value) => !value || /^\d{4}-\d{2}-\d{2}$/.test(value), {
      message: "Date filters must use YYYY-MM-DD format"
    });
}

export const clientProjectTicketsQuerySchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  pageSize: z.coerce.number().int().min(1).max(50).default(10),
  ticketId: optionalTrimmedString(64),
  title: optionalTrimmedString(150),
  severity: z
    .string()
    .optional()
    .transform((value) => parseCsv(value))
    .refine((values) => values.every((value) => allowedSeverities.includes(value)), {
      message: "Unsupported severity filter"
    }),
  status: z
    .string()
    .optional()
    .transform((value) => parseCsv(value))
    .refine((values) => values.every((value) => allowedStatuses.includes(value)), {
      message: "Unsupported status filter"
    }),
  eta: z.enum(["available", "na"]).optional(),
  updatedOn: optionalDateOnlyString(),
  createdOn: optionalDateOnlyString(),
  sortBy: z.enum(allowedSortFields).optional(),
  sortOrder: z.enum(allowedSortOrders).optional()
});

export const clientCreateTicketSchema = z.object({
  title: z.string().min(5).max(150),
  description: z.string().min(20).max(5000),
  pageUrl: z.string().url().optional().or(z.literal("")),
  severity: z.enum(["low", "medium", "high", "critical"]),
  category: z.string().min(2).max(80),
  attachments: z
    .array(
      z.object({
        fileName: z.string().min(1).max(255),
        relativeUrl: z.string().min(1).max(500),
        mimeType: z.string().min(1).max(120),
        size: z.number().int().nonnegative().max(10 * 1024 * 1024)
      })
    )
    .max(5)
    .default([])
});

export const clientUpdateTicketSchema = z.object({
  title: z.string().min(5).max(150),
  description: z.string().min(20).max(5000),
  pageUrl: z.string().url().optional().or(z.literal("")),
  severity: z.enum(["low", "medium", "high", "critical"]),
  category: z.string().min(2).max(80),
  status: z.enum(["new", "in_progress", "need_clarification", "resolved", "closed", "reopened"]),
  attachments: z
    .array(
      z.object({
        fileName: z.string().min(1).max(255),
        relativeUrl: z.string().min(1).max(500),
        mimeType: z.string().min(1).max(120),
        size: z.number().int().nonnegative().max(10 * 1024 * 1024)
      })
    )
    .max(5)
    .default([])
});
