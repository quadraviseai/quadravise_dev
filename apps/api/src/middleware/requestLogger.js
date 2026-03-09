import { logger } from "../config/logger.js";

export function requestLogger(req, _res, next) {
  logger.info("Incoming request", {
    method: req.method,
    path: req.path
  });
  next();
}
