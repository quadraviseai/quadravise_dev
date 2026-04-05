import crypto from "crypto";

import { env } from "../../config/env.js";
import { createAdminToken } from "../../utils/adminToken.js";
import { buildAdminPasswordResetEmail } from "../../utils/emailTemplates.js";
import { sendMail } from "../../utils/mailer.js";
import { successResponse } from "../../utils/response.js";

import { adminAuthRepository } from "./adminAuth.repository.js";

const ADMIN_TOKEN_TTL_MS = 1000 * 60 * 60 * 12;
const RESET_TOKEN_TTL_MS = 1000 * 60 * 15;

export async function loginAdmin(req, res, next) {
  try {
    const { username, password } = req.body;
    const normalizedUsername = String(username || "").trim().toLowerCase();

    const authenticated = await adminAuthRepository.verifyPassword(normalizedUsername, password);

    if (!authenticated) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials"
      });
    }

    const token = createAdminToken({ username: authenticated.email });

    res.cookie(env.adminCookieName, token, {
      httpOnly: true,
      secure: env.nodeEnv === "production",
      sameSite: "lax",
      maxAge: ADMIN_TOKEN_TTL_MS,
      path: "/"
    });

    return successResponse(res, "Login successful", { username: authenticated.email });
  } catch (error) {
    return next(error);
  }
}

export async function forgotPassword(req, res, next) {
  try {
    const email = String(env.adminUser || "").trim().toLowerCase();
    const user = await adminAuthRepository.findUserByEmail(email);

    if (user?.isActive) {
      const rawToken = crypto.randomBytes(32).toString("hex");
      const tokenHash = crypto.createHash("sha256").update(rawToken).digest("hex");
      const expiresAt = new Date(Date.now() + RESET_TOKEN_TTL_MS).toISOString();

      await adminAuthRepository.createPasswordResetToken({
        userId: user.id,
        tokenHash,
        expiresAt
      });

      const resetLink = `${env.webBaseUrl}/admin/reset-password?token=${rawToken}`;
      const emailPayload = buildAdminPasswordResetEmail({ resetLink });
      const sent = await sendMail({ to: email, ...emailPayload });
      if (!sent) {
        return res.status(500).json({
          success: false,
          message: "SMTP is not configured. Cannot send reset email."
        });
      }
    }

    return successResponse(res, `Password reset link sent to ${email}.`, {});
  } catch (error) {
    return next(error);
  }
}

export async function resetPassword(req, res, next) {
  try {
    const { token, newPassword } = req.body;
    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");
    const consumed = await adminAuthRepository.consumePasswordResetToken(tokenHash);

    if (!consumed) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired reset token"
      });
    }

    const isSamePassword = await adminAuthRepository.verifyPasswordByUserId(consumed.userId, newPassword);
    if (isSamePassword) {
      return res.status(400).json({
        success: false,
        message: "New password must be different from the current password"
      });
    }

    await adminAuthRepository.updatePassword(consumed.userId, newPassword);
    return successResponse(res, "Password has been reset successfully", {});
  } catch (error) {
    return next(error);
  }
}

export async function logoutAdmin(_req, res, next) {
  try {
    res.clearCookie(env.adminCookieName, {
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

export async function getAdminSession(req, res, next) {
  try {
    return successResponse(res, "Session valid", {
      username: req.admin?.username || env.adminUser,
      role: req.admin?.role || "admin",
      managedUserId: req.admin?.managedUserId || null,
      products: req.admin?.products || ["portfolio"]
    });
  } catch (error) {
    return next(error);
  }
}
