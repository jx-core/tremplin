const MONTHS_FR = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

export function formatDateFR(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return iso;
  return `${d.getDate()} ${MONTHS_FR[d.getMonth()]} ${d.getFullYear()}`;
}

export function formatPercent(v: number): string {
  if (typeof v !== "number" || isNaN(v)) return "";
  return v.toLocaleString("fr-FR", { maximumFractionDigits: 1 }) + " %";
}

export function isFilledUrl(v: string | null | undefined): boolean {
  return typeof v === "string" && v.trim() !== "" && v.trim() !== "#";
}

export function isFilledEmail(v: string | null | undefined): boolean {
  return typeof v === "string" && /\S+@\S+\.\S+/.test(v.trim());
}

/** Convert a stored ISO date to the value an <input type="date"> expects. */
export function toDateInputValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (isNaN(d.getTime())) return "";
  return d.toISOString().slice(0, 10);
}
