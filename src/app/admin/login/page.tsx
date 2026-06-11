"use client";
import { useActionState } from "react";
import { loginAction } from "@/app/admin/actions";

const initial: { error?: string } = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(loginAction, initial);

  return (
    <div className="min-h-screen flex items-center justify-center px-5">
      <div className="w-full max-w-[380px]">
        <div className="text-center mb-7">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/assets/logo/tremplin-primary.png" alt="TREMPLIN" className="h-9 mx-auto mb-4" />
          <h1 className="font-display font-semibold text-2xl text-burgundy-deep">Administration</h1>
          <p className="text-sm text-ink-soft mt-1">Connectez-vous pour gérer le contenu.</p>
        </div>

        <form action={formAction} className="adm-card flex flex-col gap-4">
          <div>
            <label className="adm-label" htmlFor="username">Identifiant</label>
            <input id="username" name="username" className="adm-input" autoComplete="username" required />
          </div>
          <div>
            <label className="adm-label" htmlFor="password">Mot de passe</label>
            <input
              id="password"
              name="password"
              type="password"
              className="adm-input"
              autoComplete="current-password"
              required
            />
          </div>
          {state.error && <p className="text-[13px] text-burgundy font-medium">{state.error}</p>}
          <button type="submit" className="adm-btn w-full" disabled={pending}>
            {pending ? "Connexion…" : "Se connecter"}
          </button>
        </form>
      </div>
    </div>
  );
}
