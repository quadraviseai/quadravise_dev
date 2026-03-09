import { successResponse } from "../../utils/response.js";

import { socialAccountsService } from "./socialAccounts.service.js";

export async function getSocialAccounts(_req, res, next) {
  try {
    const accounts = await socialAccountsService.getActiveAccounts();
    return successResponse(res, "Social accounts fetched successfully", accounts);
  } catch (error) {
    return next(error);
  }
}
