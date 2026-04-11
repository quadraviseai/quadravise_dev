import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";
import { clientAuth } from "../../middleware/clientAuth.js";

import { getClientSession, loginClient, logoutClient } from "./clientAuth.controller.js";
import { clientLoginSchema } from "./clientAuth.validator.js";

const router = Router();

router.post("/login", validateRequest(clientLoginSchema), loginClient);
router.post("/logout", logoutClient);
router.get("/me", clientAuth, getClientSession);

export default router;

