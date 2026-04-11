import { query } from "../../config/db.js";

const selectSql = `
  SELECT
    roles,
    products,
    updated_at AS "updatedAt"
  FROM admin_configuration
  WHERE id = 1
  LIMIT 1
`;

export const configurationRepository = {
  async getConfiguration() {
    const rows = await query(selectSql);
    return rows[0] || null;
  },

  async updateConfiguration(payload) {
    const rows = await query(
      `
        UPDATE admin_configuration
        SET
          roles = $1::jsonb,
          products = $2::jsonb,
          updated_at = NOW()
        WHERE id = 1
        RETURNING
          roles,
          products,
          updated_at AS "updatedAt"
      `,
      [JSON.stringify(payload.roles), JSON.stringify(payload.products)]
    );
    return rows[0] || null;
  }
};
