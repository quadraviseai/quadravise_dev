import { Router } from "express";

import { getLeadsAdmin } from "./leads.controller.js";

const router = Router();

router.get("/", getLeadsAdmin);

export default router;
