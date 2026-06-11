import { redirect } from "next/navigation";
import { getAdminSession } from "@/lib/auth";
import { logoutAction } from "@/app/admin/actions";
import AdminNav from "@/components/admin/AdminNav";

export default async function PanelLayout({ children }: { children: React.ReactNode }) {
  const session = await getAdminSession();
  if (!session) redirect("/admin/login");

  return (
    <div className="min-h-screen">
      <header className="bg-burgundy text-on-dark">
        <div className="mx-auto max-w-[1100px] px-5 md:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/assets/logo/tremplin-white.png" alt="TREMPLIN" className="h-6" />
            <span className="font-mono text-[11px] tracking-[0.18em] uppercase text-cream-yellow">Admin</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="/" target="_blank" rel="noopener" className="text-[13px] text-on-dark-soft hover:text-cream-yellow">
              Voir le site ↗
            </a>
            <form action={logoutAction}>
              <button type="submit" className="text-[13px] text-on-dark-soft hover:text-cream-yellow">
                Déconnexion
              </button>
            </form>
          </div>
        </div>
        <AdminNav />
      </header>
      <main className="mx-auto max-w-[1100px] px-5 md:px-8 py-8">{children}</main>
    </div>
  );
}
