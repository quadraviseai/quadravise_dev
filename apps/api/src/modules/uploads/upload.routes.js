import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import multer from "multer";
import { Router } from "express";

import { deleteUpload, uploadDocument, uploadImage } from "./uploads.controller.js";

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
    const safeExt = [".jpg", ".jpeg", ".png", ".webp"].includes(ext) ? ext : ".jpg";
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `media-${unique}${safeExt}`);
  }
});

const documentStorage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadsDir),
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    const safeExt = [".pdf", ".doc", ".docx"].includes(ext) ? ext : ".pdf";
    const unique = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    cb(null, `document-${unique}${safeExt}`);
  }
});

const imageUpload = multer({
  storage: imageStorage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    if (![".jpg", ".jpeg", ".png", ".webp"].includes(ext)) {
      cb(new Error("Only JPG, PNG, and WEBP images are allowed"));
      return;
    }
    cb(null, true);
  }
});

const documentUpload = multer({
  storage: documentStorage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => {
    const ext = path.extname(file.originalname || "").toLowerCase();
    if (![".pdf", ".doc", ".docx"].includes(ext)) {
      cb(new Error("Only PDF, DOC, and DOCX files are allowed"));
      return;
    }
    cb(null, true);
  }
});

router.post("/image", imageUpload.single("image"), uploadImage);
router.post("/document", documentUpload.single("document"), uploadDocument);
router.delete("/", deleteUpload);

export default router;
