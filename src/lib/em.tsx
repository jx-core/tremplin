import type { ReactNode } from "react";

/* Renders the legacy "*emphasis*" convention in titles as <em>…</em>. */
export function renderEm(s: string): ReactNode {
  if (!s) return null;
  return s.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.length > 1 && part.startsWith("*") && part.endsWith("*") ? (
      <em key={i}>{part.slice(1, -1)}</em>
    ) : (
      part
    )
  );
}
