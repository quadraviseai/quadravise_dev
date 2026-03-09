import { logger } from "../config/logger.js";

export function errorHandler(error, req, res, _next) {
  logger.error("Unhandled error", {
    route: req.originalUrl,
    error: error.message
  });

  if (res.headersSent) {
    return;
  }

  res.status(error.statusCode || 500).json({
    success: false,
    message: error.publicMessage || "An unexpected error occurred"
  });
}
