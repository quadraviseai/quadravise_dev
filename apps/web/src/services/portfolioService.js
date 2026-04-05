import { apiClient } from "./apiClient";

export const portfolioService = {
  async getProjects() {
    const { data } = await apiClient.get("/api/portfolio");
    return data;
  },
  async getHomepageProjects() {
    const { data } = await apiClient.get("/api/portfolio/homepage");
    return data;
  },
  async getProjectBySlug(slug) {
    const { data } = await apiClient.get(`/api/portfolio/${slug}`);
    return data;
  },
  async trackProjectLinkClick(slug, payload) {
    const { data } = await apiClient.post(`/api/portfolio/${slug}/track-click`, payload);
    return data;
  }
};
