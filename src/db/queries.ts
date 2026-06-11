import { query } from "./index";
import type { SiteConfig, ResultBar, NewsItem } from "./types";
import { defaultSiteConfig, defaultResultBars, defaultNews } from "./defaults";

/* ---------------- row shapes (type aliases so they satisfy pg's QueryResultRow index signature) ---------------- */
type SiteConfigRow = {
  next_session_label: string;
  next_session_edition: string;
  next_session_day: string;
  next_session_month: string;
  next_session_year: string;
  next_session_blurb: string;
  schedule_image: string;
  schedule_edition_label: string;
  schedule_footnote: string;
  contact_phones: string[];
  address_line_1: string;
  address_line_2: string;
  facebook_url: string;
  facebook_name: string;
  email: string;
  results_eyebrow: string;
  results_title: string;
  results_lead: string;
  results_footnote: string;
  results_summary_badges: string[];
}

type NewsRow = {
  id: number;
  category: string;
  title: string;
  body: string;
  contacts: string;
  source_label: string;
  source_url: string;
  date: Date | null;
  published: boolean;
  sort: number;
}

function mapSiteConfig(r: SiteConfigRow): SiteConfig {
  return {
    next_session: {
      label: r.next_session_label,
      edition: r.next_session_edition,
      day: r.next_session_day,
      month: r.next_session_month,
      year: r.next_session_year,
      blurb: r.next_session_blurb,
    },
    schedule: {
      image: r.schedule_image,
      edition_label: r.schedule_edition_label,
      footnote: r.schedule_footnote,
    },
    contact: {
      phones: r.contact_phones ?? [],
      address_line_1: r.address_line_1,
      address_line_2: r.address_line_2,
      facebook_url: r.facebook_url,
      facebook_name: r.facebook_name,
      email: r.email,
    },
    results: {
      eyebrow: r.results_eyebrow,
      title: r.results_title,
      lead: r.results_lead,
      footnote: r.results_footnote,
      summary_badges: r.results_summary_badges ?? [],
    },
  };
}

function mapNews(r: NewsRow): NewsItem {
  return {
    id: r.id,
    category: r.category,
    title: r.title,
    body: r.body,
    contacts: r.contacts,
    source_label: r.source_label,
    source_url: r.source_url,
    date: r.date ? r.date.toISOString() : null,
    published: r.published,
    sort: r.sort,
  };
}

/* ---------------- public reads (fall back to defaults) ---------------- */
export async function getSiteConfig(): Promise<SiteConfig> {
  try {
    const rows = await query<SiteConfigRow>("SELECT * FROM site_config WHERE id = 1");
    return rows.length ? mapSiteConfig(rows[0]) : defaultSiteConfig;
  } catch (err) {
    console.error("[db] getSiteConfig failed — using defaults:", err);
    return defaultSiteConfig;
  }
}

export async function getResultBars(): Promise<ResultBar[]> {
  try {
    const rows = await query<{ id: number; name: string; value: string; sort: number }>(
      "SELECT id, name, value, sort FROM result_bars ORDER BY sort ASC, id ASC"
    );
    return rows.length
      ? rows.map((r) => ({ id: r.id, name: r.name, value: parseFloat(r.value), sort: r.sort }))
      : defaultResultBars;
  } catch (err) {
    console.error("[db] getResultBars failed — using defaults:", err);
    return defaultResultBars;
  }
}

export async function getPublishedNews(): Promise<NewsItem[]> {
  try {
    const rows = await query<NewsRow>(
      "SELECT * FROM news WHERE published = true ORDER BY date DESC NULLS LAST, sort ASC, id DESC"
    );
    return rows.map(mapNews);
  } catch (err) {
    console.error("[db] getPublishedNews failed — using defaults:", err);
    return defaultNews;
  }
}

/* ---------------- admin reads (let errors surface) ---------------- */
export async function getAllNews(): Promise<NewsItem[]> {
  const rows = await query<NewsRow>(
    "SELECT * FROM news ORDER BY date DESC NULLS LAST, sort ASC, id DESC"
  );
  return rows.map(mapNews);
}

