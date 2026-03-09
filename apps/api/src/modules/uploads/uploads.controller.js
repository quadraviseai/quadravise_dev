import { successResponse } from "../../utils/response.js";
import { buildPublicUrl } from "../../utils/publicUrl.js";

export async function uploadImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    const relativeUrl = `/uploads/${req.file.filename}`;
    const absoluteUrl = buildPublicUrl(req, relativeUrl);

    return successResponse(res, "Image uploaded successfully", {
      url: absoluteUrl,
      relativeUrl,
      filename: req.file.filename
    });
  } catch (error) {
    return next(error);
  }
}
