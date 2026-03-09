import { query } from "../../config/db.js";

export const portfolioRepository = {
  async findAll() {
    return query(
      `
        SELECT
          id::text,
          title,
          slug,
          description,
          timeline,
          featured_image AS "featuredImage",
          featured_image AS "coverImage",
          tech_stack AS "techStack",
          outcome
        FROM portfolio_projects
        WHERE is_published = true
        ORDER BY updated_at DESC
      `
    );
  },
  async findBySlug(slug) {
    const rows = await query(
      `
        SELECT
          id::text,
          title,
          slug,
          description,
          timeline,
          featured_image AS "featuredImage",
          featured_image AS "coverImage",
          tech_stack AS "techStack",
          outcome
        FROM portfolio_projects
        WHERE slug = $1 AND is_published = true
        LIMIT 1
      `,
      [slug]
    );

    return rows[0] || null;
  },
  async findByIdAdmin(id) {
    const rows = await query(
      `
        SELECT
          id::text,
          title,
          slug,
          category,
          description,
          timeline,
          featured_image AS "featuredImage",
          featured_image AS "coverImage",
          tech_stack AS "techStack",
          outcome,
          is_published AS "isPublished"
        FROM portfolio_projects
        WHERE id = $1::uuid
        LIMIT 1
      `,
      [id]
    );

    return rows[0] || null;
  },
  async findAllAdmin() {
    return query(
      `
        SELECT
          id::text,
          title,
          slug,
          category,
          description,
          timeline,
          featured_image AS "featuredImage",
          featured_image AS "coverImage",
          tech_stack AS "techStack",
          outcome,
          is_published AS "isPublished"
        FROM portfolio_projects
        ORDER BY updated_at DESC
      `
    );
  },
  async findAllAdminPaged({ page = 1, pageSize = 10, search = "" }) {
    const offset = (page - 1) * pageSize;
    const whereSql = search
      ? `
        WHERE (
          title ILIKE $1 OR
          COALESCE(category, 'General') ILIKE $1 OR
          description ILIKE $1 OR
          COALESCE(timeline, '') ILIKE $1 OR
          outcome ILIKE $1 OR
          array_to_string(tech_stack, ', ') ILIKE $1
        )
      `
      : "";

    const params = [];
    if (search) {
      params.push(`%${search}%`);
    }
    params.push(pageSize, offset);

    const dataRows = await query(
      `
        SELECT
          id::text,
          title,
          slug,
          category,
          description,
          timeline,
          featured_image AS "featuredImage",
          featured_image AS "coverImage",
          tech_stack AS "techStack",
          outcome,
          is_published AS "isPublished"
        FROM portfolio_projects
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
        FROM portfolio_projects
        ${whereSql}
      `,
      search ? [`%${search}%`] : []
    );

    return { items: dataRows, total: countRows[0]?.total || 0 };
  },
  async create(payload) {
    const rows = await query(
      `
        INSERT INTO portfolio_projects (
          title,
          slug,
          category,
          description,
          timeline,
          tech_stack,
          outcome,
          featured_image,
          is_published
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING id::text
      `,
      [
        payload.title,
        payload.slug,
        payload.category,
        payload.description,
        payload.timeline || null,
        payload.techStack,
        payload.outcome || null,
        payload.featuredImage || null,
        payload.isPublished
      ]
    );

    return rows[0] || null;
  },
  async updateById(id, payload) {
    const rows = await query(
      `
        UPDATE portfolio_projects
        SET
          title = $1,
          slug = $2,
          category = $3,
          description = $4,
          timeline = $5,
          tech_stack = $6,
          outcome = $7,
          featured_image = $8,
          is_published = $9,
          updated_at = NOW()
        WHERE id = $10::uuid
        RETURNING id::text
      `,
      [
        payload.title,
        payload.slug,
        payload.category,
        payload.description,
        payload.timeline || null,
        payload.techStack,
        payload.outcome || null,
        payload.featuredImage || null,
        payload.isPublished,
        id
      ]
    );

    return rows[0] || null;
  },
  async deleteById(id) {
    const rows = await query(
      `
        DELETE FROM portfolio_projects
        WHERE id = $1::uuid
        RETURNING id::text
      `,
      [id]
    );

    return rows[0] || null;
  }
};
