import { successResponse } from "../../utils/response.js";
import { slugify } from "../../utils/slugify.js";

import { clientAccessRepository } from "./clientAccess.repository.js";

function normalizeProjectPayload(payload = {}) {
  return {
    ...payload,
    slug: slugify(String(payload.slug || payload.name || "").trim()).slice(0, 180)
  };
}

export async function getClientAccessOverview(_req, res, next) {
  try {
    const overview = await clientAccessRepository.getOverview();
    return successResponse(res, "Client access overview fetched successfully", overview);
  } catch (error) {
    return next(error);
  }
}

export async function createClientProject(req, res, next) {
  try {
    const payload = normalizeProjectPayload(req.body);
    const project = await clientAccessRepository.createProject(payload);
    await clientAccessRepository.replaceProjectMemberships(project.id, payload.clientUserIds || []);
    return successResponse(res, "Client project created successfully", project, 201);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Project slug already exists" });
    }
    return next(error);
  }
}

export async function updateClientProject(req, res, next) {
  try {
    const payload = normalizeProjectPayload(req.body);
    const project = await clientAccessRepository.updateProject(req.params.id, payload);
    if (!project) {
      return res.status(404).json({ success: false, message: "Client project not found" });
    }
    await clientAccessRepository.replaceProjectMemberships(project.id, payload.clientUserIds || []);
    return successResponse(res, "Client project updated successfully", project);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Project slug already exists" });
    }
    return next(error);
  }
}

export async function createClientUser(req, res, next) {
  try {
    const user = await clientAccessRepository.createUser(req.body);
    await clientAccessRepository.replaceUserMemberships(user.id, req.body.projectIds || []);
    return successResponse(res, "Client user created successfully", user, 201);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Client email already exists" });
    }
    return next(error);
  }
}

export async function updateClientUser(req, res, next) {
  try {
    const user = await clientAccessRepository.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ success: false, message: "Client user not found" });
    }
    await clientAccessRepository.replaceUserMemberships(user.id, req.body.projectIds || []);
    return successResponse(res, "Client user updated successfully", user);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Client email already exists" });
    }
    return next(error);
  }
}
