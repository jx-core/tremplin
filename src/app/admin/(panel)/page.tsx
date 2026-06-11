import Link from "next/link";
import { getAllNews, getAllResultBars, getSiteConfig } from "@/db/queries";

export const dynamic = "force-dynamic";

function StatCard({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <Link href={href} className="adm-card hover:border-burgundy transition-colors">
      <div className="text-[12px] font-semibold uppercase tracking-[0.04em] text-ink-muted">{label}</div>
      <div className="font-display font-semibold text-[30px] text-burgundy-deep mt-1 leading-none">{value}</div>
    </Link>
  );
}

function QuickCard({ title, body, href, cta }: { title: string; body: string; href: string; cta: string }) {
  return (
    <div className="adm-card flex flex-col gap-3">
      <h3 className="font-display font-semibold text-[18px] text-burgundy-deep">{title}</h3>
      <p className="text-sm text-ink-soft leading-relaxed flex-1">{body}</p>
      <Link href={href} className="adm-btn-ghost self-start">{cta}</Link>
    </div>
  );
}

export default async function Dashboard() {
  const [news, bars, config] = await Promise.all([
    getAllNews(),
    getAllResultBars(),
    getSiteConfig(),
  ]);
  const published = news.filter((n) => n.published).length;

  return (
    <div>
      <h1 className="font-display font-semibold text-[28px] text-burgundy-deep mb-1">Tableau de bord</h1>
      <p className="text-ink-soft text-sm mb-6">Gérez le contenu dynamique du site TREMPLIN.</p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
        <StatCard label="Actualités publiées" value={`${published} / ${news.length}`} href="/admin/news" />
        <StatCard label="Vagues de résultats" value={String(bars.length)} href="/admin/results" />
        <StatCard
          label="Prochaine session"
          value={`${config.next_session.day} ${config.next_session.month}`.trim() || "-"}
          href="/admin/settings"
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <QuickCard title="Actualités" body="Ajouter ou modifier les annonces affichées sur la page d'accueil." href="/admin/news" cta="Gérer les actualités" />
        <QuickCard title="Résultats" body="Mettre à jour les taux de réussite par vague et le texte de la section." href="/admin/results" cta="Gérer les résultats" />
        <QuickCard title="Réglages" body="Prochaine session, emploi du temps et coordonnées de contact." href="/admin/settings" cta="Ouvrir les réglages" />
      </div>
    </div>
  );
}
