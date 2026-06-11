import { scheduleCopy } from "@/content/site";
import type { ScheduleInfo } from "@/db/types";
import SectionHead from "./SectionHead";
import { ExternalIcon } from "@/lib/icons";

export default function Schedule({ schedule }: { schedule: ScheduleInfo }) {
  return (
    <section id="emploi" className="section bg-paper">
      <div className="shell">
        <SectionHead eyebrow={scheduleCopy.eyebrow} title={scheduleCopy.title} lead={scheduleCopy.lead} />

        {schedule.image ? (
          <div className="relative bg-white border border-rule rounded-xl p-[18px]">
            <div className="flex justify-between items-center gap-3.5 mb-3.5">
              <div className="font-mono text-[11.5px] font-semibold tracking-[0.14em] uppercase text-burgundy">
                {schedule.edition_label}
              </div>
              <a
                href={schedule.image}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-2 text-[13px] text-burgundy font-semibold hover:text-burgundy-deep hover:underline"
              >
                Ouvrir en plein écran
                <ExternalIcon className="w-3.5 h-3.5" />
              </a>
            </div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={schedule.image}
              alt={`Emploi du temps ${schedule.edition_label}`}
              className="w-full h-auto rounded-lg border border-rule"
            />
          </div>
        ) : (
          <div className="py-[60px] px-8 text-center bg-paper border border-dashed border-rule-strong rounded-xl">
            <h3 className="font-display font-semibold text-[22px] text-burgundy-deep mb-2">
              Emploi du temps non encore publié
            </h3>
            <p className="text-sm text-ink-soft">
              L&apos;image de la grille hebdomadaire sera publiée ici à l&apos;ouverture de la prochaine
              session.
            </p>
          </div>
        )}

        {schedule.footnote && (
          <div className="mt-[18px] text-[13px] text-ink-muted italic text-center">{schedule.footnote}</div>
        )}
      </div>
    </section>
  );
}
