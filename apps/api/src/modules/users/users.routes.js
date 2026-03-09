import { Router } from "express";

import { validateRequest } from "../../middleware/validateRequest.js";

import { createUser, deleteUser, getUsers, updateUser } from "./users.controller.js";
import { createUserSchema, updateUserSchema, userIdParamSchema } from "./users.validator.js";

const router = Router();

router.get("/", getUsers);
router.post("/", validateRequest(createUserSchema), createUser);
router.put("/:id", validateRequest(userIdParamSchema, "params"), validateRequest(updateUserSchema), updateUser);
router.delete("/:id", validateRequest(userIdParamSchema, "params"), deleteUser);

export default router;
