import { env } from "../../config/env.js";
import { successResponse } from "../../utils/response.js";
import { createClientToken } from "../../utils/clientToken.js";

import { clientAuthRepository } from "./clientAuth.repository.js";

const CLIENT_TOKEN_TTL_MS = 1000 * 60 * 60 * 12;

export async function loginClient(req, res, next) {
  try {
    const email = String(req.body.email || "").trim().toLowerCase();
    const password = req.body.password;

    const authenticated = await clientAuthRepository.verifyPassword(email, password);
    if (!authenticated) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const projects = await clientAuthRepository.findActiveProjectsForUser(authenticated.id);
    const redirectTo = projects[0]?.slug ? `/client/projects/${projects[0].slug}/dashboard` : "/client/no-projects";

    const token = createClientToken({
      userId: authenticated.id,
      email: authenticated.email,
      fullName: authenticated.fullName
    });

    res.cookie(env.clientCookieName, token, {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "lax",
      maxAge: CLIENT_TOKEN_TTL_MS,
      path: "/"
    });

    return successResponse(res, "Login successful", {
      user: {
        id: authenticated.id,
        email: authenticated.email,
        fullName: authenticated.fullName
      },
      projects,
      redirectTo
    });
  } catch (error) {
    return next(error);
  }
}

export async function getClientSession(req, res, next) {
  try {
    if (req.clientUser?.isAdminPreview) {
      return successResponse(res, "Admin preview session valid", {
        user: {
          id: "admin-preview",
          email: req.clientUser.email,
          fullName: "Admin Preview"
        },
        projects: [],
        redirectTo: null,
        adminPreview: true
      });
    }

    const user = await clientAuthRepository.findUserById(req.clientUser.userId);
    if (!user?.isActive) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized"
      });
    }

    const projects = await clientAuthRepository.findActiveProjectsForUser(user.id);
    return successResponse(res, "Session valid", {
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName
      },
      projects,
      redirectTo: projects[0]?.slug ? `/client/projects/${projects[0].slug}/dashboard` : "/client/no-projects"
    });
  } catch (error) {
    return next(error);
  }
}

export async function logoutClient(_req, res, next) {
  try {
    res.clearCookie(env.clientCookieName, {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "lax",
      path: "/"
    });

    return successResponse(res, "Logout successful", {});
  } catch (error) {
    return next(error);
  }
}
