import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";
import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import {
  createBlog,
  deleteBlog,
  getBlogAdminById,
  getBlogCategoriesAdmin,
  getBlogPreviewBySlug,
  getBlogsAdmin,
  importBlogJson,
  publishBlog,
  updateBlog,
  uploadBlogImage
} from "./blogs.controller.js";
import { blogIdParamSchema, createBlogSchema, updateBlogSchema } from "./blogs.validator.js";

const router = Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../../../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const imageStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".gif"].includes(ext) ? ext : ".jpg";
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `blog-${unique}${safeExt}`);
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    if (!file.mimetype?.startsWith("image/")) {
      cb(new Error("Only image files are allowed"));
      return;
    }
    cb(null, true);
  }
});

const jsonUpload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 2 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const isJson = file.mimetype === "application/json" || file.originalname?.toLowerCase().endsWith(".json");
    if (!isJson) {
      cb(new Error("Only JSON files are allowed"));
      return;
    }
    cb(null, true);
  }
});

router.get("/", getBlogsAdmin);
router.get("/categories", getBlogCategoriesAdmin);
router.get("/preview/:slug", getBlogPreviewBySlug);
router.post("/import-json", jsonUpload.single("file"), importBlogJson);
router.get("/:id", validateRequest(blogIdParamSchema, "params"), getBlogAdminById);
router.post("/:id/upload-image", validateRequest(blogIdParamSchema, "params"), imageUpload.single("image"), uploadBlogImage);
router.post("/:id/publish", validateRequest(blogIdParamSchema, "params"), publishBlog);
router.post("/", validateRequest(createBlogSchema), createBlog);
router.put("/:id", validateRequest(blogIdParamSchema, "params"), validateRequest(updateBlogSchema), updateBlog);
router.delete("/:id", validateRequest(blogIdParamSchema, "params"), deleteBlog);

export default router;
