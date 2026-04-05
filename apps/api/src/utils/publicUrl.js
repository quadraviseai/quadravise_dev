import { env } from "../config/env.js";

function normalizeOrigin(value = "") {
  return String(value).trim().replace(/\/+$/g, "");
}

export function getPublicOrigin(req) {
  const configuredOrigin = normalizeOrigin(env.apiBaseUrl);
  if (configuredOrigin) return configuredOrigin;

  const forwardedProto = String(req.headers["x-forwarded-proto"] || "").split(",")[0].trim();
  const forwardedHost = String(req.headers["x-forwarded-host"] || "").split(",")[0].trim();

  if (forwardedProto && forwardedHost) {
    return `${forwardedProto}://${forwardedHost}`;
  }

  return `${req.protocol}://${req.get("host")}`;
}

export function buildPublicUrl(req, pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`;
  return `${getPublicOrigin(req)}${normalizedPath}`;
}
