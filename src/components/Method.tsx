import { method } from "@/content/site";
import SectionHead from "./SectionHead";

export default function Method() {
  return (
    <section id="methode" className="section bg-cream relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 opacity-[0.07] bg-cover pointer-events-none"
        style={{ backgroundImage: 'url("/assets/photos/method.jpg")', backgroundPosition: "center 30%" }}
      />
      <div className="shell relative z-[1]">
        <SectionHead eyebrow={method.eyebrow} title={method.title} lead={method.lead} />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 md:gap-[18px]">
          {method.pillars.map((p) => (
            <article
              key={p.num}
              className="grid grid-cols-[auto_1fr] gap-[18px] items-start p-5 md:p-6 bg-white border border-rule rounded-[10px]"
            >
              <div className="font-mono font-bold text-xs text-gold tracking-[0.1em] px-2 py-1 border border-rule rounded-md bg-paper self-start">
                {p.num}
              </div>
              <div>
                <h3 className="font-display font-semibold text-[22px] leading-tight text-burgundy-deep tracking-[-0.01em] mb-2">
                  {p.title}
                </h3>
                <p className="text-[14.5px] leading-relaxed text-ink-soft">{p.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
