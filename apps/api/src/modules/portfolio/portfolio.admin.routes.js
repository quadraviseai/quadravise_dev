import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { createProject, deleteProject, getProjectsAdmin, updateProject } from "./portfolio.controller.js";
import { createPortfolioSchema, portfolioIdParamSchema, updatePortfolioSchema } from "./portfolio.validator.js";

const router = Router();

router.get("/", getProjectsAdmin);
router.post("/", validateRequest(createPortfolioSchema), createProject);
router.put("/:id", validateRequest(portfolioIdParamSchema, "params"), validateRequest(updatePortfolioSchema), updateProject);
router.delete("/:id", validateRequest(portfolioIdParamSchema, "params"), deleteProject);

export default router;
