import { livre } from "@/content/site";

export default function Livre() {
  return (
    <section id="livre" className="section bg-paper">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <figure className="relative rounded-xl overflow-hidden border border-rule bg-paper">
            <span className="absolute top-[18px] left-[18px] z-[1] px-3 py-[7px] rounded-full bg-burgundy text-cream-yellow font-mono font-semibold text-[10.5px] tracking-[0.16em] uppercase">
              Inclus
            </span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={livre.image} alt={livre.title} className="w-full h-auto block" />
          </figure>

          <div>
            <span className="eyebrow">{livre.eyebrow}</span>
            <h2 className="h-section mt-3" style={{ maxWidth: "18ch" }}>
              {livre.title}
            </h2>
            <p className="lead mt-4">{livre.lead}</p>
            <ol className="mt-7 grid gap-[22px] list-none">
              {livre.points.map((pt, i) => (
                <li
                  key={i}
                  className="grid grid-cols-[36px_1fr] gap-[18px] items-start pt-[22px] border-t border-rule first:border-t-0 first:pt-0"
                >
                  <div className="font-mono font-bold text-[13px] text-gold tracking-[0.06em] pt-[3px]">
                    {String(i + 1).padStart(2, "0")}
                  </div>
                  <div>
                    <h4 className="font-display font-semibold text-[19px] leading-tight text-burgundy-deep">
                      {pt.title}
                    </h4>
                    <p className="mt-1 text-[14.5px] text-ink-soft leading-relaxed">{pt.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
