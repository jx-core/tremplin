import { footer, siteMeta } from "@/content/site";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-burgundy-deep text-on-dark pt-[72px] pb-7">
      <div className="shell">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.6fr_1fr_1fr] gap-10 lg:gap-16 pb-12 border-b border-on-dark-rule">
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo/tremplin-white.png" alt="TREMPLIN" className="h-8 mb-5" />
            <p className="text-sm leading-relaxed text-on-dark-soft max-w-[36ch]">{footer.tagline}</p>
            <div className="mt-[18px] font-display italic font-medium text-[16px] text-cream-yellow">
              {footer.slogan}
            </div>
          </div>

          {footer.groups.map((g) => (
            <div key={g.title}>
              <h4 className="font-mono font-semibold text-[11px] tracking-[0.2em] uppercase text-cream-yellow mb-[18px]">
                {g.title}
              </h4>
              <ul className="flex flex-col gap-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <a href={l.href} className="text-sm text-on-dark-soft hover:text-cream-yellow transition-colors">
                      {l.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="pt-[22px] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3.5 text-[12.5px] text-on-dark-muted">
          <span>
            {year}. {footer.copyright}
          </span>
          <span className="font-mono text-[11.5px] tracking-[0.14em]">{siteMeta.locations.join(" / ")}</span>
        </div>
      </div>
    </footer>
  );
}
