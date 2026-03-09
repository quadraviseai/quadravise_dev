import { query } from "../../config/db.js";

export const usersRepository = {
  async findAllPaged({ page = 1, pageSize = 10, search = "" }) {
    const offset = (page - 1) * pageSize;
    const whereSql = search
      ? `
        WHERE (
          full_name ILIKE $1 OR
          email ILIKE $1 OR
          role ILIKE $1 OR
          array_to_string(products, ', ') ILIKE $1
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
          full_name AS "fullName",
          email,
          role,
          products,
          is_active AS "isActive"
        FROM admin_managed_users
        ${whereSql}
        ORDER BY updated_at DESC
        LIMIT $${search ? 2 : 1}
        OFFSET $${search ? 3 : 2}
      `,
      params
    );

    const countRows = await query(
      `
        SELECT COUNT(*)::int AS total
        FROM admin_managed_users
        ${whereSql}
      `,
      search ? [`%${search}%`] : []
    );

    return { items, total: countRows[0]?.total || 0 };
  },

  async findById(id) {
    const rows = await query(
      `
        SELECT
          id::text,
          full_name AS "fullName",
          email,
          role,
          products,
          is_active AS "isActive"
        FROM admin_managed_users
        WHERE id = $1::uuid
        LIMIT 1
      `,
      [id]
    );
    return rows[0] || null;
  },

  async create(payload) {
    const rows = await query(
      `
        INSERT INTO admin_managed_users (full_name, email, role, products, is_active)
        VALUES ($1, $2, $3, $4, $5)
        RETURNING id::text
      `,
      [payload.fullName, payload.email.toLowerCase(), payload.role, payload.products, payload.isActive]
    );
    return rows[0] || null;
  },

  async updateById(id, payload) {
    const rows = await query(
      `
        UPDATE admin_managed_users
        SET
          full_name = $1,
          email = $2,
          role = $3,
          products = $4,
          is_active = $5,
          updated_at = NOW()
        WHERE id = $6::uuid
        RETURNING id::text
      `,
      [payload.fullName, payload.email.toLowerCase(), payload.role, payload.products, payload.isActive, id]
    );
    return rows[0] || null;
  },

  async deleteById(id) {
    const rows = await query(
      `
        DELETE FROM admin_managed_users
        WHERE id = $1::uuid
        RETURNING id::text
      `,
      [id]
    );
    return rows[0] || null;
  }
};
