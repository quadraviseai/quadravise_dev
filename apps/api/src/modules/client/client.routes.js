import { Router } from "express";

import clientAuthRoutes from "../clientAuth/clientAuth.routes.js";
import clientProjectsRoutes from "../clientProjects/clientProjects.routes.js";

const router = Router();

router.use("/auth", clientAuthRoutes);
router.use("/projects", clientProjectsRoutes);

export default router;

