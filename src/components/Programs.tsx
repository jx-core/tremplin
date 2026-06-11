import Link from "next/link";
import { programs, type Establishment } from "@/content/site";
import { slugForAcronym } from "@/content/establishments";
import { ArrowIcon } from "@/lib/icons";
import SectionHead from "./SectionHead";

const SCRIM =
  "linear-gradient(180deg, rgba(58,14,20,.60) 0%, rgba(58,14,20,.14) 26%, rgba(58,14,20,.30) 52%, rgba(58,14,20,.86) 86%, rgba(58,14,20,.95) 100%)";

function ProgramCard({ e }: { e: Establishment }) {
  const logos = e.logos && e.logos.length ? e.logos : [e.logo];
  const slug = slugForAcronym(e.acronym);
  const cls =
    "group relative overflow-hidden rounded-xl min-h-[320px] flex flex-col p-[22px] pb-6 border border-rule-strong bg-burgundy-deep bg-cover bg-center isolate transition-transform duration-300 hover:-translate-y-1 hover:shadow-[0_14px_30px_rgba(31,20,16,0.3)]";

  const content = (
    <>
      <div aria-hidden className="absolute inset-0 z-0 pointer-events-none" style={{ background: SCRIM }} />

      {/* top: logo chip + status */}
      <div className="relative z-[1] flex items-start justify-between gap-4 mb-auto">
        <div
          className="inline-flex items-center gap-2 px-2.5 py-[7px] rounded-[9px] border border-white/55 shadow-[0_3px_10px_rgba(31,20,16,0.3)]"
          style={{ background: "rgba(253,246,234,0.86)", backdropFilter: "blur(3px)", WebkitBackdropFilter: "blur(3px)" }}
        >
          {logos.map((src, idx) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={idx} src={src} alt={`${e.acronym} logo`} className="h-[34px] w-auto max-w-[110px] object-contain block" />
          ))}
        </div>
        <div className="inline-flex items-center gap-2 font-mono text-[11px] font-semibold tracking-[0.06em] text-on-dark-soft text-right leading-tight [text-shadow:0_1px_4px_rgba(0,0,0,0.55)]">
          <span className="w-1.5 h-1.5 rounded-full bg-gold-soft shrink-0" />
          {e.status_label}
        </div>
      </div>

      {/* bottom: acronym / full name / type / link */}
      <div className="relative z-[1] flex flex-col gap-2">
        <div className="font-display font-semibold text-[32px] leading-none tracking-[-0.012em] text-white [text-shadow:0_2px_14px_rgba(0,0,0,0.6)]">
          {e.acronym}
        </div>
        <div className="text-[14.5px] font-semibold leading-snug text-gold-soft [text-shadow:0_1px_8px_rgba(0,0,0,0.65)]">
          {e.full}
        </div>
        <div className="text-[13.5px] leading-snug text-on-dark-soft [text-shadow:0_1px_6px_rgba(0,0,0,0.6)]">
          {e.type}
        </div>
        {slug && (
          <div className="mt-2 inline-flex items-center gap-1.5 text-[12.5px] font-semibold text-cream-yellow [text-shadow:0_1px_6px_rgba(0,0,0,0.7)]">
            Voir le détail
            <ArrowIcon className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
          </div>
        )}
      </div>
    </>
  );

  return slug ? (
    <Link href={`/etablissements/${slug}`} aria-label={`${e.acronym}, voir le détail`} className={cls} style={{ backgroundImage: `url("${e.cover}")` }}>
      {content}
    </Link>
  ) : (
    <article className={cls} style={{ backgroundImage: `url("${e.cover}")` }}>
      {content}
    </article>
  );
}

export default function Programs() {
  return (
    <section id="programmes" className="section bg-paper">
      <div className="shell">
        <SectionHead eyebrow={programs.eyebrow} title={programs.title} lead={programs.lead} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[18px]">
          {programs.items.map((e) => (
            <ProgramCard key={e.acronym} e={e} />
          ))}
        </div>
      </div>
    </section>
  );
}
