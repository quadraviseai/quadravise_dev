import { slugify } from "../../utils/slugify.js";

import { blogsRepository } from "./blogs.repository.js";

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
    const slug = slugify(payload.slug || payload.title);
    const created = await blogsRepository.create({
      ...payload,
      slug,
      importSource: payload.importSource || "manual",
      imageStatus: payload.imageStatus || (payload.coverImage || payload.featuredImage ? "uploaded" : "missing")
    });
    if (!created) return null;
    await blogsRepository.replaceSocialPublications(created.id, payload.distribution);
    return this.getBlogAdminById(created.id);
  },
  async updateBlog(id, payload) {
    const slug = slugify(payload.slug || payload.title);
    await blogsRepository.updateById(id, {
      ...payload,
      slug,
      importSource: payload.importSource || "manual",
      imageStatus: payload.imageStatus || (payload.coverImage || payload.featuredImage ? "uploaded" : "missing")
    });
    await blogsRepository.replaceSocialPublications(id, payload.distribution);
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
