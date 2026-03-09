import fs from "fs/promises";
import path from "path";

import pg from "pg";
import dotenv from "dotenv";

dotenv.config({ path: path.resolve(process.cwd(), ".env") });

const { Pool } = pg;

async function run() {
  const databaseUrl = process.env.DATABASE_URL;

  if (!databaseUrl) {
    throw new Error("DATABASE_URL is required in apps/api/.env");
  }

  const migrationsDir = path.resolve(process.cwd(), "db/migrations");
  const files = (await fs.readdir(migrationsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));
  const pool = new Pool({ connectionString: databaseUrl });

  try {
    for (const file of files) {
      const sql = await fs.readFile(path.join(migrationsDir, file), "utf-8");
      await pool.query(sql);
      console.log(`Migration completed: ${file}`);
    }
  } finally {
    await pool.end();
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
