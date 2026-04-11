import { successResponse } from "../../utils/response.js";

import { configurationService } from "./configuration.service.js";

export async function getConfiguration(_req, res, next) {
  try {
    const configuration = await configurationService.getConfiguration();
    return successResponse(res, "Configuration fetched successfully", configuration);
  } catch (error) {
    return next(error);
  }
}

export async function updateConfiguration(req, res, next) {
  try {
    const configuration = await configurationService.updateConfiguration(req.body);
    return successResponse(res, "Configuration updated successfully", configuration);
  } catch (error) {
    return next(error);
  }
}
