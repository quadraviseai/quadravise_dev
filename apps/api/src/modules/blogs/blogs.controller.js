import { successResponse } from "../../utils/response.js";
import { buildPublicUrl } from "../../utils/publicUrl.js";

import { blogsService } from "./blogs.service.js";

export async function getBlogs(_req, res, next) {
  try {
    const blogs = await blogsService.getBlogs();
    return successResponse(res, "Blogs fetched successfully", blogs);
  } catch (error) {
    return next(error);
  }
}

export async function getFeaturedBlogs(_req, res, next) {
  try {
    const blogs = await blogsService.getFeaturedBlogs();
    return successResponse(res, "Featured blogs fetched successfully", blogs);
  } catch (error) {
    return next(error);
  }
}

export async function getBlogBySlug(req, res, next) {
  try {
    const blog = await blogsService.getBlogBySlug(req.params.slug);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return successResponse(res, "Blog fetched successfully", blog);
  } catch (error) {
    return next(error);
  }
}

export async function getBlogPreviewBySlug(req, res, next) {
  try {
    const blog = await blogsService.getBlogPreviewBySlug(req.params.slug);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return successResponse(res, "Blog preview fetched successfully", blog);
  } catch (error) {
    return next(error);
  }
}

function toPositiveInt(value, fallback) {
  const parsed = Number.parseInt(value, 10);
  if (Number.isNaN(parsed) || parsed <= 0) return fallback;
  return parsed;
}

export async function getBlogsAdmin(req, res, next) {
  try {
    const page = toPositiveInt(req.query.page, 1);
    const pageSize = toPositiveInt(req.query.pageSize, 6);
    const search = String(req.query.search || "").trim();

    const result = await blogsService.getBlogsAdminPaged({ page, pageSize, search });
    return successResponse(res, "Admin blogs fetched successfully", {
      items: result.items,
      pagination: {
        page,
        pageSize,
        total: result.total
      }
    });
  } catch (error) {
    return next(error);
  }
}

export async function getBlogCategoriesAdmin(_req, res, next) {
  try {
    const categories = await blogsService.getBlogCategories();
    return successResponse(res, "Blog categories fetched successfully", categories);
  } catch (error) {
    return next(error);
  }
}

export async function getBlogAdminById(req, res, next) {
  try {
    const blog = await blogsService.getBlogAdminById(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return successResponse(res, "Admin blog fetched successfully", blog);
  } catch (error) {
    return next(error);
  }
}

export async function createBlog(req, res, next) {
  try {
    const blog = await blogsService.createBlog(req.body);
    return successResponse(res, "Blog created successfully", blog, 201);
  } catch (error) {
    return next(error);
  }
}

export async function importBlogJson(req, res, next) {
  try {
    const rawJson = req.file?.buffer?.toString("utf8") || JSON.stringify(req.body || {});
    let payload;

    try {
      payload = JSON.parse(rawJson);
    } catch {
      return res.status(400).json({
        success: false,
        message: "Invalid JSON format"
      });
    }

    const requiredFields = ["title", "slug", "category", "excerpt", "content"];
    const missingField = requiredFields.find((field) => !String(payload?.[field] || "").trim());

    if (missingField) {
      return res.status(400).json({
        success: false,
        message: `Missing required field: ${missingField}`
      });
    }

    const blog = await blogsService.importBlogJson(payload);
    return successResponse(
      res,
      "Blog JSON imported successfully",
      {
        blogId: blog?.id,
        status: blog?.status || "draft"
      },
      201
    );
  } catch (error) {
    return next(error);
  }
}

export async function updateBlog(req, res, next) {
  try {
    const blog = await blogsService.updateBlog(req.params.id, req.body);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return successResponse(res, "Blog updated successfully", blog);
  } catch (error) {
    return next(error);
  }
}

export async function uploadBlogImage(req, res, next) {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required"
      });
    }

    const imageUrl = buildPublicUrl(req, `/uploads/${req.file.filename}`);
    const blog = await blogsService.uploadBlogImage(req.params.id, imageUrl);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return successResponse(res, "Blog image uploaded successfully", blog);
  } catch (error) {
    return next(error);
  }
}

export async function publishBlog(req, res, next) {
  try {
    const blog = await blogsService.publishBlog(req.params.id);

    if (!blog) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return successResponse(res, "Blog published successfully", blog);
  } catch (error) {
    return next(error);
  }
}

export async function deleteBlog(req, res, next) {
  try {
    const deleted = await blogsService.deleteBlog(req.params.id);

    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Blog not found"
      });
    }

    return successResponse(res, "Blog deleted successfully", deleted);
  } catch (error) {
    return next(error);
  }
}
