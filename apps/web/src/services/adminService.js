import { apiClient } from "./apiClient";

export const adminService = {
  async login(payload) {
    const { data } = await apiClient.post("/api/admin/auth/login", payload);
    return data;
  },
  async forgotPassword(payload = {}) {
    const { data } = await apiClient.post("/api/admin/auth/forgot-password", payload);
    return data;
  },
  async resetPassword(payload) {
    const { data } = await apiClient.post("/api/admin/auth/reset-password", payload);
    return data;
  },
  async logout() {
    const { data } = await apiClient.post("/api/admin/auth/logout");
    return data;
  },
  async me() {
    const { data } = await apiClient.get("/api/admin/auth/me");
    return data;
  },
  async getBlogs(params = {}) {
    const { data } = await apiClient.get("/api/admin/blogs", { params });
    return data;
  },
  async getLeads(params = {}) {
    const { data } = await apiClient.get("/api/admin/leads", { params });
    return data;
  },
  async getBlogById(id) {
    const { data } = await apiClient.get(`/api/admin/blogs/${id}`);
    return data;
  },
  async getBlogPreviewBySlug(slug) {
    const { data } = await apiClient.get(`/api/admin/blogs/preview/${slug}`);
    return data;
  },
  async getBlogCategories() {
    const { data } = await apiClient.get("/api/admin/blogs/categories");
    return data;
  },
  async importBlogJson(file) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post("/api/admin/blogs/import-json", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },
  async getSocialAccounts() {
    const { data } = await apiClient.get("/api/admin/social-accounts");
    return data;
  },
  async uploadBlogImage(file) {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await apiClient.post("/api/admin/uploads/image", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },
  async createBlog(payload) {
    const { data } = await apiClient.post("/api/admin/blogs", payload);
    return data;
  },
  async updateBlog(id, payload) {
    const { data } = await apiClient.put(`/api/admin/blogs/${id}`, payload);
    return data;
  },
  async uploadBlogCoverImage(id, file) {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await apiClient.post(`/api/admin/blogs/${id}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },
  async publishBlog(id) {
    const { data } = await apiClient.post(`/api/admin/blogs/${id}/publish`);
    return data;
  },
  async deleteBlog(id) {
    const { data } = await apiClient.delete(`/api/admin/blogs/${id}`);
    return data;
  },
  async getPortfolio(params = {}) {
    const { data } = await apiClient.get("/api/admin/portfolio", { params });
    return data;
  },
  async getUsers(params = {}) {
    const { data } = await apiClient.get("/api/admin/users", { params });
    return data;
  },
  async createUser(payload) {
    const { data } = await apiClient.post("/api/admin/users", payload);
    return data;
  },
  async updateUser(id, payload) {
    const { data } = await apiClient.put(`/api/admin/users/${id}`, payload);
    return data;
  },
  async deleteUser(id) {
    const { data } = await apiClient.delete(`/api/admin/users/${id}`);
    return data;
  },
  async createPortfolio(payload) {
    const { data } = await apiClient.post("/api/admin/portfolio", payload);
    return data;
  },
  async updatePortfolio(id, payload) {
    const { data } = await apiClient.put(`/api/admin/portfolio/${id}`, payload);
    return data;
  },
  async deletePortfolio(id) {
    const { data } = await apiClient.delete(`/api/admin/portfolio/${id}`);
    return data;
  },
  async updateSettings(payload) {
    const { data } = await apiClient.put("/api/admin/settings", payload);
    return data;
  }
};
