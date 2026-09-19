import { readFile } from "node:fs/promises";
import path from "node:path";
import { Pool } from "pg";

async function loadLocalEnv() {
  try {
    const file = await readFile(path.join(process.cwd(), ".env.local"), "utf8");
    for (const line of file.split(/\r?\n/)) {
      const match = line.match(/^([A-Z0-9_]+)=(.*)$/);
      if (match && !process.env[match[1]]) process.env[match[1]] = match[2].trim();
    }
  } catch (error) {
    if (error?.code !== "ENOENT") throw error;
  }
}

await loadLocalEnv();

const pool = new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT ?? 5432),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 8000,
});

try {
  const sql = await readFile(path.join(process.cwd(), "db", "init.sql"), "utf8");
  await pool.query(sql);
  console.log("Rafeeq database schema and demo seed data were applied successfully.");
} catch (error) {
  console.error(`Database initialization failed: ${error.message}`);
  process.exitCode = 1;
} finally {
  await pool.end();
}
