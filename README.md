# TREMPLIN - site Next.js + Postgres

Réécriture du site TREMPLIN en **Next.js 16 (App Router) + Tailwind CSS v4 + PostgreSQL**, rendue **côté serveur (SSR)** pour un bon référencement Google (contrairement à l'ancien site rendu côté client).

## Architecture

- **Next.js standalone** (image Docker minimale) : rend chaque page en HTML côté serveur.
- **PostgreSQL** via `pg` + SQL simple (pas d'ORM lourd, adapté à un VPS 2 Go).
- **Tailwind v4** (thème de marque dans `src/app/globals.css`).
- **Auth admin** : un compte unique (variables d'env) + session JWT signée (`jose`) en cookie httpOnly, protégée par `middleware.ts`.

### Contenu statique vs base de données

| Statique (code: `src/content/site.ts`) | Base de données (éditable via `/admin`) |
| --- | --- |
| Héro, Programmes/établissements, Méthode, Livre d'Or, À propos, Stats 2025, Footer, métadonnées SEO | Actualités, Prochaine session, Barres de résultats + texte Résultats, Emploi du temps (image), Contact |

Les lectures DB **retombent sur des valeurs par défaut** (`src/db/defaults.ts`) si la base est injoignable: le site s'affiche toujours.

## Structure

```
src/
  app/
    layout.tsx            métadonnées, fonts, JSON-LD
    page.tsx              page d'accueil (SSR, agrège les sections)
    sitemap.ts, robots.ts
    admin/                espace d'administration (login + CRUD)
    globals.css           thème Tailwind + primitives
  components/             sections (Hero, Programs, …) + admin/
  content/site.ts         contenu statique
  db/                     schema.sql, pool, queries, migrate, seed, defaults
  lib/                    auth/session, icons, formatters
  middleware.ts           protège /admin
public/assets/            images, logos, favicons
```

## Variables d'environnement

Voir `.env.production.example`. Clés : `DATABASE_URL` (fournie par Compose), `POSTGRES_PASSWORD`, `SESSION_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD` (ou `ADMIN_PASSWORD_HASH`).

## Développement local

```bash
npm install
# Base Postgres locale (ex. Docker) :
docker run -d --name tremplin-db -e POSTGRES_USER=tremplin -e POSTGRES_PASSWORD=tremplin -e POSTGRES_DB=tremplin -p 5433:5432 postgres:16-alpine
# .env contient déjà DATABASE_URL=...localhost:5433...
npm run db:setup     # crée les tables + données par défaut
npm run dev          # http://localhost:3000  (admin : /admin)
```

## Déploiement (VPS - AWS t3.small)

Le build se fait **sur le VPS** (réseau rapide). La stack Compose : `db` + `migrate` (one-shot) + `app` (Next standalone) + `nginx` (TLS + reverse proxy).

1. Pousser la source et builder :
   ```bash
   bash deploy/deploy.sh        # rsync vers /opt/tremplin-next puis docker compose up -d --build
   ```
2. **Avant le 1er démarrage**, sur le VPS : `cp .env.production.example .env` et remplir les secrets.
3. **TLS** : nginx réutilise le certificat Let's Encrypt existant monté depuis `/etc/letsencrypt` (le domaine est déjà certifié par l'ancien site).

### Cutover (remplacer l'ancien site)

L'ancienne stack (`/opt/tremplin-web`) occupe les ports 80/443. Pour basculer :
```bash
cd /opt/tremplin-web && sudo docker compose -f docker-compose.prod.yml down   # stoppe l'ancien
cd /opt/tremplin-next && sudo docker compose -f docker-compose.prod.yml up -d  # démarre le nouveau
```
Pour revenir en arrière : inverser les deux commandes.

### Migration / seed manuels

```bash
sudo docker compose -f docker-compose.prod.yml run --rm migrate   # rejoue migrate + seed (idempotent)
```

## SEO

- HTML rendu côté serveur (contenu indexable sans exécuter de JS).
- `generateMetadata` (title/description/keywords/OpenGraph/Twitter), `sitemap.xml`, `robots.txt`, JSON-LD `EducationalOrganization`.
- `/admin` est en `noindex` + bloqué dans `robots.txt`.
