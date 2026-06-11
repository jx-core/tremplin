import type { SVGProps } from "react";

/* Line/solid icon set ported from the legacy site. Selective, not decorative. */

type P = SVGProps<SVGSVGElement>;
const line = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

export function ArrowIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} aria-hidden {...props}>
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}
export function FacebookIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M14 9V7a1 1 0 0 1 1-1h2V3h-3a4 4 0 0 0-4 4v2H7v3h3v9h3v-9h3l1-3z" />
    </svg>
  );
}
export function MailIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} aria-hidden {...props}>
      <rect x="3" y="5" width="18" height="14" rx="2" />
      <path d="M3 7l9 6 9-6" />
    </svg>
  );
}
export function MenuIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </svg>
  );
}
export function CloseIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} strokeWidth={2} aria-hidden {...props}>
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
export function ExternalIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} aria-hidden {...props}>
      <path d="M14 4h6v6" />
      <path d="M20 4l-9 9" />
      <path d="M14 20H5V11" />
    </svg>
  );
}
export function PhoneIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} aria-hidden {...props}>
      <path d="M22 16.92V20a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-17.82-17.82A2 2 0 0 1 4 2h3.09a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7 2 2 0 0 1 1.72 2z" />
    </svg>
  );
}
export function PinIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" {...line} aria-hidden {...props}>
      <path d="M12 22s8-8 8-13a8 8 0 0 0-16 0c0 5 8 13 8 13z" />
      <circle cx="12" cy="9" r="2.6" />
    </svg>
  );
}
