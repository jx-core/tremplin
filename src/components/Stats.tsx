import { stats } from "@/content/site";

export default function Stats() {
  return (
    <section className="bg-paper">
      <div className="shell py-[72px] md:py-[84px] lg:py-[92px] grid grid-cols-1 lg:grid-cols-[1fr_2fr] gap-9 lg:gap-16 items-start">
        <div>
          <span className="eyebrow">{stats.eyebrow}</span>
          <h2
            className="h-section mt-3"
            style={{ fontSize: "clamp(28px, 2.4vw, 36px)", maxWidth: "14ch" }}
          >
            {stats.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 border-t-[1.5px] border-rule-strong">
          {stats.items.map((s, i) => (
            <div
              key={i}
              className="flex flex-col gap-2 py-6 sm:py-9 sm:px-8 border-b sm:border-b-0 sm:border-r border-rule last:border-b-0 sm:last:border-r-0 sm:first:pl-0 sm:last:pr-0"
            >
              <div
                className="font-display font-semibold text-[48px] sm:text-[64px] leading-none tracking-[-0.022em] text-burgundy-deep"
                style={{ fontFeatureSettings: '"tnum" 1' }}
              >
                {s.value}
              </div>
              <div className="text-[13.5px] font-semibold tracking-[0.04em] text-burgundy">
                {s.label}
              </div>
              <div className="text-[13.5px] text-ink-soft leading-snug max-w-[32ch]">{s.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
