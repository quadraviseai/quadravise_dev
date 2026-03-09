import { query } from "../../config/db.js";

export const socialAccountsRepository = {
  async findAllActive() {
    return query(
      `
        SELECT
          id::text,
          platform,
          account_name AS "accountName",
          account_type AS "accountType",
          platform_account_id AS "platformAccountId",
          is_active AS "isActive"
        FROM social_accounts
        WHERE is_active = TRUE
        ORDER BY platform ASC, account_name ASC
      `
    );
  }
};
