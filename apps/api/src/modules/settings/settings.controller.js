import { successResponse } from "../../utils/response.js";

import { settingsService } from "./settings.service.js";

export async function getSettings(_req, res, next) {
  try {
    const settings = await settingsService.getSettings();
    return successResponse(res, "Settings fetched successfully", settings || {});
  } catch (error) {
    return next(error);
  }
}

export async function updateSettings(req, res, next) {
  try {
    const settings = await settingsService.updateSettings(req.body);
    return successResponse(res, "Settings updated successfully", settings || {});
  } catch (error) {
    return next(error);
  }
}

