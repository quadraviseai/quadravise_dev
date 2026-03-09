import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { getProjectBySlug, getProjects } from "./portfolio.controller.js";
import { portfolioSlugParamSchema } from "./portfolio.validator.js";

const router = Router();

router.get("/", getProjects);
router.get("/:slug", validateRequest(portfolioSlugParamSchema, "params"), getProjectBySlug);

export default router;
