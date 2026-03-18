import { slugify } from "../../utils/slugify.js";

import { portfolioRepository } from "./portfolio.repository.js";

export const portfolioService = {
  normalizeProjectPayload(payload = {}) {
    return {
      title: String(payload.title || "").trim(),
      category: String(payload.category || "General").trim() || "General",
      description: String(payload.description || "").trim(),
      techStack: Array.isArray(payload.techStack)
        ? payload.techStack.map((item) => String(item || "").trim()).filter(Boolean)
        : String(payload.tech_stack || payload.techStack || "")
            .split(",")
            .map((item) => item.trim())
            .filter(Boolean),
      timeline: String(payload.timeline || "").trim(),
      clientSatisfaction: String(payload.clientSatisfaction || payload.client_satisfaction || "").trim(),
      outcome: String(payload.outcome || "").trim(),
      featuredImage: String(payload.featuredImage || payload.featured_image || payload.coverImage || "").trim(),
      isPublished: Boolean(payload.isPublished ?? payload.is_published ?? false)
    };
  },
  async getProjects() {
    return portfolioRepository.findAll();
  },
  async getProjectBySlug(slug) {
    return portfolioRepository.findBySlug(slug);
  },
  async getProjectsAdmin() {
    return portfolioRepository.findAllAdmin();
  },
  async getProjectsAdminPaged({ page, pageSize, search }) {
    return portfolioRepository.findAllAdminPaged({ page, pageSize, search });
  },
  async createProject(payload) {
    const normalizedPayload = this.normalizeProjectPayload(payload);
    const slug = slugify(normalizedPayload.title);
    const created = await portfolioRepository.create({ ...normalizedPayload, slug });
    return created ? portfolioRepository.findByIdAdmin(created.id) : null;
  },
  async updateProject(id, payload) {
    const normalizedPayload = this.normalizeProjectPayload(payload);
    const slug = slugify(normalizedPayload.title);
    const updated = await portfolioRepository.updateById(id, { ...normalizedPayload, slug });
    return updated ? portfolioRepository.findByIdAdmin(id) : null;
  },
  async importProjectJson(payload) {
    return this.createProject(payload);
  },
  async uploadProjectImage(id, imageUrl) {
    const updated = await portfolioRepository.updateImageById(id, imageUrl);
    return updated ? portfolioRepository.findByIdAdmin(id) : null;
  },
  async deleteProject(id) {
    return portfolioRepository.deleteById(id);
  }
};
