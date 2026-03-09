import { successResponse } from "../../utils/response.js";

import { leadsService } from "./leads.service.js";

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export async function createLead(req, res, next) {
  try {
    const lead = await leadsService.createLead(req.body);
    return successResponse(
      res,
      "Lead created successfully",
      {
        leadId: lead.id
      },
      201
    );
  } catch (error) {
    return next(error);
  }
}

export async function getLeadsAdmin(req, res, next) {
  try {
    const page = toPositiveInt(req.query.page, 1);
    const pageSize = toPositiveInt(req.query.pageSize, 10);
    const search = String(req.query.search || "").trim();
    const result = await leadsService.getLeadsPaged({ page, pageSize, search });
    return successResponse(res, "Consultation requests fetched successfully", {
      items: result.items,
      pagination: { page, pageSize, total: result.total }
    });
  } catch (error) {
    return next(error);
  }
}
