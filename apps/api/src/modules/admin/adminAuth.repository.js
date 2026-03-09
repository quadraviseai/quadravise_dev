import { query } from "../../config/db.js";

export const adminAuthRepository = {
  async findUserByEmail(email) {
    const rows = await query(
      `
        SELECT id::text, email, password_hash AS "passwordHash", is_active AS "isActive"
        FROM admin_users
        WHERE email = $1
        LIMIT 1
      `,
      [email]
    );
    return rows[0] || null;
  },

  async verifyPassword(email, password) {
    const rows = await query(
      `
        SELECT id::text, email
        FROM admin_users
        WHERE email = $1
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
        SELECT id::text, email, is_active AS "isActive"
        FROM admin_users
        WHERE id = $1::uuid
        LIMIT 1
      `,
      [userId]
    );
    return rows[0] || null;
  },

  async verifyPasswordByUserId(userId, password) {
    const rows = await query(
      `
        SELECT id::text
        FROM admin_users
        WHERE id = $1::uuid
          AND is_active = TRUE
          AND password_hash = crypt($2, password_hash)
        LIMIT 1
      `,
      [userId, password]
    );
    return rows[0] || null;
  },

  async createPasswordResetToken({ userId, tokenHash, expiresAt }) {
    await query(
      `
        INSERT INTO admin_password_resets (admin_user_id, token_hash, expires_at)
        VALUES ($1::uuid, $2, $3::timestamptz)
      `,
      [userId, tokenHash, expiresAt]
    );
  },

  async consumePasswordResetToken(tokenHash) {
    const rows = await query(
      `
        UPDATE admin_password_resets
        SET used_at = NOW()
        WHERE token_hash = $1
          AND used_at IS NULL
          AND expires_at > NOW()
        RETURNING admin_user_id::text AS "userId"
      `,
      [tokenHash]
    );
    return rows[0] || null;
  },

  async updatePassword(userId, newPassword) {
    await query(
      `
        UPDATE admin_users
        SET
          password_hash = crypt($1, gen_salt('bf')),
          updated_at = NOW()
        WHERE id = $2::uuid
      `,
      [newPassword, userId]
    );
  }
};
