import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import {
  createClientProject,
  createClientUser,
  getClientAccessOverview,
  updateClientProject,
  updateClientUser
} from "./clientAccess.controller.js";
import {
  clientAccessEntityIdParamSchema,
  clientAccessProjectSchema,
  clientAccessUserCreateSchema,
  clientAccessUserUpdateSchema
} from "./clientAccess.validator.js";

const router = Router();

router.get("/", getClientAccessOverview);
router.post("/projects", validateRequest(clientAccessProjectSchema), createClientProject);
router.put("/projects/:id", validateRequest(clientAccessEntityIdParamSchema, "params"), validateRequest(clientAccessProjectSchema), updateClientProject);
router.post("/users", validateRequest(clientAccessUserCreateSchema), createClientUser);
router.put("/users/:id", validateRequest(clientAccessEntityIdParamSchema, "params"), validateRequest(clientAccessUserUpdateSchema), updateClientUser);

export default router;
