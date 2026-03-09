import { Router } from "express";

import { adminAuth } from "../../middleware/adminAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import blogsAdminRoutes from "../blogs/blogs.admin.routes.js";
import leadsAdminRoutes from "../leads/leads.admin.routes.js";
import portfolioAdminRoutes from "../portfolio/portfolio.admin.routes.js";
import socialAccountsRoutes from "../socialAccounts/socialAccounts.routes.js";
import { updateSettings } from "../settings/settings.controller.js";
import { updateSettingsSchema } from "../settings/settings.validator.js";
import uploadRoutes from "../uploads/upload.routes.js";
import usersRoutes from "../users/users.routes.js";

import adminAuthRoutes from "./adminAuth.routes.js";

const router = Router();

router.use("/auth", adminAuthRoutes);
router.use(adminAuth);
router.use("/blogs", blogsAdminRoutes);
router.use("/leads", leadsAdminRoutes);
router.use("/portfolio", portfolioAdminRoutes);
router.use("/social-accounts", socialAccountsRoutes);
router.use("/users", usersRoutes);
router.use("/uploads", uploadRoutes);
router.put("/settings", validateRequest(updateSettingsSchema), updateSettings);

export default router;
