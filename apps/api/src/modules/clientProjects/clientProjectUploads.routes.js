import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";
import { Router } from "express";

import { clientAuth } from "../../middleware/clientAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";
import { successResponse } from "../../utils/response.js";
import { buildPublicUrl } from "../../utils/publicUrl.js";

import { clientProjectsRepository } from "./clientProjects.repository.js";
import { clientProjectSlugParamSchema } from "./clientProjects.validator.js";

const router = Router({ mergeParams: true });

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../../../uploads");

if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const attachmentStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = [".jpg", ".jpeg", ".png", ".webp", ".pdf", ".doc", ".docx"].includes(ext) ? ext : ".bin";
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `client-ticket-${unique}${safeExt}`);
  }
});

const attachmentUpload = multer({
  storage: attachmentStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp", ".pdf", ".doc", ".docx"].includes(ext)) {
      cb(new Error("Only JPG, PNG, WEBP, PDF, DOC, and DOCX files are allowed"));
      return;
    }
    cb(null, true);
  }
});

router.use(clientAuth);

router.post(
  "/uploads",
  validateRequest(clientProjectSlugParamSchema, "params"),
  attachmentUpload.single("attachment"),
  async (req, res, next) => {
    try {
      const project = await clientProjectsRepository.findProjectForUser(req.clientUser.userId, req.params.projectSlug);
      if (!project) {
        return res.status(404).json({
          success: false,
          message: "Project not found or access denied"
        });
      }

      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "Attachment file is required"
        });
      }

      const relativeUrl = `/uploads/${req.file.filename}`;
      return successResponse(res, "Attachment uploaded successfully", {
        fileName: req.file.originalname,
        storedFilename: req.file.filename,
        relativeUrl,
        url: buildPublicUrl(req, relativeUrl),
        mimeType: req.file.mimetype,
        size: req.file.size
      });
    } catch (error) {
      return next(error);
    }
  }
);

export default router;
