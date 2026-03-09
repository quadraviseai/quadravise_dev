import { successResponse } from "../../utils/response.js";

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
