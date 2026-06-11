import Link from "next/link";
import { getAllNews } from "@/db/queries";
import { deleteNewsAction } from "@/app/admin/actions";
import { formatDateFR } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function NewsAdmin() {
  const items = await getAllNews();

  return (
    <div>
      <div className="flex items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="font-display font-semibold text-[28px] text-burgundy-deep">Actualités</h1>
          <p className="text-ink-soft text-sm mt-0.5">{items.length} entrée(s).</p>
        </div>
        <Link href="/admin/news/new" className="adm-btn">Nouvelle actualité</Link>
      </div>

      {items.length === 0 ? (
        <div className="adm-card text-ink-muted text-sm">
          Aucune actualité pour le moment. Cliquez sur « Nouvelle actualité » pour en ajouter une.
        </div>
      ) : (
        <div className="grid gap-3">
          {items.map((it) => (
            <div key={it.id} className="adm-card flex items-center justify-between gap-4">
              <div className="min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <span
                    className={`text-[11px] font-mono px-2 py-0.5 rounded ${
                      it.published ? "bg-gold/15 text-burgundy" : "bg-rule text-ink-muted"
                    }`}
                  >
                    {it.published ? "Publié" : "Brouillon"}
                  </span>
                  {it.category && <span className="text-[12px] text-ink-muted">{it.category}</span>}
                  {it.date && <span className="text-[12px] text-ink-muted">· {formatDateFR(it.date)}</span>}
                </div>
                <div className="font-semibold text-burgundy-deep truncate">{it.title}</div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <Link href={`/admin/news/${it.id}`} className="adm-btn-ghost">Modifier</Link>
                <form action={deleteNewsAction}>
                  <input type="hidden" name="id" value={it.id} />
                  <button type="submit" className="adm-btn-danger">Supprimer</button>
                </form>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
