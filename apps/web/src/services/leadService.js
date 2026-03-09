import { apiClient } from "./apiClient";

export const leadService = {
  async createLead(payload) {
    const { data } = await apiClient.post("/api/leads", payload);
    return data;
  }
};
