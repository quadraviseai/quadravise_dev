import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { getBlogBySlug, getBlogs, getFeaturedBlogs } from "./blogs.controller.js";
import { blogSlugParamSchema } from "./blogs.validator.js";

const router = Router();

router.get("/", getBlogs);
router.get("/featured", getFeaturedBlogs);
router.get("/:slug", validateRequest(blogSlugParamSchema, "params"), getBlogBySlug);

export default router;
