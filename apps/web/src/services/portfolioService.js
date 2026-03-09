import { apiClient } from "./apiClient";

export const portfolioService = {
  async getProjects() {
    const { data } = await apiClient.get("/api/portfolio");
    return data;
  },
  async getProjectBySlug(slug) {
    const { data } = await apiClient.get(`/api/portfolio/${slug}`);
    return data;
  }
};
