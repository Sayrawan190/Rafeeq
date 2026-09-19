import { Pool } from "pg";

const globalForDb = globalThis as unknown as { rafeeqPool?: Pool };

export const pool = globalForDb.rafeeqPool ?? new Pool({
  host: process.env.DATABASE_HOST,
  port: Number(process.env.DATABASE_PORT ?? 5432),
  database: process.env.DATABASE_NAME,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  ssl: process.env.DATABASE_SSL === "true" ? { rejectUnauthorized: false } : false,
  connectionTimeoutMillis: 3500,
  idleTimeoutMillis: 10000,
  max: 3,
});

if (process.env.NODE_ENV !== "production") globalForDb.rafeeqPool = pool;
