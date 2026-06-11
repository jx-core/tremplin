/* Applies src/db/schema.sql to the database. Idempotent (CREATE TABLE IF NOT EXISTS).
   Run: npm run db:migrate  (locally) — or in the Docker builder stage on deploy. */
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { Pool } from "pg";

try {
  // Node >= 20.12 / 22 — load .env from cwd if present (optional; env may come from Docker Compose).
  (process as { loadEnvFile?: (path?: string) => void }).loadEnvFile?.();
} catch {
  /* no .env file — env vars are provided by the environment */
}

function redact(url?: string): string {
  return url ? url.replace(/:\/\/[^@/]*@/, "://***@") : "(DATABASE_URL not set)";
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const sql = readFileSync(join(process.cwd(), "src/db/schema.sql"), "utf8");
  console.log("[migrate] applying schema to", redact(process.env.DATABASE_URL));
  await pool.query(sql);
  console.log("[migrate] schema applied.");
  await pool.end();
}

main().catch((err) => {
  console.error("[migrate] failed:", err);
  process.exit(1);
});
