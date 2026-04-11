import { Router } from "express";

import { clientAuth } from "../../middleware/clientAuth.js";
import { validateRequest } from "../../middleware/validateRequest.js";

import clientProjectUploadsRoutes from "./clientProjectUploads.routes.js";
import { createProjectTicket, deleteProjectTicket, getProjectDashboard, getProjectTicket, getProjectTickets, updateProjectTicket } from "./clientProjects.controller.js";
import { clientCreateTicketSchema, clientProjectSlugParamSchema, clientProjectTicketParamSchema, clientProjectTicketsQuerySchema, clientUpdateTicketSchema } from "./clientProjects.validator.js";

const router = Router();

router.use(clientAuth);
router.use("/:projectSlug/tickets", clientProjectUploadsRoutes);
router.get("/:projectSlug/dashboard", validateRequest(clientProjectSlugParamSchema, "params"), getProjectDashboard);
router.get("/:projectSlug/tickets", validateRequest(clientProjectSlugParamSchema, "params"), validateRequest(clientProjectTicketsQuerySchema, "query"), getProjectTickets);
router.post("/:projectSlug/tickets", validateRequest(clientProjectSlugParamSchema, "params"), validateRequest(clientCreateTicketSchema), createProjectTicket);
router.get("/:projectSlug/tickets/:ticketId", validateRequest(clientProjectTicketParamSchema, "params"), getProjectTicket);
router.patch("/:projectSlug/tickets/:ticketId", validateRequest(clientProjectTicketParamSchema, "params"), validateRequest(clientUpdateTicketSchema), updateProjectTicket);
router.delete("/:projectSlug/tickets/:ticketId", validateRequest(clientProjectTicketParamSchema, "params"), deleteProjectTicket);

export default router;
