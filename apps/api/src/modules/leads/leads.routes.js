import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { createLead } from "./leads.controller.js";
import { createLeadSchema } from "./leads.validator.js";

const router = Router();

router.post("/", validateRequest(createLeadSchema), createLead);

export default router;
