/* Types for the dynamic (database-backed) content. */

export interface NextSession {
  label: string;
  edition: string;
  day: string;
  month: string;
  year: string;
  blurb: string;
}

export interface ScheduleInfo {
  image: string;
  edition_label: string;
  footnote: string;
}

export interface ContactInfo {
  phones: string[];
  address_line_1: string;
  address_line_2: string;
  facebook_url: string;
  facebook_name: string;
  email: string;
}

export interface ResultsBlock {
  eyebrow: string;
  title: string;
  lead: string;
  footnote: string;
  summary_badges: string[];
}

export interface ResultBar {
  id: number;
  name: string;
  value: number;
  sort: number;
}

export interface SiteConfig {
  next_session: NextSession;
  schedule: ScheduleInfo;
  contact: ContactInfo;
  results: ResultsBlock;
}

export interface NewsItem {
  id: number;
  category: string;
  title: string;
  body: string;
  contacts: string;
  source_label: string;
  source_url: string;
  date: string | null; // ISO string
  published: boolean;
  sort: number;
}
