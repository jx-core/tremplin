import Link from "next/link";
import type { NewsItem } from "@/db/types";
import { toDateInputValue } from "@/lib/format";

function Field({
  label,
  name,
  defaultValue,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  defaultValue?: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="adm-label" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        defaultValue={defaultValue}
        required={required}
        placeholder={placeholder}
        className="adm-input"
      />
    </div>
  );
}

export default function NewsForm({
  action,
  item,
}: {
  action: (formData: FormData) => void | Promise<void>;
  item?: NewsItem | null;
}) {
  return (
    <form action={action} className="adm-card grid gap-4 max-w-[680px]">
      <Field label="Titre" name="title" defaultValue={item?.title} required />

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Catégorie" name="category" defaultValue={item?.category} placeholder="ex. Concours ENI" />
        <div>
          <label className="adm-label" htmlFor="date">Date</label>
          <input id="date" name="date" type="date" className="adm-input" defaultValue={toDateInputValue(item?.date)} />
        </div>
      </div>

      <div>
        <label className="adm-label" htmlFor="body">Corps</label>
        <textarea id="body" name="body" rows={4} className="adm-input" defaultValue={item?.body} />
      </div>

      <div>
        <label className="adm-label" htmlFor="contacts">Contacts (optionnel)</label>
        <textarea id="contacts" name="contacts" rows={2} className="adm-input" defaultValue={item?.contacts} />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Field label="Libellé de la source" name="source_label" defaultValue={item?.source_label} placeholder="ex. Page officielle ENI" />
        <Field label="URL de la source" name="source_url" type="url" defaultValue={item?.source_url} placeholder="https://…" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
        <Field label="Ordre (tri)" name="sort" type="number" defaultValue={String(item?.sort ?? 0)} />
        <label className="flex items-center gap-2 text-sm text-ink mt-5">
          <input type="checkbox" name="published" defaultChecked={item?.published ?? true} className="w-4 h-4 accent-[#571820]" />
          Publié (visible sur le site)
        </label>
      </div>

      <div className="flex gap-3 pt-1">
        <button type="submit" className="adm-btn">Enregistrer</button>
        <Link href="/admin/news" className="adm-btn-ghost">Annuler</Link>
      </div>
    </form>
  );
}
