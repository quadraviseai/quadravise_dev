import { slugify } from "../../utils/slugify.js";

import { portfolioRepository } from "./portfolio.repository.js";

export const portfolioService = {
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
    const slug = slugify(payload.title);
    const created = await portfolioRepository.create({ ...payload, slug });
    return created ? portfolioRepository.findByIdAdmin(created.id) : null;
  },
  async updateProject(id, payload) {
    const slug = slugify(payload.title);
    const updated = await portfolioRepository.updateById(id, { ...payload, slug });
    return updated ? portfolioRepository.findByIdAdmin(id) : null;
  },
  async deleteProject(id) {
    return portfolioRepository.deleteById(id);
  }
};
