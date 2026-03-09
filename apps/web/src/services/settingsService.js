import { apiClient } from "./apiClient";

export const settingsService = {
  async getSettings() {
    const { data } = await apiClient.get("/api/settings");
    return data;
  }
};
