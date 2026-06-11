import type { ReactNode } from "react";
import { contactCopy, siteMeta } from "@/content/site";
import type { ContactInfo } from "@/db/types";
import { renderEm } from "@/lib/em";
import { PhoneIcon, PinIcon, FacebookIcon, MailIcon } from "@/lib/icons";
import { isFilledUrl, isFilledEmail } from "@/lib/format";

function DetailItem({
  icon,
  label,
  sub,
  children,
}: {
  icon: ReactNode;
  label: string;
  sub: string;
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center text-center gap-3.5 flex-1">
      <div className="w-12 h-12 flex items-center justify-center text-burgundy">{icon}</div>
      <div className="font-mono text-[10px] font-semibold tracking-[0.14em] uppercase text-gold">{label}</div>
      <div className="font-display font-semibold text-[18px] leading-tight text-burgundy-deep tracking-[-0.01em]">
        {children}
      </div>
      <div className="text-[13px] text-ink-soft leading-snug">{sub}</div>
    </div>
  );
}

export default function Contact({ contact }: { contact: ContactInfo }) {
  const phones = (contact.phones || []).filter(Boolean);

  const details: ReactNode[] = [];
  if (phones.length) {
    details.push(
      <DetailItem key="phone" icon={<PhoneIcon className="w-12 h-12" />} label="Appelez-nous" sub="Du lundi au samedi, horaires de bureau.">
        {phones.map((p, i) => (
          <div key={i}>
            <a href={`tel:${p.replace(/\s+/g, "")}`} className="hover:text-burgundy">
              {p}
            </a>
          </div>
        ))}
      </DetailItem>
    );
  }
  if (contact.address_line_1 || contact.address_line_2) {
    details.push(
      <DetailItem key="addr" icon={<PinIcon className="w-12 h-12" />} label="Nous trouver" sub={siteMeta.locations.join(" et ")}>
        {contact.address_line_1 && <div>{contact.address_line_1}</div>}
        {contact.address_line_2 && <div>{contact.address_line_2}</div>}
      </DetailItem>
    );
  }
  if (isFilledUrl(contact.facebook_url) || contact.facebook_name) {
    details.push(
      <DetailItem
        key="fb"
        icon={<FacebookIcon className="w-12 h-12" />}
        label="Sur Facebook"
        sub={isFilledUrl(contact.facebook_url) ? "Page officielle TREMPLIN." : "Page officielle, URL à renseigner dans l'administration."}
      >
        {isFilledUrl(contact.facebook_url) ? (
          <a href={contact.facebook_url} target="_blank" rel="noopener" className="hover:text-burgundy">
            {contact.facebook_name || "Tremplin"}
          </a>
        ) : (
          <span>{contact.facebook_name || "Tremplin"}</span>
        )}
      </DetailItem>
    );
  }

  const actions: ReactNode[] = [];
  if (isFilledUrl(contact.facebook_url)) {
    actions.push(
      <a key="fb" href={contact.facebook_url} target="_blank" rel="noopener" className="btn btn-on-dark">
        <FacebookIcon className="w-4 h-4" />
        {contactCopy.primary_label}
      </a>
    );
  }
  if (isFilledEmail(contact.email)) {
    actions.push(
      <a key="mail" href={`mailto:${contact.email}`} className="btn btn-ghost-on-dark">
        <MailIcon className="w-4 h-4" />
        {contactCopy.secondary_label}
      </a>
    );
  }

  return (
    <section id="contact" className="section bg-paper">
      <div className="shell">
        {details.length > 0 && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-around gap-8 bg-white border border-rule rounded-xl p-8 sm:p-10 mb-7">
            {details}
          </div>
        )}

        <div className="bg-burgundy text-on-dark rounded-2xl p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-[1.4fr_1fr] gap-10 lg:gap-14 items-center">
          <div>
            <span className="eyebrow on-dark">{contactCopy.eyebrow}</span>
            <h2 className="h-section mt-3 !text-white" style={{ maxWidth: "18ch" }}>
              {renderEm(contactCopy.title)}
            </h2>
            <p className="lead mt-4 text-on-dark-soft" style={{ maxWidth: "48ch" }}>
              {contactCopy.lead}
            </p>
          </div>
          <div>
            {actions.length > 0 ? (
              <div className="flex flex-col gap-3">{actions}</div>
            ) : (
              <div className="text-sm leading-relaxed text-on-dark-soft">
                Aucun lien direct n&apos;est renseigné. Utilisez les numéros ou l&apos;adresse ci-dessus pour
                nous joindre.
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
