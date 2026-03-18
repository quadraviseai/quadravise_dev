import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";
import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { createProject, deleteProject, getProjectsAdmin, importProjectJson, updateProject, uploadProjectImage } from "./portfolio.controller.js";
import { createPortfolioSchema, portfolioIdParamSchema, updatePortfolioSchema } from "./portfolio.validator.js";

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
    cb(null, `portfolio-${unique}${safeExt}`);
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

router.get("/", getProjectsAdmin);
router.post("/import-json", jsonUpload.single("file"), importProjectJson);
router.post("/:id/upload-image", validateRequest(portfolioIdParamSchema, "params"), imageUpload.single("image"), uploadProjectImage);
router.post("/", validateRequest(createPortfolioSchema), createProject);
router.put("/:id", validateRequest(portfolioIdParamSchema, "params"), validateRequest(updatePortfolioSchema), updateProject);
router.delete("/:id", validateRequest(portfolioIdParamSchema, "params"), deleteProject);

export default router;
