import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import { ArrowIcon, ExternalIcon, PhoneIcon, MailIcon } from "@/lib/icons";
import {
  establishmentSlugs,
  getEstablishment,
  type Campus,
  type Mention,
} from "@/content/establishments";

export const dynamicParams = false;

export function generateStaticParams() {
  return establishmentSlugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = getEstablishment(slug);
  if (!data) return {};
  const { detail, program } = data;
  const title = `${program.acronym} - ${program.full} | TREMPLIN`;
  return {
    title,
    description: detail.intro,
    alternates: { canonical: `/etablissements/${slug}` },
    openGraph: {
      type: "article",
      title,
      description: detail.intro,
      url: `/etablissements/${slug}`,
      images: [{ url: program.cover, alt: program.full }],
    },
  };
}

function MetaItem({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-t border-rule pt-3">
      <div className="font-mono text-[10.5px] font-semibold tracking-[0.12em] uppercase text-gold mb-1">{label}</div>
      <div className="text-[14px] text-ink leading-snug">{value}</div>
    </div>
  );
}

function MentionCard({ m }: { m: Mention }) {
  return (
    <article className="bg-white border border-rule rounded-[10px] p-5">
      <h4 className="font-display font-semibold text-[16.5px] text-burgundy-deep leading-tight">{m.title}</h4>
      {m.note && <div className="mt-1 text-[12.5px] text-ink-muted italic">{m.note}</div>}
      {m.parcours && m.parcours.length > 0 && (
        <ul className="mt-3 flex flex-col gap-1.5">
          {m.parcours.map((p, i) => (
            <li key={i} className="flex gap-2 text-[13.5px] text-ink-soft leading-snug">
              <span aria-hidden className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
              {p}
            </li>
          ))}
        </ul>
      )}
    </article>
  );
}

