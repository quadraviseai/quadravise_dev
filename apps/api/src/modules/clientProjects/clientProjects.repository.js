import { query } from "../../config/db.js";

const sortableColumns = {
  ticketNumber: 'bt.ticket_number',
  title: 'bt.title',
  severity: 'bt.severity',
  status: 'bt.status',
  etaAt: 'bt.eta_at',
  updatedAt: 'bt.updated_at',
  createdAt: 'bt.created_at'
};

export const clientProjectsRepository = {
  async findDashboardByUserAndSlug(userId, projectSlug, { adminPreview = false } = {}) {
    if (adminPreview) {
      const rows = await query(
        `
          SELECT
            p.id::text,
            p.name,
            p.slug,
            p.description,
            p.developer_note_public AS "quickNote",
            p.note_updated_at AS "quickNoteUpdatedAt",
            COUNT(bt.id)::int AS "totalBugs",
            COUNT(bt.id) FILTER (WHERE bt.status IN ('resolved', 'closed'))::int AS "resolvedBugs",
            COUNT(bt.id) FILTER (WHERE bt.status IN ('new', 'in_progress', 'need_clarification', 'reopened'))::int AS "pendingBugs",
            MIN(bt.eta_at) FILTER (
              WHERE bt.status IN ('new', 'in_progress', 'need_clarification', 'reopened')
                AND bt.eta_at IS NOT NULL
            ) AS "nextEtaAt"
          FROM client_projects p
          LEFT JOIN bug_tickets bt ON bt.client_project_id = p.id AND bt.is_archived = FALSE
          WHERE p.slug = $1
          GROUP BY p.id, p.name, p.slug, p.description, p.developer_note_public, p.note_updated_at
          LIMIT 1
        `,
        [projectSlug]
      );
      return rows[0] || null;
    }

    const rows = await query(
      `
        SELECT
          p.id::text,
          p.name,
          p.slug,
          p.description,
          p.developer_note_public AS "quickNote",
          p.note_updated_at AS "quickNoteUpdatedAt",
          COUNT(bt.id)::int AS "totalBugs",
          COUNT(bt.id) FILTER (WHERE bt.status IN ('resolved', 'closed'))::int AS "resolvedBugs",
          COUNT(bt.id) FILTER (WHERE bt.status IN ('new', 'in_progress', 'need_clarification', 'reopened'))::int AS "pendingBugs",
          MIN(bt.eta_at) FILTER (
            WHERE bt.status IN ('new', 'in_progress', 'need_clarification', 'reopened')
              AND bt.eta_at IS NOT NULL
          ) AS "nextEtaAt"
        FROM client_project_memberships m
        INNER JOIN client_projects p ON p.id = m.client_project_id
        LEFT JOIN bug_tickets bt ON bt.client_project_id = p.id AND bt.is_archived = FALSE
        WHERE m.client_user_id = $1::uuid
          AND m.is_active = TRUE
          AND p.status = 'active'
          AND p.slug = $2
        GROUP BY p.id, p.name, p.slug, p.description, p.developer_note_public, p.note_updated_at
        LIMIT 1
      `,
      [userId, projectSlug]
    );
    return rows[0] || null;
  },

  async findProjectForUser(userId, projectSlug, { adminPreview = false } = {}) {
    if (adminPreview) {
      const rows = await query(
        `
          SELECT
            id::text,
            name,
            slug,
            description
          FROM client_projects
          WHERE slug = $1
          LIMIT 1
        `,
        [projectSlug]
      );
      return rows[0] || null;
    }

    const rows = await query(
      `
        SELECT
          p.id::text,
          p.name,
          p.slug,
          p.description
        FROM client_project_memberships m
        INNER JOIN client_projects p ON p.id = m.client_project_id
        WHERE m.client_user_id = $1::uuid
          AND m.is_active = TRUE
          AND p.status = 'active'
          AND p.slug = $2
        LIMIT 1
      `,
      [userId, projectSlug]
    );
    return rows[0] || null;
  },

  async listTicketsByUserAndSlug(
    userId,
    projectSlug,
    {
      page = 1,
      pageSize = 10,
      ticketId,
      title,
      severities = [],
      statuses = [],
      eta,
      updatedOn,
      createdOn,
      adminPreview = false,
      sortBy = "updatedAt",
      sortOrder = "desc"
    }
  ) {
    if (adminPreview) {
      const offset = (page - 1) * pageSize;
      const params = [projectSlug];
      let filterSql = "";

      if (ticketId) {
        params.push(`%${ticketId.toLowerCase()}%`);
        filterSql += ` AND (LOWER(CONCAT('bug-', COALESCE(bt.ticket_number::text, ''))) LIKE $${params.length} OR LOWER(bt.id::text) LIKE $${params.length})`;
      }

      if (title) {
        params.push(`%${title.toLowerCase()}%`);
        filterSql += ` AND LOWER(bt.title) LIKE $${params.length}`;
      }

      if (severities.length) {
        params.push(severities);
        filterSql += ` AND bt.severity = ANY($${params.length}::text[])`;
      }

      if (statuses.length) {
        params.push(statuses);
        filterSql += ` AND bt.status = ANY($${params.length}::text[])`;
      }

      if (eta === "available") {
        filterSql += " AND bt.eta_at IS NOT NULL";
      }

      if (eta === "na") {
        filterSql += " AND bt.eta_at IS NULL";
      }

      if (updatedOn) {
        params.push(updatedOn);
        filterSql += ` AND bt.updated_at::date = $${params.length}::date`;
      }

      if (createdOn) {
        params.push(createdOn);
        filterSql += ` AND bt.created_at::date = $${params.length}::date`;
      }

      const sortColumn = sortableColumns[sortBy] || sortableColumns.updatedAt;
      const normalizedSortOrder = sortOrder === "asc" ? "ASC" : "DESC";

      params.push(pageSize, offset);

      const items = await query(
        `
          SELECT
            bt.id::text,
            bt.ticket_number AS "ticketNumber",
            bt.title,
            bt.severity,
            bt.category,
            bt.status,
            bt.eta_at AS "etaAt",
            bt.created_at AS "createdAt",
            bt.updated_at AS "updatedAt"
          FROM client_projects p
          INNER JOIN bug_tickets bt ON bt.client_project_id = p.id AND bt.is_archived = FALSE
          WHERE p.slug = $1
            ${filterSql}
          ORDER BY ${sortColumn} ${normalizedSortOrder} NULLS LAST, bt.updated_at DESC, bt.created_at DESC
          LIMIT $${params.length - 1}
          OFFSET $${params.length}
        `,
        params
      );

      const countRows = await query(
        `
          SELECT COUNT(bt.id)::int AS total
          FROM client_projects p
          INNER JOIN bug_tickets bt ON bt.client_project_id = p.id AND bt.is_archived = FALSE
          WHERE p.slug = $1
            ${filterSql}
        `,
        params.slice(0, -2)
      );

      return {
        items,
        total: countRows[0]?.total || 0
      };
    }

    const offset = (page - 1) * pageSize;
    const params = [userId, projectSlug];
    let filterSql = "";

    if (ticketId) {
      params.push(`%${ticketId.toLowerCase()}%`);
      filterSql += ` AND (LOWER(CONCAT('bug-', COALESCE(bt.ticket_number::text, ''))) LIKE $${params.length} OR LOWER(bt.id::text) LIKE $${params.length})`;
    }

    if (title) {
      params.push(`%${title.toLowerCase()}%`);
      filterSql += ` AND LOWER(bt.title) LIKE $${params.length}`;
    }

    if (severities.length) {
      params.push(severities);
      filterSql += ` AND bt.severity = ANY($${params.length}::text[])`;
    }

    if (statuses.length) {
      params.push(statuses);
      filterSql += ` AND bt.status = ANY($${params.length}::text[])`;
    }

    if (eta === "available") {
      filterSql += " AND bt.eta_at IS NOT NULL";
    }

    if (eta === "na") {
      filterSql += " AND bt.eta_at IS NULL";
    }

    if (updatedOn) {
      params.push(updatedOn);
      filterSql += ` AND bt.updated_at::date = $${params.length}::date`;
    }

    if (createdOn) {
      params.push(createdOn);
      filterSql += ` AND bt.created_at::date = $${params.length}::date`;
    }

    const sortColumn = sortableColumns[sortBy] || sortableColumns.updatedAt;
    const normalizedSortOrder = sortOrder === "asc" ? "ASC" : "DESC";

    params.push(pageSize, offset);

    const items = await query(
      `
        SELECT
          bt.id::text,
          bt.ticket_number AS "ticketNumber",
          bt.title,
          bt.severity,
          bt.category,
          bt.status,
          bt.eta_at AS "etaAt",
          bt.created_at AS "createdAt",
          bt.updated_at AS "updatedAt"
        FROM client_project_memberships m
        INNER JOIN client_projects p ON p.id = m.client_project_id
        INNER JOIN bug_tickets bt ON bt.client_project_id = p.id AND bt.is_archived = FALSE
        WHERE m.client_user_id = $1::uuid
          AND m.is_active = TRUE
          AND p.status = 'active'
          AND p.slug = $2
          ${filterSql}
        ORDER BY ${sortColumn} ${normalizedSortOrder} NULLS LAST, bt.updated_at DESC, bt.created_at DESC
        LIMIT $${params.length - 1}
        OFFSET $${params.length}
      `,
      params
    );

    const countRows = await query(
      `
        SELECT COUNT(bt.id)::int AS total
        FROM client_project_memberships m
        INNER JOIN client_projects p ON p.id = m.client_project_id
        INNER JOIN bug_tickets bt ON bt.client_project_id = p.id AND bt.is_archived = FALSE
        WHERE m.client_user_id = $1::uuid
          AND m.is_active = TRUE
          AND p.status = 'active'
          AND p.slug = $2
          ${filterSql}
      `,
      params.slice(0, -2)
    );

    return {
      items,
      total: countRows[0]?.total || 0
    };
  },

  async findTicketByUserAndSlug(userId, projectSlug, ticketId, { adminPreview = false } = {}) {
    if (adminPreview) {
      const rows = await query(
        `
          SELECT
            bt.id::text,
            bt.ticket_number AS "ticketNumber",
            bt.title,
            bt.description,
            bt.page_url AS "pageUrl",
            bt.severity,
            bt.category,
            bt.status,
            bt.eta_at AS "etaAt",
            bt.created_at AS "createdAt",
            bt.updated_at AS "updatedAt"
          FROM client_projects p
          INNER JOIN bug_tickets bt ON bt.client_project_id = p.id
          WHERE p.slug = $1
            AND bt.id = $2::uuid
            AND bt.is_archived = FALSE
          LIMIT 1
        `,
        [projectSlug, ticketId]
      );

      const ticket = rows[0] || null;
      if (!ticket) return null;

      const attachments = await query(
        `
          SELECT
            id::text,
            file_name AS "fileName",
            storage_path AS "relativeUrl",
            mime_type AS "mimeType",
            file_size_bytes AS size,
            created_at AS "createdAt"
          FROM bug_ticket_attachments
          WHERE bug_ticket_id = $1::uuid
            AND is_public = TRUE
          ORDER BY created_at ASC
        `,
        [ticketId]
      );

      return {
        ...ticket,
        attachments
      };
    }

    const rows = await query(
      `
        SELECT
          bt.id::text,
          bt.ticket_number AS "ticketNumber",
          bt.title,
          bt.description,
          bt.page_url AS "pageUrl",
          bt.severity,
          bt.category,
          bt.status,
          bt.eta_at AS "etaAt",
          bt.created_at AS "createdAt",
          bt.updated_at AS "updatedAt"
        FROM client_project_memberships m
        INNER JOIN client_projects p ON p.id = m.client_project_id
        INNER JOIN bug_tickets bt ON bt.client_project_id = p.id
        WHERE m.client_user_id = $1::uuid
          AND m.is_active = TRUE
          AND p.status = 'active'
          AND p.slug = $2
          AND bt.id = $3::uuid
          AND bt.is_archived = FALSE
        LIMIT 1
      `,
      [userId, projectSlug, ticketId]
    );

    const ticket = rows[0] || null;
    if (!ticket) return null;

    const attachments = await query(
      `
        SELECT
          id::text,
          file_name AS "fileName",
          storage_path AS "relativeUrl",
          mime_type AS "mimeType",
          file_size_bytes AS size,
          created_at AS "createdAt"
        FROM bug_ticket_attachments
        WHERE bug_ticket_id = $1::uuid
          AND is_public = TRUE
        ORDER BY created_at ASC
      `,
      [ticketId]
    );

    return {
      ...ticket,
      attachments
    };
  },

  async createTicketForProject(projectId, userId, payload) {
    const rows = await query(
      `
        INSERT INTO bug_tickets (
          client_project_id,
          title,
          description,
          page_url,
          severity,
          category,
          status,
          created_by_client_user_id
        )
        VALUES ($1::uuid, $2, $3, $4, $5, $6, 'new', $7::uuid)
        RETURNING
          id::text,
          ticket_number AS "ticketNumber",
          title,
          severity,
          category,
          status,
          eta_at AS "etaAt",
          created_at AS "createdAt",
          updated_at AS "updatedAt"
      `,
      [projectId, payload.title, payload.description, payload.pageUrl || null, payload.severity, payload.category, userId]
    );

    return rows[0] || null;
  },

  async updateTicketByUserAndSlug(userId, projectSlug, ticketId, payload) {
    const rows = await query(
      `
        UPDATE bug_tickets bt
        SET
          title = $4,
          description = $5,
          page_url = $6,
          severity = $7,
          category = $8,
          status = $9,
          updated_at = NOW()
        FROM client_project_memberships m
        INNER JOIN client_projects p ON p.id = m.client_project_id
        WHERE m.client_user_id = $1::uuid
          AND m.is_active = TRUE
          AND p.status = 'active'
          AND p.slug = $2
          AND bt.client_project_id = p.id
          AND bt.id = $3::uuid
          AND bt.is_archived = FALSE
        RETURNING
          bt.id::text,
          bt.ticket_number AS "ticketNumber",
          bt.title,
          bt.description,
          bt.page_url AS "pageUrl",
          bt.severity,
          bt.category,
          bt.status,
          bt.eta_at AS "etaAt",
          bt.created_at AS "createdAt",
          bt.updated_at AS "updatedAt"
      `,
      [userId, projectSlug, ticketId, payload.title, payload.description, payload.pageUrl || null, payload.severity, payload.category, payload.status]
    );

    return rows[0] || null;
  },

  async replaceTicketAttachments(ticketId, attachments = []) {
    await query(
      `
        DELETE FROM bug_ticket_attachments
        WHERE bug_ticket_id = $1::uuid
      `,
      [ticketId]
    );

    for (const attachment of attachments) {
      await query(
        `
          INSERT INTO bug_ticket_attachments (
            bug_ticket_id,
            file_name,
            storage_path,
            mime_type,
            file_size_bytes,
            is_public,
            attachment_kind
          )
          VALUES ($1::uuid, $2, $3, $4, $5, TRUE, 'attachment')
        `,
        [ticketId, attachment.fileName, attachment.relativeUrl, attachment.mimeType, attachment.size]
      );
    }
  },

  async archiveTicketByUserAndSlug(userId, projectSlug, ticketId) {
    const rows = await query(
      `
        UPDATE bug_tickets bt
        SET
          is_archived = TRUE,
          updated_at = NOW()
        FROM client_project_memberships m
        INNER JOIN client_projects p ON p.id = m.client_project_id
        WHERE m.client_user_id = $1::uuid
          AND m.is_active = TRUE
          AND p.status = 'active'
          AND p.slug = $2
          AND bt.client_project_id = p.id
          AND bt.id = $3::uuid
          AND bt.is_archived = FALSE
        RETURNING bt.id::text
      `,
      [userId, projectSlug, ticketId]
    );

    return rows[0] || null;
  },

  async insertTicketAttachments(ticketId, attachments = []) {
    for (const attachment of attachments) {
      await query(
        `
          INSERT INTO bug_ticket_attachments (
            bug_ticket_id,
            file_name,
            storage_path,
            mime_type,
            file_size_bytes,
            is_public,
            attachment_kind
          )
          VALUES ($1::uuid, $2, $3, $4, $5, TRUE, 'attachment')
        `,
        [ticketId, attachment.fileName, attachment.relativeUrl, attachment.mimeType, attachment.size]
      );
    }
  },

  async insertStatusHistory(ticketId, previousStatus, nextStatus, note) {
    await query(
      `
        INSERT INTO bug_ticket_status_history (bug_ticket_id, previous_status, next_status, note)
        VALUES ($1::uuid, $2, $3, $4)
      `,
      [ticketId, previousStatus, nextStatus, note]
    );
  }
};