export async function getNewsById(id: number): Promise<NewsItem | null> {
  const rows = await query<NewsRow>("SELECT * FROM news WHERE id = $1", [id]);
  return rows.length ? mapNews(rows[0]) : null;
}

export async function getAllResultBars(): Promise<ResultBar[]> {
  const rows = await query<{ id: number; name: string; value: string; sort: number }>(
    "SELECT id, name, value, sort FROM result_bars ORDER BY sort ASC, id ASC"
  );
  return rows.map((r) => ({ id: r.id, name: r.name, value: parseFloat(r.value), sort: r.sort }));
}

/* ---------------- mutations ---------------- */
export interface NewsInput {
  category: string;
  title: string;
  body: string;
  contacts: string;
  source_label: string;
  source_url: string;
  date: string | null;
  published: boolean;
  sort: number;
}

export async function createNews(input: NewsInput): Promise<number> {
  const rows = await query<{ id: number }>(
    `INSERT INTO news (category, title, body, contacts, source_label, source_url, date, published, sort)
     VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9) RETURNING id`,
    [
      input.category, input.title, input.body, input.contacts,
      input.source_label, input.source_url, input.date, input.published, input.sort,
    ]
  );
  return rows[0].id;
}

export async function updateNews(id: number, input: NewsInput): Promise<void> {
  await query(
    `UPDATE news SET category=$1, title=$2, body=$3, contacts=$4, source_label=$5,
       source_url=$6, date=$7, published=$8, sort=$9, updated_at=now()
     WHERE id=$10`,
    [
      input.category, input.title, input.body, input.contacts, input.source_label,
      input.source_url, input.date, input.published, input.sort, id,
    ]
  );
}

export async function deleteNews(id: number): Promise<void> {
  await query("DELETE FROM news WHERE id = $1", [id]);
}

export interface ResultBarInput {
  name: string;
  value: number;
  sort: number;
}

export async function createResultBar(input: ResultBarInput): Promise<number> {
  const rows = await query<{ id: number }>(
    "INSERT INTO result_bars (name, value, sort) VALUES ($1,$2,$3) RETURNING id",
    [input.name, input.value, input.sort]
  );
  return rows[0].id;
}

export async function updateResultBar(id: number, input: ResultBarInput): Promise<void> {
  await query("UPDATE result_bars SET name=$1, value=$2, sort=$3 WHERE id=$4", [
    input.name, input.value, input.sort, id,
  ]);
}

export async function deleteResultBar(id: number): Promise<void> {
  await query("DELETE FROM result_bars WHERE id = $1", [id]);
}

export async function updateSiteConfig(cfg: SiteConfig): Promise<void> {
  await query(
    `INSERT INTO site_config (
        id, next_session_label, next_session_edition, next_session_day, next_session_month,
        next_session_year, next_session_blurb, schedule_image, schedule_edition_label,
        schedule_footnote, contact_phones, address_line_1, address_line_2, facebook_url,
        facebook_name, email, results_eyebrow, results_title, results_lead, results_footnote,
        results_summary_badges, updated_at
     ) VALUES (
        1, $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20, now()
     )
     ON CONFLICT (id) DO UPDATE SET
        next_session_label=$1, next_session_edition=$2, next_session_day=$3, next_session_month=$4,
        next_session_year=$5, next_session_blurb=$6, schedule_image=$7, schedule_edition_label=$8,
        schedule_footnote=$9, contact_phones=$10, address_line_1=$11, address_line_2=$12,
        facebook_url=$13, facebook_name=$14, email=$15, results_eyebrow=$16, results_title=$17,
        results_lead=$18, results_footnote=$19, results_summary_badges=$20, updated_at=now()`,
    [
      cfg.next_session.label, cfg.next_session.edition, cfg.next_session.day, cfg.next_session.month,
      cfg.next_session.year, cfg.next_session.blurb, cfg.schedule.image, cfg.schedule.edition_label,
      cfg.schedule.footnote, cfg.contact.phones, cfg.contact.address_line_1, cfg.contact.address_line_2,
      cfg.contact.facebook_url, cfg.contact.facebook_name, cfg.contact.email, cfg.results.eyebrow,
      cfg.results.title, cfg.results.lead, cfg.results.footnote, cfg.results.summary_badges,
    ]
  );
}
