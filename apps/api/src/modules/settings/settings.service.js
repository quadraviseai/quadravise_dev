import { settingsRepository } from "./settings.repository.js";

export const settingsService = {
  async getSettings() {
    return settingsRepository.getSettings();
  },
  async updateSettings(payload) {
    return settingsRepository.updateSettings(payload);
  }
};

