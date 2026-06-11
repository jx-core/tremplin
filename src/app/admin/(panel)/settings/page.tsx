import { getSiteConfig } from "@/db/queries";
import {
  updateNextSessionAction,
  updateScheduleAction,
  updateContactAction,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

function Input({
  label,
  name,
  defaultValue,
  type = "text",
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="adm-label" htmlFor={name}>{label}</label>
      <input id={name} name={name} type={type} defaultValue={defaultValue} placeholder={placeholder} className="adm-input" />
    </div>
  );
}

function Textarea({
  label,
  name,
  defaultValue,
  rows = 3,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  rows?: number;
}) {
  return (
    <div>
      <label className="adm-label" htmlFor={name}>{label}</label>
      <textarea id={name} name={name} rows={rows} defaultValue={defaultValue} className="adm-input" />
    </div>
  );
}

export default async function SettingsAdmin() {
  const c = await getSiteConfig();
  const ns = c.next_session;
  const s = c.schedule;
  const ct = c.contact;

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="font-display font-semibold text-[28px] text-burgundy-deep">Réglages</h1>
        <p className="text-ink-soft text-sm mt-0.5">Prochaine session, emploi du temps et coordonnées.</p>
      </div>

      <section className="grid gap-3">
        <h2 className="font-display font-semibold text-[18px] text-burgundy-deep">Prochaine session (héro)</h2>
        <form action={updateNextSessionAction} className="adm-card grid gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <Input label="Jour" name="day" defaultValue={ns.day} placeholder="03" />
            <Input label="Mois" name="month" defaultValue={ns.month} placeholder="Août" />
            <Input label="Année" name="year" defaultValue={ns.year} placeholder="2026" />
          </div>
          <Input label="Libellé" name="label" defaultValue={ns.label} />
          <Input label="Édition" name="edition" defaultValue={ns.edition} />
          <Textarea label="Description courte" name="blurb" defaultValue={ns.blurb} rows={2} />
          <button type="submit" className="adm-btn justify-self-start">Enregistrer</button>
        </form>
      </section>

      <section className="grid gap-3">
        <h2 className="font-display font-semibold text-[18px] text-burgundy-deep">Emploi du temps</h2>
        <form action={updateScheduleAction} className="adm-card grid gap-4">
          <Input
            label="URL de l'image (laisser vide = « non publié »)"
            name="image"
            defaultValue={s.image}
            placeholder="/assets/photos/edt.jpg ou https://…"
          />
          <Input label="Libellé d'édition" name="edition_label" defaultValue={s.edition_label} />
          <Textarea label="Note de bas de section" name="footnote" defaultValue={s.footnote} rows={2} />
          <button type="submit" className="adm-btn justify-self-start">Enregistrer</button>
        </form>
      </section>

      <section className="grid gap-3">
        <h2 className="font-display font-semibold text-[18px] text-burgundy-deep">Contact</h2>
        <form action={updateContactAction} className="adm-card grid gap-4">
          <Textarea label="Téléphones (un par ligne)" name="phones" defaultValue={ct.phones.join("\n")} rows={2} />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Adresse — ligne 1" name="address_line_1" defaultValue={ct.address_line_1} />
            <Input label="Adresse — ligne 2" name="address_line_2" defaultValue={ct.address_line_2} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <Input label="Nom Facebook" name="facebook_name" defaultValue={ct.facebook_name} />
            <Input label="URL Facebook" name="facebook_url" type="url" defaultValue={ct.facebook_url} placeholder="https://facebook.com/…" />
          </div>
          <Input label="E-mail" name="email" type="email" defaultValue={ct.email} />
          <button type="submit" className="adm-btn justify-self-start">Enregistrer</button>
        </form>
      </section>
    </div>
  );
}
