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
  async uploadImage(file) {
    return this.uploadBlogImage(file);
  },
  async uploadDocument(file) {
    const formData = new FormData();
    formData.append("document", file);
    const { data } = await apiClient.post("/api/admin/uploads/document", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },
  async deleteUpload(relativeUrl) {
    const { data } = await apiClient.delete("/api/admin/uploads", {
      data: { relativeUrl }
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
  async getPortfolioAnalytics(params = {}) {
    const { data } = await apiClient.get("/api/admin/portfolio/analytics", { params });
    return data;
  },
  async getUsers(params = {}) {
    const { data } = await apiClient.get("/api/admin/users", { params });
    return data;
  },
  async getClientAccessOverview() {
    const { data } = await apiClient.get("/api/admin/client-access");
    return data;
  },
  async createClientProject(payload) {
    const { data } = await apiClient.post("/api/admin/client-access/projects", payload);
    return data;
  },
  async updateClientProject(id, payload) {
    const { data } = await apiClient.put(`/api/admin/client-access/projects/${id}`, payload);
    return data;
  },
  async createClientUser(payload) {
    const { data } = await apiClient.post("/api/admin/client-access/users", payload);
    return data;
  },
  async updateClientUser(id, payload) {
    const { data } = await apiClient.put(`/api/admin/client-access/users/${id}`, payload);
    return data;
  },
  async getConfiguration() {
    const { data } = await apiClient.get("/api/admin/configuration");
    return data;
  },
  async updateConfiguration(payload) {
    const { data } = await apiClient.put("/api/admin/configuration", payload);
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
  async importPortfolioJson(file) {
    const formData = new FormData();
    formData.append("file", file);
    const { data } = await apiClient.post("/api/admin/portfolio/import-json", formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },
  async updatePortfolio(id, payload) {
    const { data } = await apiClient.put(`/api/admin/portfolio/${id}`, payload);
    return data;
  },
  async duplicatePortfolio(id) {
    const { data } = await apiClient.post(`/api/admin/portfolio/${id}/duplicate`);
    return data;
  },
  async archivePortfolio(id) {
    const { data } = await apiClient.post(`/api/admin/portfolio/${id}/archive`);
    return data;
  },
  async restorePortfolio(id) {
    const { data } = await apiClient.post(`/api/admin/portfolio/${id}/restore`);
    return data;
  },
  async uploadPortfolioImage(id, file) {
    const formData = new FormData();
    formData.append("image", file);
    const { data } = await apiClient.post(`/api/admin/portfolio/${id}/upload-image`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  },
  async bulkDeletePortfolio(ids) {
    const { data } = await apiClient.post("/api/admin/portfolio/bulk-delete", { ids });
    return data;
  },
  async bulkPublishPortfolio(ids) {
    const { data } = await apiClient.post("/api/admin/portfolio/bulk-publish", { ids });
    return data;
  },
  async bulkUnpublishPortfolio(ids) {
    const { data } = await apiClient.post("/api/admin/portfolio/bulk-unpublish", { ids });
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
