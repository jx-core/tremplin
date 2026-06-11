import { about } from "@/content/site";
import { renderEm } from "@/lib/em";

export default function About() {
  return (
    <section id="apropos" className="section bg-cream">
      <div className="shell">
        <div className="grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-12 lg:gap-20 items-center">
          <div>
            <span className="eyebrow">{about.eyebrow}</span>
            <h2 className="h-section mt-3">{renderEm(about.title)}</h2>
            <p className="lead mt-4">{about.lead}</p>

            <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 border-t-[1.5px] border-rule-strong">
              {about.triad.map((t, i) => (
                <div
                  key={i}
                  className="py-[18px] sm:pt-6 sm:pr-5 sm:pb-0 border-b sm:border-b-0 sm:border-r border-rule last:border-b-0 sm:last:border-r-0 sm:[&:not(:first-child)]:pl-5"
                >
                  <h4 className="font-display font-semibold text-[21px] text-burgundy-deep">{t.title}</h4>
                  <p className="mt-1.5 text-sm text-ink-soft">{t.body}</p>
                </div>
              ))}
            </div>
          </div>

          <figure className="relative rounded-xl overflow-hidden border border-rule">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={about.image} alt="Une séance TREMPLIN." className="w-full h-auto block" />
            <figcaption
              className="absolute left-0 right-0 bottom-0 px-7 pt-7 pb-6 text-white font-display italic font-medium text-[17px] leading-snug"
              style={{ background: "linear-gradient(180deg, transparent 0%, rgba(58,14,20,.85) 100%)" }}
            >
              {about.caption}
            </figcaption>
          </figure>
        </div>
      </div>
    </section>
  );
}
