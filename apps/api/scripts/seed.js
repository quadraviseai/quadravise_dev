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

  const seedsDir = path.resolve(process.cwd(), "db/seeds");
  const files = (await fs.readdir(seedsDir))
    .filter((file) => file.endsWith(".sql"))
    .sort((a, b) => a.localeCompare(b));
  const pool = new Pool({ connectionString: databaseUrl });

  try {
    for (const file of files) {
      const sql = await fs.readFile(path.join(seedsDir, file), "utf-8");
      await pool.query(sql);
      console.log(`Seed completed: ${file}`);
    }
  } finally {
    await pool.end();
  }
}

run().catch((error) => {
  console.error(error.message);
  process.exit(1);
});
