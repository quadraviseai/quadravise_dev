import { slugify } from "../../utils/slugify.js";

import { blogsRepository } from "./blogs.repository.js";

function trimText(value, maxLength, fallback = "") {
  if (value == null) return fallback;
  const normalizedValue = String(value).trim();
  if (!normalizedValue) return fallback;
  return normalizedValue.slice(0, maxLength);
}

function trimOptionalText(value, maxLength) {
  return trimText(value, maxLength, "");
}

function normalizeTags(tags) {
  if (!Array.isArray(tags)) return [];
  return tags
    .map((tag) => trimText(tag, 60, ""))
    .filter(Boolean);
}

function normalizeBlogPayload(payload) {
  return {
    ...payload,
    title: trimText(payload.title, 180, "Untitled Blog"),
    slug: trimOptionalText(payload.slug, 220),
    excerpt: trimText(payload.excerpt, 10000, ""),
    content: typeof payload.content === "string" ? payload.content : "",
    category: trimText(payload.category, 100, "General"),
    tags: normalizeTags(payload.tags),
    author: trimText(payload.author, 120, "Quadravise Team"),
    readingTime: trimOptionalText(payload.readingTime, 40),
    metaTitle: trimOptionalText(payload.metaTitle, 60),
    metaDescription: trimOptionalText(payload.metaDescription, 160),
    ogTitle: trimOptionalText(payload.ogTitle, 120),
    ogDescription: trimOptionalText(payload.ogDescription, 220)
  };
}

export const blogsService = {
  async getBlogs() {
    return blogsRepository.findAll();
  },
  async getFeaturedBlogs() {
    return blogsRepository.findFeatured();
  },
  async getBlogBySlug(slug) {
    return blogsRepository.findBySlug(slug);
  },
  async getBlogPreviewBySlug(slug) {
    return blogsRepository.findBySlugAdmin(slug);
  },
  async getBlogsAdmin() {
    return blogsRepository.findAllAdmin();
  },
  async getBlogAdminById(id) {
    const blog = await blogsRepository.findByIdAdmin(id);
    if (!blog) return null;
    const publications = await blogsRepository.findSocialPublicationsByBlogId(id);
    const linkedin = publications.find((item) => item.platform === "linkedin");
    const facebook = publications.find((item) => item.platform === "facebook");
    return {
      ...blog,
      distribution: {
        publishToWebsite: blog.status === "published" || blog.status === "scheduled",
        shareToLinkedin: Boolean(linkedin),
        shareToFacebook: Boolean(facebook),
        linkedinAccountId: linkedin?.socialAccountId || "",
        facebookAccountId: facebook?.socialAccountId || "",
        linkedinCaption: linkedin?.caption || "",
        facebookCaption: facebook?.caption || "",
        useFeaturedImageForSocial: linkedin?.useFeaturedImage ?? facebook?.useFeaturedImage ?? true,
        socialPublishAt: linkedin?.scheduledAt || facebook?.scheduledAt || "",
        autoShareAfterWebsitePublish:
          linkedin?.autoShareAfterWebsitePublish ?? facebook?.autoShareAfterWebsitePublish ?? true
      }
    };
  },
  async getBlogsAdminPaged({ page, pageSize, search }) {
    return blogsRepository.findAllAdminPaged({ page, pageSize, search });
  },
  async getBlogCategories() {
    return blogsRepository.findCategories();
  },
  async createBlog(payload) {
    const normalizedPayload = normalizeBlogPayload(payload);
    const slug = slugify(normalizedPayload.slug || normalizedPayload.title).slice(0, 220);
    const created = await blogsRepository.create({
      ...normalizedPayload,
      slug,
      importSource: normalizedPayload.importSource || "manual",
      imageStatus:
        normalizedPayload.imageStatus || (normalizedPayload.coverImage || normalizedPayload.featuredImage ? "uploaded" : "missing")
    });
    if (!created) return null;
    await blogsRepository.replaceSocialPublications(created.id, normalizedPayload.distribution);
    return this.getBlogAdminById(created.id);
  },
  async updateBlog(id, payload) {
    const normalizedPayload = normalizeBlogPayload(payload);
    const slug = slugify(normalizedPayload.slug || normalizedPayload.title).slice(0, 220);
    await blogsRepository.updateById(id, {
      ...normalizedPayload,
      slug,
      importSource: normalizedPayload.importSource || "manual",
      imageStatus:
        normalizedPayload.imageStatus || (normalizedPayload.coverImage || normalizedPayload.featuredImage ? "uploaded" : "missing")
    });
    await blogsRepository.replaceSocialPublications(id, normalizedPayload.distribution);
    return this.getBlogAdminById(id);
  },
  async importBlogJson(payload) {
    return this.createBlog({
      title: payload.title,
      slug: payload.slug,
      category: payload.category,
      tags: payload.tags || [],
      excerpt: payload.excerpt,
      content: payload.content,
      metaTitle: payload.meta_title || payload.metaTitle || "",
      metaDescription: payload.meta_description || payload.metaDescription || "",
      ogTitle: payload.og_title || payload.ogTitle || "",
      ogDescription: payload.og_description || payload.ogDescription || "",
      ogImage: payload.og_image || payload.ogImage || "",
      author: payload.author || "Quadravise Team",
      status: "draft",
      importSource: "json",
      imageStatus: payload.cover_image_url || payload.coverImage ? "uploaded" : "missing",
      coverImage: payload.cover_image_url || payload.coverImage || "",
      distribution: {
        publishToWebsite: false
      }
    });
  },
  async uploadBlogImage(id, imageUrl) {
    await blogsRepository.updateImageById(id, imageUrl);
    return this.getBlogAdminById(id);
  },
  async publishBlog(id) {
    await blogsRepository.publishById(id);
    return this.getBlogAdminById(id);
  },
  async deleteBlog(id) {
    return blogsRepository.deleteById(id);
  }
};
