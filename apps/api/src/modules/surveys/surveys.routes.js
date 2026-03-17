import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { createSurvey } from "./surveys.controller.js";
import { createSurveySchema } from "./surveys.validator.js";

const router = Router();

router.post("/", validateRequest(createSurveySchema), createSurvey);

export default router;
