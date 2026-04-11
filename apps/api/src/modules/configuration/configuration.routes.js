import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { getConfiguration, updateConfiguration } from "./configuration.controller.js";
import { updateConfigurationSchema } from "./configuration.validator.js";

const router = Router();

router.get("/", getConfiguration);
router.put("/", validateRequest(updateConfigurationSchema), updateConfiguration);

export default router;
