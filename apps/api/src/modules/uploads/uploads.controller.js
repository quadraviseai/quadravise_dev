import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

import { successResponse } from "../../utils/response.js";
import { buildPublicUrl } from "../../utils/publicUrl.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.resolve(__dirname, "../../../uploads");

function createUploadPayload(req, file) {
  const relativeUrl = `/uploads/${file.filename}`;
  const absoluteUrl = buildPublicUrl(req, relativeUrl);

  return {
    url: absoluteUrl,
    relativeUrl,
    filename: file.filename,
    mimeType: file.mimetype,
    size: file.size
  };
}

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    return successResponse(res, "Image uploaded successfully", createUploadPayload(req, req.file));
  } catch (error) {
    return next(error);
  }
}

export async function uploadDocument(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Document file is required"
      });
    }

    return successResponse(res, "Document uploaded successfully", createUploadPayload(req, req.file));
  } catch (error) {
    return next(error);
  }
}

export async function deleteUpload(req, res, next) {
  try {
    const relativeUrl = String(req.body?.relativeUrl || "").trim();

    if (!relativeUrl.startsWith("/uploads/")) {
      return res.status(400).json({
        success: false,
        message: "A valid upload path is required"
      });
    }

    const filename = path.basename(relativeUrl);
    const filePath = path.join(uploadsDir, filename);

    if (!filePath.startsWith(uploadsDir)) {
      return res.status(400).json({
        success: false,
        message: "Invalid upload path"
      });
    }

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return successResponse(res, "Upload deleted successfully", {
      relativeUrl,
      filename
    });
  } catch (error) {
    return next(error);
  }
}
