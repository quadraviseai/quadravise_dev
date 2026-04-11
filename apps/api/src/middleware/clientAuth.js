import { env } from "../config/env.js";
import { verifyAdminToken } from "../utils/adminToken.js";
import { verifyClientToken } from "../utils/clientToken.js";

function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((acc, part) => {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
}

export function clientAuth(req, res, next) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[env.clientCookieName] || "";

  const payload = verifyClientToken(token);
  if (payload?.userId && payload?.email) {
    req.clientUser = payload;
    return next();
  }

  const adminToken = cookies[env.adminCookieName] || "";
  const adminPayload = verifyAdminToken(adminToken);
  if (adminPayload) {
    req.clientUser = {
      userId: null,
      email: adminPayload.username,
      fullName: adminPayload.username,
      isAdminPreview: true
    };
    return next();
  }

  const error = new Error("Unauthorized");
  error.statusCode = 401;
  error.publicMessage = "Unauthorized";
  return next(error);
}
