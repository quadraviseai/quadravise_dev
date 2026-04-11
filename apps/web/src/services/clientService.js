import { apiClient } from "./apiClient";

export const clientService = {
  async login(payload) {
    const { data } = await apiClient.post("/api/client/auth/login", payload);
    return data;
  },
  async me() {
    const { data } = await apiClient.get("/api/client/auth/me");
    return data;
  },
  async logout() {
    const { data } = await apiClient.post("/api/client/auth/logout");
    return data;
  },
  async getProjectDashboard(projectSlug) {
    const { data } = await apiClient.get(`/api/client/projects/${projectSlug}/dashboard`);
    return data;
  },
  async getProjectTickets(projectSlug, params = {}) {
    const { data } = await apiClient.get(`/api/client/projects/${projectSlug}/tickets`, { params });
    return data;
  },
  async getProjectTicket(projectSlug, ticketId) {
    const { data } = await apiClient.get(`/api/client/projects/${projectSlug}/tickets/${ticketId}`);
    return data;
  },
  async createProjectTicket(projectSlug, payload) {
    const { data } = await apiClient.post(`/api/client/projects/${projectSlug}/tickets`, payload);
    return data;
  },
  async updateProjectTicket(projectSlug, ticketId, payload) {
    const { data } = await apiClient.patch(`/api/client/projects/${projectSlug}/tickets/${ticketId}`, payload);
    return data;
  },
  async deleteProjectTicket(projectSlug, ticketId) {
    const { data } = await apiClient.delete(`/api/client/projects/${projectSlug}/tickets/${ticketId}`);
    return data;
  },
  async uploadTicketAttachment(projectSlug, file) {
    const formData = new FormData();
    formData.append("attachment", file);
    const { data } = await apiClient.post(`/api/client/projects/${projectSlug}/tickets/uploads`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return data;
  }
};
