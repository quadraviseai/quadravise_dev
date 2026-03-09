import { Router } from "express";

import { getSocialAccounts } from "./socialAccounts.controller.js";

const router = Router();

router.get("/", getSocialAccounts);

export default router;
