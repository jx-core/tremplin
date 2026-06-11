"use client";
import { useState } from "react";
import { nav } from "@/content/site";
import { MenuIcon, CloseIcon } from "@/lib/icons";

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-[60] bg-burgundy text-on-dark border-b border-[rgba(202,153,0,0.2)]">
      <div className="mx-auto max-w-[1360px] px-[22px] md:px-9 py-3.5 flex items-center justify-between gap-6">
        <a href="#hero" aria-label="TREMPLIN, accueil" className="shrink-0">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo/tremplin-white.png" alt="TREMPLIN" className="h-[30px] w-auto" />
        </a>

        <nav aria-label="Navigation principale" className="hidden lg:block">
          <ul className="flex items-center gap-0.5">
            {nav.links.map((l) => (
              <li key={l.href + l.label}>
                <a
                  href={l.href}
                  className="inline-block px-3.5 py-2 rounded-md text-sm font-medium text-on-dark-soft hover:text-cream-yellow hover:bg-white/5 transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2.5">
          <a href={nav.cta_href} className="hidden lg:inline-flex btn btn-on-dark">
            {nav.cta_label}
          </a>
          <button
            type="button"
            aria-label={open ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden w-10 h-10 rounded-lg bg-white/[0.06] border border-white/10 grid place-items-center hover:bg-white/[0.12] transition-colors"
          >
            {open ? <CloseIcon className="w-5 h-5" /> : <MenuIcon className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {open && (
        <nav
          aria-label="Navigation mobile"
          className="lg:hidden bg-burgundy-deep border-t border-[rgba(202,153,0,0.2)] px-4 pb-4"
        >
          <ul className="flex flex-col">
            {nav.links.map((l) => (
              <li key={l.href + l.label}>
                <a
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="block px-4 py-3.5 text-[15px] text-on-dark-soft border-b border-white/5 last:border-b-0 hover:text-cream-yellow"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
          <a href={nav.cta_href} onClick={() => setOpen(false)} className="btn btn-on-dark w-full mt-3">
            {nav.cta_label}
          </a>
        </nav>
      )}
    </header>
  );
}
