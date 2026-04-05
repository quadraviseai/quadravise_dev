import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { getHomepageProjects, getProjectBySlug, getProjects, trackProjectLinkClick } from "./portfolio.controller.js";
import { portfolioLinkClickSchema, portfolioSlugParamSchema } from "./portfolio.validator.js";

const router = Router();

router.get("/", getProjects);
router.get("/homepage", getHomepageProjects);
router.post("/:slug/track-click", validateRequest(portfolioLinkClickSchema), trackProjectLinkClick);
router.get("/:slug", validateRequest(portfolioSlugParamSchema, "params"), getProjectBySlug);

export default router;
