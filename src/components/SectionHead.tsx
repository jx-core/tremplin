import { renderEm } from "@/lib/em";

export default function SectionHead({
  eyebrow,
  title,
  lead,
  dark = false,
}: {
  eyebrow: string;
  title: string;
  lead?: string;
  dark?: boolean;
}) {
  return (
    <div className="mb-10 md:mb-14 grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-5 lg:gap-12 lg:items-end">
      <div>
        <span className={`eyebrow ${dark ? "on-dark" : ""}`}>{eyebrow}</span>
        <h2 className="h-section mt-3">{renderEm(title)}</h2>
      </div>
      {lead && <p className="lead lg:justify-self-end lg:self-end">{lead}</p>}
    </div>
  );
}
