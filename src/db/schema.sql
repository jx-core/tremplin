-- =============================================================
-- TREMPLIN, database schema (idempotent).
-- Holds ONLY the genuinely dynamic content edited via the admin:
--   site_config  : singleton (next session, schedule, contact, results copy)
--   result_bars  : per-vague success rates
--   news         : announcements / actualités
-- Stable content (hero, programs, method, etc.) lives in code (src/content).
-- =============================================================

CREATE TABLE IF NOT EXISTS site_config (
  id                      integer PRIMARY KEY DEFAULT 1 CHECK (id = 1),

  -- Next session (shown in the hero)
  next_session_label      text    NOT NULL DEFAULT 'Prochaine session',
  next_session_edition    text    NOT NULL DEFAULT '',
  next_session_day        text    NOT NULL DEFAULT '',
  next_session_month      text    NOT NULL DEFAULT '',
  next_session_year       text    NOT NULL DEFAULT '',
  next_session_blurb      text    NOT NULL DEFAULT '',

  -- Schedule (emploi du temps) image + meta
  schedule_image          text    NOT NULL DEFAULT '',
  schedule_edition_label  text    NOT NULL DEFAULT '',
  schedule_footnote       text    NOT NULL DEFAULT '',

  -- Contact
  contact_phones          text[]  NOT NULL DEFAULT '{}',
  address_line_1          text    NOT NULL DEFAULT '',
  address_line_2          text    NOT NULL DEFAULT '',
  facebook_url            text    NOT NULL DEFAULT '',
  facebook_name           text    NOT NULL DEFAULT 'Tremplin',
  email                   text    NOT NULL DEFAULT '',

  -- Results section copy
  results_eyebrow         text    NOT NULL DEFAULT '',
  results_title           text    NOT NULL DEFAULT '',
  results_lead            text    NOT NULL DEFAULT '',
  results_footnote        text    NOT NULL DEFAULT '',
  results_summary_badges  text[]  NOT NULL DEFAULT '{}',

  updated_at              timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS result_bars (
  id    serial PRIMARY KEY,
  name  text NOT NULL,
  value numeric(5,1) NOT NULL DEFAULT 0,
  sort  integer NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS news (
  id            serial PRIMARY KEY,
  category      text NOT NULL DEFAULT '',
  title         text NOT NULL,
  body          text NOT NULL DEFAULT '',
  contacts      text NOT NULL DEFAULT '',
  source_label  text NOT NULL DEFAULT '',
  source_url    text NOT NULL DEFAULT '',
  date          timestamptz,
  published     boolean NOT NULL DEFAULT true,
  sort          integer NOT NULL DEFAULT 0,
  created_at    timestamptz NOT NULL DEFAULT now(),
  updated_at    timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS news_published_date_idx ON news (published, date DESC);
