"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/admin", label: "Tableau de bord" },
  { href: "/admin/news", label: "Actualités" },
  { href: "/admin/results", label: "Résultats" },
  { href: "/admin/settings", label: "Réglages" },
];

export default function AdminNav() {
  const path = usePathname();
  return (
    <nav className="bg-burgundy-deep">
      <div className="mx-auto max-w-[1100px] px-5 md:px-8 flex gap-1 overflow-x-auto">
        {links.map((l) => {
          const active = l.href === "/admin" ? path === "/admin" : path.startsWith(l.href);
          return (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-3 text-[13.5px] font-medium whitespace-nowrap border-b-2 transition-colors ${
                active
                  ? "text-cream-yellow border-cream-yellow"
                  : "text-on-dark-soft border-transparent hover:text-cream-yellow"
              }`}
            >
              {l.label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
