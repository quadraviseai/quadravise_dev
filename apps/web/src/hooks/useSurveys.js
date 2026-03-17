import { useMutation } from "@tanstack/react-query";

import { surveyService } from "../services/surveyService";

export function useSurveys() {
  return useMutation({
    mutationFn: surveyService.createSurvey
  });
}
