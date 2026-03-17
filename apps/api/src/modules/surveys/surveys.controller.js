import { successResponse } from "../../utils/response.js";

import { surveysService } from "./surveys.service.js";

export async function createSurvey(req, res, next) {
  try {
    const survey = await surveysService.createSurvey(req.body);
    return successResponse(
      res,
      "Survey submitted successfully",
      {
        surveyId: survey.id
      },
      201
    );
  } catch (error) {
    return next(error);
  }
}
