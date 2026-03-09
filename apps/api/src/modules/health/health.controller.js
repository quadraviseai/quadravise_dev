import { successResponse } from "../../utils/response.js";

export function getHealth(_req, res) {
  return successResponse(res, "Health check successful", {
    status: "ok",
    service: "quadravise-api"
  });
}
