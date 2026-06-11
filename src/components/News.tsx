import { newsCopy } from "@/content/site";
import type { NewsItem } from "@/db/types";
import SectionHead from "./SectionHead";
import { formatDateFR, isFilledUrl } from "@/lib/format";
import { ExternalIcon } from "@/lib/icons";

export default function News({ items }: { items: NewsItem[] }) {
  return (
    <section id="actualites" className="section bg-paper">
      <div className="shell">
        <SectionHead eyebrow={newsCopy.eyebrow} title={newsCopy.title} lead={newsCopy.lead} />

        {items.length === 0 ? (
          <div className="py-[60px] px-6 sm:px-10 text-center bg-white border border-dashed border-rule-strong rounded-[10px] text-ink-muted text-[14.5px]">
            {newsCopy.empty_label}
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-[18px]">
            {items.map((it) => (
              <div key={it.id} className="grid grid-cols-[12px_1fr] gap-3.5">
                <span aria-hidden className="w-2.5 h-2.5 rounded-full bg-gold mt-2.5" />
                <article className="bg-white border border-rule rounded-[10px] p-5 md:p-6 flex flex-col gap-3 transition-transform hover:-translate-y-0.5 hover:border-burgundy">
                  <div className="flex justify-between items-center gap-2.5">
                    {it.category && (
                      <div className="inline-flex items-center gap-1.5 font-mono text-[11px] font-semibold tracking-[0.1em] uppercase text-burgundy before:content-[''] before:w-[7px] before:h-[7px] before:rounded-full before:bg-gold">
                        {it.category}
                      </div>
                    )}
                    {it.date && <div className="font-mono text-[11.5px] text-ink-muted">{formatDateFR(it.date)}</div>}
                  </div>

                  {it.title && (
                    <h3 className="font-display font-semibold text-[20px] leading-tight text-burgundy-deep tracking-[-0.01em]">
                      {it.title}
                    </h3>
                  )}
                  {it.body && <p className="text-sm text-ink-soft leading-relaxed">{it.body}</p>}
                  {it.contacts && (
                    <div className="text-[12.5px] text-ink-muted leading-snug border-l-2 border-rule-strong pl-3">
                      {it.contacts}
                    </div>
                  )}

                  {(it.source_label || isFilledUrl(it.source_url)) && (
                    <div className="mt-auto pt-3 border-t border-rule flex justify-between items-center gap-3.5 text-[12.5px] text-ink-muted">
                      <span>{it.source_label}</span>
                      {isFilledUrl(it.source_url) && (
                        <a
                          href={it.source_url}
                          target="_blank"
                          rel="noopener"
                          className="inline-flex items-center gap-1.5 text-burgundy font-semibold text-[13px] hover:text-burgundy-deep hover:underline"
                        >
                          Lire la source
                          <ExternalIcon className="w-[13px] h-[13px]" />
                        </a>
                      )}
                    </div>
                  )}
                </article>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
