import { Router } from "express";

import { getSettings } from "./settings.controller.js";

const router = Router();

router.get("/", getSettings);

export default router;