function CampusBlock({ campus, showLabel }: { campus: Campus; showLabel: boolean }) {
  const meta: { label: string; value: string }[] = [];
  meta.push({ label: "Université", value: campus.university });
  if (campus.location) meta.push({ label: "Localisation", value: campus.location });
  if (campus.founded) meta.push({ label: "Historique", value: campus.founded });
  if (campus.system) meta.push({ label: "Cursus", value: campus.system });

  return (
    <div className="border-t-2 border-rule-strong pt-8 first:border-t-0 first:pt-0">
      {showLabel && campus.label && (
        <h2 className="font-display font-semibold text-[24px] text-burgundy-deep mb-5">{campus.label}</h2>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-4 mb-8">
        {meta.map((m) => (
          <MetaItem key={m.label} label={m.label} value={m.value} />
        ))}
      </div>

      {/* Admission */}
      <div className="mb-8">
        <span className="eyebrow">Voie d'admission</span>
        <ul className="mt-3 flex flex-col gap-2 max-w-[70ch]">
          {campus.admission.map((a, i) => (
            <li key={i} className="flex gap-2.5 text-[14.5px] text-ink-soft leading-snug">
              <span aria-hidden className="mt-[8px] w-1.5 h-1.5 rounded-full bg-burgundy shrink-0" />
              {a}
            </li>
          ))}
        </ul>
      </div>

      {/* Mentions & parcours */}
      <div className="mb-8">
        <span className="eyebrow">Mentions &amp; parcours</span>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
          {campus.mentions.map((m, i) => (
            <MentionCard key={i} m={m} />
          ))}
        </div>
      </div>

      {/* Diplômes */}
      {campus.diplomas && campus.diplomas.length > 0 && (
        <div className="mb-8">
          <span className="eyebrow">Diplômes délivrés</span>
          <div className="mt-3 flex flex-wrap gap-2">
            {campus.diplomas.map((d, i) => (
              <span key={i} className="inline-flex items-center px-3 py-1.5 rounded-full bg-white border border-rule text-[13px] text-ink-soft">
                {d}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Débouchés */}
      {campus.debouches && campus.debouches.length > 0 && (
        <div className="mb-8">
          <span className="eyebrow">Débouchés professionnels</span>
          <div className="mt-3 grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-2 max-w-[80ch]">
            {campus.debouches.map((d, i) => (
              <div key={i} className="flex gap-2.5 text-[14px] text-ink-soft leading-snug">
                <span aria-hidden className="mt-[7px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                {d}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Contact */}
      {campus.contact && (
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-[13.5px] text-ink-soft">
          {campus.contact.phone && (
            <a href={`tel:${campus.contact.phone.replace(/\s+/g, "")}`} className="inline-flex items-center gap-2 hover:text-burgundy">
              <PhoneIcon className="w-4 h-4 text-burgundy" />
              {campus.contact.phone}
            </a>
          )}
          {campus.contact.email && (
            <a href={`mailto:${campus.contact.email}`} className="inline-flex items-center gap-2 hover:text-burgundy">
              <MailIcon className="w-4 h-4 text-burgundy" />
              {campus.contact.email}
            </a>
          )}
          {campus.contact.website && (
            <a href={`https://${campus.contact.website}`} target="_blank" rel="noopener" className="inline-flex items-center gap-2 text-burgundy font-semibold hover:text-burgundy-deep">
              {campus.contact.website}
              <ExternalIcon className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      )}
    </div>
  );
}

export default async function EstablishmentPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const data = getEstablishment(slug);
  if (!data) notFound();
  const { detail, program } = data;
  const logos = program.logos && program.logos.length ? program.logos : [program.logo];

  return (
    <>
      <Nav />
      <main>
        {/* Header banner with cover */}
        <header
          className="relative overflow-hidden bg-burgundy-deep bg-cover bg-center isolate"
          style={{ backgroundImage: `url("${program.cover}")` }}
        >
          <div
            aria-hidden
            className="absolute inset-0 z-0"
            style={{ background: "linear-gradient(180deg, rgba(58,14,20,.82) 0%, rgba(58,14,20,.66) 45%, rgba(58,14,20,.92) 100%)" }}
          />
          <div className="relative z-[1] shell pt-8 pb-12 md:pt-10 md:pb-16">
            <Link href="/#programmes" className="inline-flex items-center gap-2 text-[13px] text-on-dark-soft hover:text-cream-yellow mb-7">
              <ArrowIcon className="w-3.5 h-3.5" style={{ transform: "scaleX(-1)" }} />
              <span>Tous les programmes</span>
            </Link>
            <div className="flex items-start gap-4 mb-5">
              <div
                className="inline-flex items-center gap-2 px-2.5 py-[7px] rounded-[9px] border border-white/55 shadow-[0_3px_10px_rgba(31,20,16,0.3)] shrink-0"
                style={{ background: "rgba(253,246,234,0.9)" }}
              >
                {logos.map((src, i) => (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img key={i} src={src} alt={`${program.acronym} logo`} className="h-9 w-auto max-w-[110px] object-contain block" />
                ))}
              </div>
            </div>
            <h1 className="font-display font-semibold text-white leading-[1.05] tracking-[-0.015em]" style={{ fontSize: "clamp(30px, 4.4vw, 52px)" }}>
              {program.full}
            </h1>
            <p className="mt-3 font-display italic font-medium text-cream-yellow text-[17px] md:text-[19px] max-w-[60ch]">
              {detail.tagline}
            </p>
            <p className="mt-4 text-on-dark-soft text-[15.5px] leading-relaxed max-w-[70ch]">{detail.intro}</p>
            <div className="mt-5 inline-flex items-center gap-2 font-mono text-[11.5px] tracking-[0.08em] text-on-dark-muted">
              <span className="w-1.5 h-1.5 rounded-full bg-gold-soft" />
              {program.type}
            </div>
          </div>
        </header>

        {/* Body */}
        <section className="section bg-paper">
          <div className="shell flex flex-col gap-10">
            {detail.campuses.map((c, i) => (
              <CampusBlock key={i} campus={c} showLabel={detail.campuses.length > 1} />
            ))}

            {/* TREMPLIN prep CTA */}
            <div className="bg-burgundy text-on-dark rounded-2xl p-8 sm:p-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
              <div>
                <span className="eyebrow on-dark">Préparation TREMPLIN</span>
                <h2 className="font-display font-semibold text-white text-[22px] md:text-[26px] mt-3 max-w-[26ch]">
                  Préparez le concours {detail.short} avec TREMPLIN.
                </h2>
              </div>
              <div className="flex flex-wrap gap-3 shrink-0">
                <a href="/#contact" className="btn btn-on-dark">
                  Nous contacter <ArrowIcon />
                </a>
                <Link href="/#programmes" className="btn btn-ghost-on-dark">
                  Tous les programmes
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
