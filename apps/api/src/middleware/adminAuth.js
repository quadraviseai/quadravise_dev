import { env } from "../config/env.js";
import { verifyAdminToken } from "../utils/adminToken.js";

function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((acc, part) => {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
}

export function adminAuth(req, _res, next) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[env.adminCookieName];
  const payload = verifyAdminToken(token);

  if (!payload) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    error.publicMessage = "Unauthorized";
    return next(error);
  }

  req.admin = payload;
  return next();
}

export const requireAdminAuth = adminAuth;
