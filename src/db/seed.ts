/* Seeds initial dynamic content. Idempotent and NON-destructive:
   it will not overwrite rows already edited via the admin.
   Run: npm run db:seed */
import { Pool } from "pg";
import { defaultSiteConfig, defaultResultBars } from "./defaults";

try {
  (process as { loadEnvFile?: (path?: string) => void }).loadEnvFile?.();
} catch {
  /* env provided by the environment */
}

async function main() {
  if (!process.env.DATABASE_URL) throw new Error("DATABASE_URL is not set");
  const pool = new Pool({ connectionString: process.env.DATABASE_URL });
  const c = defaultSiteConfig;

  // site_config singleton, insert defaults only if it does not exist yet.
  await pool.query(
    `INSERT INTO site_config (
        id, next_session_label, next_session_edition, next_session_day, next_session_month,
        next_session_year, next_session_blurb, schedule_image, schedule_edition_label,
        schedule_footnote, contact_phones, address_line_1, address_line_2, facebook_url,
        facebook_name, email, results_eyebrow, results_title, results_lead, results_footnote,
        results_summary_badges
     ) VALUES (
        1, $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20
     )
     ON CONFLICT (id) DO NOTHING`,
    [
      c.next_session.label, c.next_session.edition, c.next_session.day, c.next_session.month,
      c.next_session.year, c.next_session.blurb, c.schedule.image, c.schedule.edition_label,
      c.schedule.footnote, c.contact.phones, c.contact.address_line_1, c.contact.address_line_2,
      c.contact.facebook_url, c.contact.facebook_name, c.contact.email, c.results.eyebrow,
      c.results.title, c.results.lead, c.results.footnote, c.results.summary_badges,
    ]
  );

  // result_bars, seed defaults only when the table is empty.
  const { rows } = await pool.query<{ count: string }>("SELECT count(*) AS count FROM result_bars");
  if (Number(rows[0].count) === 0) {
    for (const b of defaultResultBars) {
      await pool.query("INSERT INTO result_bars (name, value, sort) VALUES ($1,$2,$3)", [
        b.name, b.value, b.sort,
      ]);
    }
    console.log(`[seed] inserted ${defaultResultBars.length} result bars.`);
  } else {
    console.log("[seed] result_bars already populated, skipped.");
  }

  // news intentionally left empty (none in the source content).
  console.log("[seed] done.");
  await pool.end();
}

main().catch((err) => {
  console.error("[seed] failed:", err);
  process.exit(1);
});
