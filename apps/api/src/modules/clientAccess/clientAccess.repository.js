import { query } from "../../config/db.js";

export const clientAccessRepository = {
  async getOverview() {
    const projects = await query(
      `
        SELECT
          p.id::text,
          p.name,
          p.slug,
          p.description,
          p.status,
          p.updated_at AS "updatedAt",
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', cu.id::text,
                'fullName', cu.full_name,
                'email', cu.email,
                'isActive', cu.is_active
              )
            ) FILTER (WHERE cu.id IS NOT NULL),
            '[]'::json
          ) AS "assignedUsers"
        FROM client_projects p
        LEFT JOIN client_project_memberships m
          ON m.client_project_id = p.id
          AND m.is_active = TRUE
        LEFT JOIN client_users cu
          ON cu.id = m.client_user_id
        GROUP BY p.id
        ORDER BY p.updated_at DESC, p.created_at DESC
      `
    );

    const users = await query(
      `
        SELECT
          cu.id::text,
          cu.full_name AS "fullName",
          cu.email,
          cu.is_active AS "isActive",
          cu.updated_at AS "updatedAt",
          COALESCE(
            json_agg(
              DISTINCT jsonb_build_object(
                'id', p.id::text,
                'name', p.name,
                'slug', p.slug,
                'status', p.status
              )
            ) FILTER (WHERE p.id IS NOT NULL),
            '[]'::json
          ) AS "assignedProjects"
        FROM client_users cu
        LEFT JOIN client_project_memberships m
          ON m.client_user_id = cu.id
          AND m.is_active = TRUE
        LEFT JOIN client_projects p
          ON p.id = m.client_project_id
        GROUP BY cu.id
        ORDER BY cu.updated_at DESC, cu.created_at DESC
      `
    );

    return { projects, users };
  },

  async createProject(payload) {
    const rows = await query(
      `
        INSERT INTO client_projects (name, slug, description, status)
        VALUES ($1, $2, $3, $4)
        RETURNING id::text, name, slug, description, status, updated_at AS "updatedAt"
      `,
      [payload.name, payload.slug, payload.description || "", payload.status]
    );
    return rows[0] || null;
  },

  async updateProject(id, payload) {
    const rows = await query(
      `
        UPDATE client_projects
        SET
          name = $1,
          slug = $2,
          description = $3,
          status = $4,
          updated_at = NOW()
        WHERE id = $5::uuid
        RETURNING id::text, name, slug, description, status, updated_at AS "updatedAt"
      `,
      [payload.name, payload.slug, payload.description || "", payload.status, id]
    );
    return rows[0] || null;
  },

  async createUser(payload) {
    const rows = await query(
      `
        INSERT INTO client_users (full_name, email, password_hash, is_active)
        VALUES ($1, LOWER($2), crypt($3, gen_salt('bf')), $4)
        RETURNING id::text, full_name AS "fullName", email, is_active AS "isActive", updated_at AS "updatedAt"
      `,
      [payload.fullName, payload.email, payload.password, payload.isActive]
    );
    return rows[0] || null;
  },

  async updateUser(id, payload) {
    const rows = await query(
      `
        UPDATE client_users
        SET
          full_name = $1,
          email = LOWER($2),
          password_hash = CASE
            WHEN COALESCE($3, '') = '' THEN password_hash
            ELSE crypt($3, gen_salt('bf'))
          END,
          is_active = $4,
          updated_at = NOW()
        WHERE id = $5::uuid
        RETURNING id::text, full_name AS "fullName", email, is_active AS "isActive", updated_at AS "updatedAt"
      `,
      [payload.fullName, payload.email, payload.password || "", payload.isActive, id]
    );
    return rows[0] || null;
  },

  async replaceProjectMemberships(projectId, clientUserIds = []) {
    await query(
      `
        DELETE FROM client_project_memberships
        WHERE client_project_id = $1::uuid
      `,
      [projectId]
    );

    for (const clientUserId of clientUserIds) {
      await query(
        `
          INSERT INTO client_project_memberships (client_user_id, client_project_id, is_active)
          VALUES ($1::uuid, $2::uuid, TRUE)
          ON CONFLICT (client_user_id, client_project_id)
          DO UPDATE SET is_active = EXCLUDED.is_active
        `,
        [clientUserId, projectId]
      );
    }
  },

  async replaceUserMemberships(userId, projectIds = []) {
    await query(
      `
        DELETE FROM client_project_memberships
        WHERE client_user_id = $1::uuid
      `,
      [userId]
    );

    for (const projectId of projectIds) {
      await query(
        `
          INSERT INTO client_project_memberships (client_user_id, client_project_id, is_active)
          VALUES ($1::uuid, $2::uuid, TRUE)
          ON CONFLICT (client_user_id, client_project_id)
          DO UPDATE SET is_active = EXCLUDED.is_active
        `,
        [userId, projectId]
      );
    }
  }
};
