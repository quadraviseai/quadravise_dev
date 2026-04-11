import { query } from "../../config/db.js";

export const clientAuthRepository = {
  async verifyPassword(email, password) {
    const rows = await query(
      `
        SELECT id::text, email, full_name AS "fullName"
        FROM client_users
        WHERE LOWER(email) = LOWER($1)
          AND is_active = TRUE
          AND password_hash = crypt($2, password_hash)
        LIMIT 1
      `,
      [email, password]
    );
    return rows[0] || null;
  },

  async findUserById(userId) {
    const rows = await query(
      `
        SELECT id::text, email, full_name AS "fullName", is_active AS "isActive"
        FROM client_users
        WHERE id = $1::uuid
        LIMIT 1
      `,
      [userId]
    );
    return rows[0] || null;
  },

  async findActiveProjectsForUser(userId) {
    return query(
      `
        SELECT
          p.id::text,
          p.name,
          p.slug,
          p.status
        FROM client_project_memberships m
        INNER JOIN client_projects p ON p.id = m.client_project_id
        WHERE m.client_user_id = $1::uuid
          AND m.is_active = TRUE
          AND p.status = 'active'
        ORDER BY p.name ASC
      `,
      [userId]
    );
  },

  async findAccessibleProjectForUser(userId, projectSlug) {
    const rows = await query(
      `
        SELECT
          p.id::text,
          p.name,
          p.slug,
          p.status
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
  }
};

