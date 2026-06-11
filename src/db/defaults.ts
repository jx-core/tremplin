import type { SiteConfig, ResultBar, NewsItem } from "./types";

/* Fallback values used when the database is unreachable or unseeded.
   These mirror the seed so the public site always renders. */

export const defaultSiteConfig: SiteConfig = {
  next_session: {
    label: "Prochaine session",
    edition: "Édition 2026",
    day: "03",
    month: "Août",
    year: "2026",
    blurb: "Début d'une préparation pensée pour les concours universitaires.",
  },
  schedule: {
    image: "",
    edition_label: "Édition 2026, semaine type.",
    footnote:
      "L'emploi du temps est mis à jour à chaque session depuis l'application d'inscription TREMPLIN. La grille ci-dessus est la version officielle publiée pour la promotion en cours.",
  },
  contact: {
    phones: ["034 49 670 43", "033 40 304 54"],
    address_line_1: "Lycée FJKM Rozelina",
    address_line_2: "Antarandolo, Fianarantsoa",
    facebook_url: "",
    facebook_name: "Tremplin",
    email: "",
  },
  results: {
    eyebrow: "Résultats consolidés, édition 2025",
    title: "Trois vagues encadrées, trois taux vérifiables.",
    lead: "Première édition TREMPLIN, centrée sur le concours ENI. Les taux de réussite ci-dessous correspondent au nombre d'étudiants admis par la commission, rapportés au nombre d'étudiants préparés. Ils sont vérifiables sur le portail officiel des admissions de l'École Nationale d'Informatique.",
    footnote:
      "Source : portail officiel des admissions de l'École Nationale d'Informatique, promotion 2025.",
    summary_badges: [
      "254 étudiants admis",
      "89 % de réussite globale",
      "40 % de la promotion Informatique",
    ],
  },
};

export const defaultResultBars: ResultBar[] = [
  { id: -1, name: "Fianarantsoa Vague 1", value: 95.7, sort: 0 },
  { id: -2, name: "Antananarivo Vague 2", value: 90.8, sort: 1 },
  { id: -3, name: "Fianarantsoa Vague 2", value: 86.5, sort: 2 },
];

export const defaultNews: NewsItem[] = [];
