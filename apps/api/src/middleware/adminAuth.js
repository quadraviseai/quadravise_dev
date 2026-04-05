import { env } from "../config/env.js";
import { usersRepository } from "../modules/users/users.repository.js";
import { verifyAdminToken } from "../utils/adminToken.js";

function parseCookies(cookieHeader = "") {
  return cookieHeader.split(";").reduce((acc, part) => {
    const [rawKey, ...rest] = part.trim().split("=");
    if (!rawKey) return acc;
    acc[rawKey] = decodeURIComponent(rest.join("="));
    return acc;
  }, {});
}

export async function adminAuth(req, _res, next) {
  const cookies = parseCookies(req.headers.cookie || "");
  const token = cookies[env.adminCookieName];
  const payload = verifyAdminToken(token);

  if (!payload) {
    const error = new Error("Unauthorized");
    error.statusCode = 401;
    error.publicMessage = "Unauthorized";
    return next(error);
  }

  const managedUser = await usersRepository.findByEmail(payload.username);

  req.admin = {
    ...payload,
    managedUserId: managedUser?.id || null,
    role: managedUser?.role || "admin",
    products: managedUser?.products || ["portfolio"],
    isActive: managedUser?.isActive ?? true
  };

  if (req.admin.isActive === false) {
    const error = new Error("Unauthorized");
    error.statusCode = 403;
    error.publicMessage = "Your account is inactive";
    return next(error);
  }

  return next();
}

export const requireAdminAuth = adminAuth;
