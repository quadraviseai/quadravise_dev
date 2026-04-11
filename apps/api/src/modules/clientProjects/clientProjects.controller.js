import { successResponse } from "../../utils/response.js";
import { buildPublicUrl } from "../../utils/publicUrl.js";

import { clientProjectsRepository } from "./clientProjects.repository.js";

export async function getProjectDashboard(req, res, next) {
  try {
    const project = await clientProjectsRepository.findDashboardByUserAndSlug(req.clientUser.userId, req.params.projectSlug, {
      adminPreview: Boolean(req.clientUser?.isAdminPreview)
    });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied"
      });
    }

    return successResponse(res, "Project dashboard fetched successfully", {
      project: {
        name: project.name,
        slug: project.slug,
        description: project.description
      },
      summary: {
        total: project.totalBugs || 0,
        resolved: project.resolvedBugs || 0,
        pending: project.pendingBugs || 0
      },
      pendingEta: project.nextEtaAt || null,
      quickNote: project.quickNote || "",
      quickNoteUpdatedAt: project.quickNoteUpdatedAt || null
    });
  } catch (error) {
    return next(error);
  }
}

export async function getProjectTickets(req, res, next) {
  try {
    const { page, pageSize, ticketId, title, severity, status, eta, updatedOn, createdOn, sortBy, sortOrder } = req.query;
    const adminPreview = Boolean(req.clientUser?.isAdminPreview);
    const project = await clientProjectsRepository.findProjectForUser(req.clientUser.userId, req.params.projectSlug, { adminPreview });
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied"
      });
    }

    const result = await clientProjectsRepository.listTicketsByUserAndSlug(req.clientUser.userId, req.params.projectSlug, {
      page,
      pageSize,
      ticketId,
      title,
      severities: severity || [],
      statuses: status || [],
      eta,
      updatedOn,
      createdOn,
      adminPreview,
      sortBy,
      sortOrder
    });

    return successResponse(res, "Project tickets fetched successfully", {
      project,
      items: result.items,
      pagination: {
        page,
        pageSize,
        total: result.total
      },
      filters: {
        ticketId: ticketId || "",
        title: title || "",
        severity: severity || [],
        status: status || [],
        eta: eta || null,
        updatedOn: updatedOn || null,
        createdOn: createdOn || null,
        sortBy: sortBy || null,
        sortOrder: sortOrder || null
      }
    });
  } catch (error) {
    return next(error);
  }
}

export async function getProjectTicket(req, res, next) {
  try {
    const ticket = await clientProjectsRepository.findTicketByUserAndSlug(req.clientUser.userId, req.params.projectSlug, req.params.ticketId, {
      adminPreview: Boolean(req.clientUser?.isAdminPreview)
    });
    if (!ticket) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found or access denied"
      });
    }

    const normalizedTicket = {
      ...ticket,
      attachments: (ticket.attachments || []).map((attachment) => ({
        ...attachment,
        url: buildPublicUrl(req, attachment.relativeUrl)
      }))
    };

    return successResponse(res, "Project ticket fetched successfully", {
      ticket: normalizedTicket
    });
  } catch (error) {
    return next(error);
  }
}

export async function createProjectTicket(req, res, next) {
  try {
    const project = await clientProjectsRepository.findProjectForUser(req.clientUser.userId, req.params.projectSlug);
    if (!project) {
      return res.status(404).json({
        success: false,
        message: "Project not found or access denied"
      });
    }

    const created = await clientProjectsRepository.createTicketForProject(project.id, req.clientUser.userId, req.body);
    await clientProjectsRepository.insertTicketAttachments(created.id, req.body.attachments || []);
    await clientProjectsRepository.insertStatusHistory(created.id, null, "new", "Ticket created by client from dashboard");

    return successResponse(
      res,
      "Bug ticket created successfully",
      {
        ticket: created,
        reference: created.ticketNumber ? `BUG-${created.ticketNumber}` : created.id
      },
      201
    );
  } catch (error) {
    return next(error);
  }
}

export async function updateProjectTicket(req, res, next) {
  try {
    const existing = await clientProjectsRepository.findTicketByUserAndSlug(req.clientUser.userId, req.params.projectSlug, req.params.ticketId);
    if (!existing) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found or access denied"
      });
    }

    const updated = await clientProjectsRepository.updateTicketByUserAndSlug(
      req.clientUser.userId,
      req.params.projectSlug,
      req.params.ticketId,
      req.body
    );
    if (existing.status !== req.body.status) {
      await clientProjectsRepository.insertStatusHistory(
        req.params.ticketId,
        existing.status,
        req.body.status,
        "Status updated by client"
      );
    }
    await clientProjectsRepository.replaceTicketAttachments(req.params.ticketId, req.body.attachments || []);

    return successResponse(res, "Bug ticket updated successfully", {
      ticket: {
        ...updated,
        attachments: (req.body.attachments || []).map((attachment) => ({
          ...attachment,
          url: attachment.relativeUrl ? buildPublicUrl(req, attachment.relativeUrl) : attachment.url
        }))
      }
    });
  } catch (error) {
    return next(error);
  }
}

export async function deleteProjectTicket(req, res, next) {
  try {
    const deleted = await clientProjectsRepository.archiveTicketByUserAndSlug(req.clientUser.userId, req.params.projectSlug, req.params.ticketId);
    if (!deleted) {
      return res.status(404).json({
        success: false,
        message: "Ticket not found or access denied"
      });
    }

    return successResponse(res, "Bug ticket deleted successfully", {});
  } catch (error) {
    return next(error);
  }
}
