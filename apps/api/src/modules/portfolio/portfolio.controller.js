import { successResponse } from "../../utils/response.js";
import { buildPublicUrl } from "../../utils/publicUrl.js";

import { portfolioService } from "./portfolio.service.js";
import { createPortfolioSchema } from "./portfolio.validator.js";

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return parsed;
}

function ensurePortfolioAccess(req, { requireAdmin = false } = {}) {
  const role = req.admin?.role || "admin";
  const products = req.admin?.products || [];

  if (!products.includes("portfolio") && role !== "admin") {
    return {
      allowed: false,
      status: 403,
      message: "You are not allowed to edit portfolio projects"
    };
  }

  if (requireAdmin && role !== "admin") {
    return {
      allowed: false,
      status: 403,
      message: "Only admins can publish or unpublish portfolio projects"
    };
  }

  return { allowed: true };
}

export async function getProjects(_req, res, next) {
  try {
    const projects = await portfolioService.getProjects();
    return successResponse(res, "Portfolio projects fetched successfully", projects);
  } catch (error) {
    return next(error);
  }
}

export async function getHomepageProjects(_req, res, next) {
  try {
    const projects = await portfolioService.getHomepageProjects();
    return successResponse(res, "Homepage portfolio projects fetched successfully", projects);
  } catch (error) {
    return next(error);
  }
}

export async function getProjectBySlug(req, res, next) {
  try {
    const project = await portfolioService.getProjectBySlug(req.params.slug);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    await portfolioService.incrementProjectView(req.params.slug);
    return successResponse(res, "Portfolio project fetched successfully", project);
  } catch (error) {
    return next(error);
  }
}

export async function getProjectsAdmin(req, res, next) {
  try {
    const page = toPositiveInt(req.query.page, 1);
    const pageSize = toPositiveInt(req.query.pageSize, 6);
    const search = String(req.query.search || "").trim();
    const category = String(req.query.category || "").trim();
    const status = String(req.query.status || "active").trim();

    const result = await portfolioService.getProjectsAdminPaged({ page, pageSize, search, category, status });
    return successResponse(res, "Admin portfolio projects fetched successfully", {
      items: result.items,
      pagination: {
        page,
        pageSize,
        total: result.total
      }
    });
  } catch (error) {
    return next(error);
  }
}

export async function createProject(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const project = await portfolioService.createProject(req.body, req.admin);
    return successResponse(res, "Portfolio project created successfully", project, 201);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    return next(error);
  }
}

export async function importProjectJson(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const rawJson = req.file?.buffer?.toString("utf8") || JSON.stringify(req.body || {});
    let payload;

    try {
      payload = JSON.parse(rawJson);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format"
      });
    }

    const normalizedPayload = portfolioService.normalizeProjectPayload(payload);
    const validationResult = createPortfolioSchema.safeParse(normalizedPayload);

    if (!validationResult.success) {
      return res.status(400).json({
        success: false,
        message: "Validation failed",
        errors: validationResult.error.issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }))
      });
    }

    if (req.admin?.role !== "admin" && Boolean(validationResult.data.isPublished)) {
      return res.status(403).json({
        success: false,
        message: "Only admins can publish or unpublish portfolio projects"
      });
    }

    const project = await portfolioService.importProjectJson(validationResult.data, req.admin);
    return successResponse(res, "Portfolio JSON imported successfully", { projectId: project?.id }, 201);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    return next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    if (req.admin?.role !== "admin") {
      const existingProject = await portfolioService.getProjectByIdAdmin(req.params.id);
      if (!existingProject) {
        return res.status(404).json({
          success: false,
          message: "Portfolio project not found"
        });
      }

      if (Boolean(req.body?.isPublished) !== Boolean(existingProject.isPublished)) {
        return res.status(403).json({
          success: false,
          message: "Only admins can publish or unpublish portfolio projects"
        });
      }
    }

    const project = await portfolioService.updateProject(req.params.id, req.body, req.admin);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    return successResponse(res, "Portfolio project updated successfully", project);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Slug already exists" });
    }
    return next(error);
  }
}

export async function trackProjectLinkClick(req, res, next) {
  try {
    const result = await portfolioService.trackLinkClick(req.params.slug, req.body);

    if (!result) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    return successResponse(res, "Project link click tracked successfully", result);
  } catch (error) {
    return next(error);
  }
}

export async function getPortfolioPerformanceMetrics(req, res, next) {
  try {
    const metrics = await portfolioService.getPerformanceMetrics({
      from: String(req.query.from || "").trim(),
      to: String(req.query.to || "").trim()
    });
    return successResponse(res, "Portfolio performance metrics fetched successfully", metrics);
  } catch (error) {
    return next(error);
  }
}

export async function duplicateProject(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const project = await portfolioService.duplicateProject(req.params.id);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    return successResponse(res, "Portfolio project duplicated successfully", project, 201);
  } catch (error) {
    return next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const deleted = await portfolioService.deleteProject(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    return successResponse(res, "Portfolio project deleted successfully", deleted);
  } catch (error) {
    return next(error);
  }
}

export async function archiveProject(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const project = await portfolioService.setArchiveState(req.params.id, true);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    return successResponse(res, "Portfolio project archived successfully", project);
  } catch (error) {
    return next(error);
  }
}

export async function restoreProject(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const project = await portfolioService.setArchiveState(req.params.id, false);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    return successResponse(res, "Portfolio project restored successfully", project);
  } catch (error) {
    return next(error);
  }
}

export async function bulkDeleteProjects(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const deleted = await portfolioService.bulkDelete(req.body.ids);
    return successResponse(res, "Portfolio projects deleted successfully", { count: deleted.length });
  } catch (error) {
    return next(error);
  }
}

export async function bulkPublishProjects(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req, { requireAdmin: true });
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const updated = await portfolioService.bulkSetPublishState(req.body.ids, true);
    return successResponse(res, "Portfolio projects published successfully", { count: updated.length });
  } catch (error) {
    return next(error);
  }
}

export async function bulkUnpublishProjects(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req, { requireAdmin: true });
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    const updated = await portfolioService.bulkSetPublishState(req.body.ids, false);
    return successResponse(res, "Portfolio projects moved to draft successfully", { count: updated.length });
  } catch (error) {
    return next(error);
  }
}

export async function uploadProjectImage(req, res, next) {
  try {
    const access = ensurePortfolioAccess(req);
    if (!access.allowed) {
      return res.status(access.status).json({ success: false, message: access.message });
    }

    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    const imageUrl = buildPublicUrl(req, `/uploads/${req.file.filename}`);
    const project = await portfolioService.uploadProjectImage(req.params.id, imageUrl);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    return successResponse(res, "Portfolio image uploaded successfully", project);
  } catch (error) {
    return next(error);
  }
}
