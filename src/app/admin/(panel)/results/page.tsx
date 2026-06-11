import { getAllResultBars, getSiteConfig } from "@/db/queries";
import {
  createResultBarAction,
  updateResultBarAction,
  deleteResultBarAction,
  updateResultsCopyAction,
} from "@/app/admin/actions";

export const dynamic = "force-dynamic";

export default async function ResultsAdmin() {
  const [bars, config] = await Promise.all([getAllResultBars(), getSiteConfig()]);
  const r = config.results;

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="font-display font-semibold text-[28px] text-burgundy-deep">Résultats</h1>
        <p className="text-ink-soft text-sm mt-0.5">Taux de réussite par vague et texte de la section.</p>
      </div>

      {/* Bars */}
      <section className="grid gap-3">
        <h2 className="font-display font-semibold text-[18px] text-burgundy-deep">Vagues de résultats</h2>

        {bars.map((b) => (
          <div key={b.id} className="adm-card flex flex-wrap items-end gap-3">
            <form action={updateResultBarAction.bind(null, b.id)} className="flex flex-wrap items-end gap-3 flex-1 min-w-[260px]">
              <div className="flex-1 min-w-[160px]">
                <label className="adm-label">Nom de la vague</label>
                <input name="name" defaultValue={b.name} className="adm-input" />
              </div>
              <div className="w-[110px]">
                <label className="adm-label">Taux %</label>
                <input name="value" type="number" step="0.1" defaultValue={String(b.value)} className="adm-input" />
              </div>
              <div className="w-[80px]">
                <label className="adm-label">Tri</label>
                <input name="sort" type="number" defaultValue={String(b.sort)} className="adm-input" />
              </div>
              <button type="submit" className="adm-btn">Enregistrer</button>
            </form>
            <form action={deleteResultBarAction}>
              <input type="hidden" name="id" value={b.id} />
              <button type="submit" className="adm-btn-danger">Supprimer</button>
            </form>
          </div>
        ))}

        <form action={createResultBarAction} className="adm-card flex flex-wrap items-end gap-3 border-dashed">
          <div className="flex-1 min-w-[160px]">
            <label className="adm-label">Ajouter une vague</label>
            <input name="name" placeholder="ex. Fianarantsoa Vague 3" className="adm-input" />
          </div>
          <div className="w-[110px]">
            <label className="adm-label">Taux %</label>
            <input name="value" type="number" step="0.1" defaultValue="0" className="adm-input" />
          </div>
          <div className="w-[80px]">
            <label className="adm-label">Tri</label>
            <input name="sort" type="number" defaultValue={String(bars.length)} className="adm-input" />
          </div>
          <button type="submit" className="adm-btn">Ajouter</button>
        </form>
      </section>

      {/* Section copy */}
      <section className="grid gap-3">
        <h2 className="font-display font-semibold text-[18px] text-burgundy-deep">Texte de la section</h2>
        <form action={updateResultsCopyAction} className="adm-card grid gap-4">
          <div>
            <label className="adm-label">Sur-titre</label>
            <input name="eyebrow" defaultValue={r.eyebrow} className="adm-input" />
          </div>
          <div>
            <label className="adm-label">Titre</label>
            <input name="title" defaultValue={r.title} className="adm-input" />
          </div>
          <div>
            <label className="adm-label">Introduction</label>
            <textarea name="lead" rows={3} defaultValue={r.lead} className="adm-input" />
          </div>
          <div>
            <label className="adm-label">Note de bas de section</label>
            <input name="footnote" defaultValue={r.footnote} className="adm-input" />
          </div>
          <div>
            <label className="adm-label">Badges (un par ligne)</label>
            <textarea name="summary_badges" rows={3} defaultValue={r.summary_badges.join("\n")} className="adm-input" />
          </div>
          <button type="submit" className="adm-btn justify-self-start">Enregistrer le texte</button>
        </form>
      </section>
    </div>
  );
}
