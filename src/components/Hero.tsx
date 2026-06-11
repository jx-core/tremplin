import { hero } from "@/content/site";
import type { NextSession } from "@/db/types";
import { ArrowIcon } from "@/lib/icons";
import HeroCarousel from "./HeroCarousel";

function NextSessionCard({ ns }: { ns: NextSession }) {
  return (
    <div
      className="flex flex-col gap-3.5 p-5 rounded-[10px] w-full lg:max-w-[280px] text-on-dark"
      style={{ background: "rgba(58,14,20,0.55)", border: "1px solid rgba(202,153,0,0.4)" }}
    >
      <div className="font-mono text-[11px] font-semibold tracking-[0.18em] uppercase text-cream-yellow">
        {ns.label || "Prochaine session"}
      </div>
      <div className="flex items-baseline gap-3.5">
        <div
          className="font-display font-medium text-[60px] leading-none text-white"
          style={{ fontFeatureSettings: '"tnum" 1' }}
        >
          {ns.day}
        </div>
        <div className="flex flex-col gap-0.5 font-semibold text-sm text-white">
          <span>{(ns.month || "").toUpperCase()}</span>
          <span className="font-mono text-[11px] font-medium tracking-[0.14em] text-on-dark-muted">
            {ns.year}
          </span>
        </div>
      </div>
      {ns.edition && (
        <div className="font-mono text-xs uppercase tracking-[0.1em] text-gold-soft">{ns.edition}</div>
      )}
      {ns.blurb && (
        <div className="text-[12.5px] leading-snug text-on-dark-soft">{ns.blurb}</div>
      )}
    </div>
  );
}

export default function Hero({ nextSession }: { nextSession: NextSession }) {
  const ns = nextSession;
  const showNs = !!(ns && (ns.day || ns.month));

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-burgundy-deep text-on-dark min-h-[620px] lg:min-h-[760px]"
    >
      <HeroCarousel slides={hero.carousel} interval={hero.carousel_interval_ms} />

      <div
        aria-hidden
        className="absolute inset-0 z-[1]"
        style={{
          background:
            "linear-gradient(95deg, rgba(58,14,20,.92) 0%, rgba(58,14,20,.72) 40%, rgba(58,14,20,.40) 72%, rgba(58,14,20,.20) 100%)",
        }}
      />

      <div className="relative z-[3] mx-auto max-w-[var(--container-shell)] px-[22px] md:px-9 pt-20 md:pt-28 pb-28 md:pb-32 grid grid-cols-1 lg:grid-cols-[1.4fr_0.7fr] gap-10 lg:gap-16 items-end">
        <div>
          <span className="eyebrow on-dark">{hero.eyebrow}</span>
          <h1
            className="h-display mt-4 !text-white"
            style={{ fontSize: "clamp(42px, 6vw, 80px)", lineHeight: 1.0, letterSpacing: "-0.02em" }}
          >
            {hero.title_main}{" "}
            <em className="italic font-medium text-cream-yellow">{hero.title_em}</em>
          </h1>
          <p className="lead mt-6 max-w-[54ch] text-[18px] text-on-dark-soft">{hero.lead}</p>
          <div className="flex flex-wrap gap-3.5 mt-9">
            <a href={hero.primary_cta_href} className="btn btn-on-dark">
              {hero.primary_cta_label}
              <ArrowIcon />
            </a>
            <a href={hero.secondary_cta_href} className="btn btn-ghost-on-dark">
              {hero.secondary_cta_label}
            </a>
          </div>
        </div>

        <aside className="flex flex-col gap-4 lg:items-end">
          {showNs && <NextSessionCard ns={ns} />}
          <span className="inline-flex items-center gap-2.5 text-[12px] tracking-[0.18em] uppercase text-on-dark-muted">
            <span className="w-9 h-px bg-on-dark-muted" />
            {hero.aside_note}
          </span>
        </aside>
      </div>
    </section>
  );
}
