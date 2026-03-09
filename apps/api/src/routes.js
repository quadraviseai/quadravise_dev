import { Router } from "express";

import healthRoutes from "./modules/health/health.routes.js";
import leadsRoutes from "./modules/leads/leads.routes.js";
import blogsRoutes from "./modules/blogs/blogs.routes.js";
import portfolioRoutes from "./modules/portfolio/portfolio.routes.js";
import settingsRoutes from "./modules/settings/settings.routes.js";
import adminRoutes from "./modules/admin/admin.routes.js";

const router = Router();

router.use("/health", healthRoutes);
router.use("/leads", leadsRoutes);
router.use("/blogs", blogsRoutes);
router.use("/portfolio", portfolioRoutes);
router.use("/settings", settingsRoutes);
router.use("/admin", adminRoutes);

export default router;
