import { apiClient } from "./apiClient";

export const surveyService = {
  async createSurvey(payload) {
    const { data } = await apiClient.post("/api/surveys", payload);
    return data;
  }
};
