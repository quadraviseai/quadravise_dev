import { apiClient } from "./apiClient";

export const blogService = {
  async getBlogs() {
    const { data } = await apiClient.get("/api/blogs");
    return data;
  },
  async getFeaturedBlogs() {
    const { data } = await apiClient.get("/api/blogs/featured");
    return data;
  },
  async getBlogBySlug(slug) {
    const { data } = await apiClient.get(`/api/blogs/${slug}`);
    return data;
  }
};
