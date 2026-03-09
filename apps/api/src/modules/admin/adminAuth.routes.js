import { Router } from "express";

import { adminAuth } from "../../middleware/adminAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";

import { forgotPassword, getAdminSession, loginAdmin, logoutAdmin, resetPassword } from "./adminAuth.controller.js";
import { adminLoginSchema, forgotPasswordSchema, resetPasswordSchema } from "./adminAuth.validator.js";

const router = Router();

router.post("/login", validateRequest(adminLoginSchema), loginAdmin);
router.post("/forgot-password", validateRequest(forgotPasswordSchema), forgotPassword);
router.post("/reset-password", validateRequest(resetPasswordSchema), resetPassword);
router.post("/logout", logoutAdmin);
router.get("/me", adminAuth, getAdminSession);

export default router;
