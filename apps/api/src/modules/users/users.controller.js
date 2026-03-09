import { successResponse } from "../../utils/response.js";

import { usersService } from "./users.service.js";

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export async function getUsers(req, res, next) {
  try {
    const page = toPositiveInt(req.query.page, 1);
    const pageSize = toPositiveInt(req.query.pageSize, 6);
    const search = String(req.query.search || "").trim();
    const result = await usersService.getUsersPaged({ page, pageSize, search });
    return successResponse(res, "Users fetched successfully", {
      items: result.items,
      pagination: { page, pageSize, total: result.total }
    });
  } catch (error) {
    return next(error);
  }
}

export async function createUser(req, res, next) {
  try {
    const user = await usersService.createUser(req.body);
    return successResponse(res, "User created successfully", user, 201);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }
    return next(error);
  }
}

export async function updateUser(req, res, next) {
  try {
    const user = await usersService.updateUser(req.params.id, req.body);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return successResponse(res, "User updated successfully", user);
  } catch (error) {
    if (error?.code === "23505") {
      return res.status(409).json({ success: false, message: "Email already exists" });
    }
    return next(error);
  }
}

export async function deleteUser(req, res, next) {
  try {
    const deleted = await usersService.deleteUser(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: "User not found" });
    }
    return successResponse(res, "User deleted successfully", deleted);
  } catch (error) {
    return next(error);
  }
}
