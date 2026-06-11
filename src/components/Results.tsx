import type { ResultsBlock, ResultBar } from "@/db/types";
import { renderEm } from "@/lib/em";
import ResultsBars from "./ResultsBars";

export default function Results({
  results,
  bars,
}: {
  results: ResultsBlock;
  bars: ResultBar[];
}) {
  return (
    <section id="resultats" className="section section-dark bg-burgundy text-on-dark">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <div>
            <span className="eyebrow on-dark">{results.eyebrow}</span>
            <h2 className="h-section mt-3" style={{ maxWidth: "18ch" }}>
              {renderEm(results.title)}
            </h2>
            <p className="lead mt-4">{results.lead}</p>

            {results.summary_badges.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-7">
                {results.summary_badges.map((b, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center px-3 py-[7px] rounded-full font-mono font-semibold text-[11.5px] tracking-[0.06em] text-cream-yellow"
                    style={{ background: "rgba(202,153,0,0.1)", border: "1px solid rgba(202,153,0,0.35)" }}
                  >
                    {b}
                  </span>
                ))}
              </div>
            )}

            {results.footnote && (
              <div className="mt-[18px] text-[12.5px] italic text-on-dark-muted">{results.footnote}</div>
            )}
          </div>

          <aside
            className="rounded-xl p-7 md:p-8"
            style={{ background: "rgba(0,0,0,0.18)", border: "1px solid rgba(253,246,234,0.14)" }}
          >
            <h3 className="font-mono font-semibold text-[11px] text-cream-yellow tracking-[0.18em] uppercase mb-6 flex items-center justify-between gap-3.5">
              Taux de réussite par vague
              <span className="text-on-dark-muted font-medium tracking-normal normal-case">Concours ENI</span>
            </h3>
            <ResultsBars bars={bars} />
          </aside>
        </div>
      </div>
    </section>
  );
}
