import { query } from "../../config/db.js";

export const leadsRepository = {
  async create(payload) {
    const rows = await query(
      `
        INSERT INTO leads (name, email, mobile_number, company, project_type, budget, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id, name, email, mobile_number, company, project_type, budget, description, created_at
      `,
      [
        payload.name,
        payload.email,
        payload.mobile_number || null,
        payload.company || null,
        payload.project_type,
        payload.budget || null,
        payload.description || null
      ]
    );

    return rows[0];
  },
  async findAllPaged({ page = 1, pageSize = 10, search = "" }) {
    const offset = (page - 1) * pageSize;
    const whereSql = search
      ? `
        WHERE (
          name ILIKE $1 OR
          email ILIKE $1 OR
          COALESCE(mobile_number, '') ILIKE $1 OR
          COALESCE(company, '') ILIKE $1 OR
          project_type ILIKE $1 OR
          COALESCE(budget, '') ILIKE $1 OR
          COALESCE(description, '') ILIKE $1
        )
      `
      : "";

    const params = [];
    if (search) params.push(`%${search}%`);
    params.push(pageSize, offset);

    const items = await query(
      `
        SELECT
          id::text,
          name,
          email,
          mobile_number AS "mobileNumber",
          company,
          project_type AS "projectType",
          budget,
          description,
          created_at AS "createdAt"
        FROM leads
        ${whereSql}
        ORDER BY created_at DESC
        LIMIT $${search ? 2 : 1}
        OFFSET $${search ? 3 : 2}
      `,
      params
    );

    const countRows = await query(
      `
        SELECT COUNT(*)::int AS total
        FROM leads
        ${whereSql}
      `,
      search ? [`%${search}%`] : []
    );

    return { items, total: countRows[0]?.total || 0 };
  }
};
