import { Pool, type QueryResultRow } from "pg";

// Reuse a single pool across hot-reloads in dev and across the module graph in prod.
declare global {
  // eslint-disable-next-line no-var
  var __tremplinPgPool: Pool | undefined;
}

export const pool: Pool =
  global.__tremplinPgPool ??
  new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 5, // keep low, the target VPS only has 2 GB RAM
    idleTimeoutMillis: 30_000,
    connectionTimeoutMillis: 5_000,
  });

if (process.env.NODE_ENV !== "production") {
  global.__tremplinPgPool = pool;
}

export async function query<T extends QueryResultRow = QueryResultRow>(
  text: string,
  params: unknown[] = []
): Promise<T[]> {
  const result = await pool.query<T>(text, params as unknown[]);
  return result.rows;
}
