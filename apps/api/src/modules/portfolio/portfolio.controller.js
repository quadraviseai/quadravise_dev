import { successResponse } from "../../utils/response.js";
import { buildPublicUrl } from "../../utils/publicUrl.js";

import { portfolioService } from "./portfolio.service.js";

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export async function getProjects(_req, res, next) {
  try {
    const projects = await portfolioService.getProjects();
    return successResponse(res, "Portfolio projects fetched successfully", projects);
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

    const result = await portfolioService.getProjectsAdminPaged({ page, pageSize, search });
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
    const project = await portfolioService.createProject(req.body);
    return successResponse(res, "Portfolio project created successfully", project, 201);
  } catch (error) {
    return next(error);
  }
}

export async function importProjectJson(req, res, next) {
  try {
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

    const requiredFields = ["title", "category", "description"];
    const missingField = requiredFields.find((field) => !String(payload?.[field] || "").trim());

    if (missingField) {
      return res.status(400).json({
        success: false,
        message: `Missing required field: ${missingField}`
      });
    }

    const project = await portfolioService.importProjectJson(payload);
    return successResponse(res, "Portfolio JSON imported successfully", { projectId: project?.id }, 201);
  } catch (error) {
    return next(error);
  }
}

export async function updateProject(req, res, next) {
  try {
    const project = await portfolioService.updateProject(req.params.id, req.body);

    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Portfolio project not found"
      });
    }

    return successResponse(res, "Portfolio project updated successfully", project);
  } catch (error) {
    return next(error);
  }
}

export async function deleteProject(req, res, next) {
  try {
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

export async function uploadProjectImage(req, res, next) {
  try {
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
