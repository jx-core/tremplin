/* =============================================================
   TREMPLIN — static, stable content (rendered server-side).
   This is the content that rarely changes and does NOT need the
   admin/CRUD. Truly dynamic content (news, next session, results,
   schedule, contact) lives in Postgres — see src/db.
   Ported from the legacy website/content.json.
   ============================================================= */

export const siteMeta = {
  name: "TREMPLIN",
  title: "TREMPLIN, préparation aux concours universitaires de Madagascar",
  description:
    "Cours Prépa TREMPLIN. Préparation structurée aux concours universitaires malgaches (ENI, EMIT, ENS, ISTE, EGSS, Polytechnique, AGRO). 254 étudiants admis à l'ENI 2025. Réussir les concours, commencer par TREMPLIN.",
  shortDescription:
    "Préparation structurée aux concours universitaires malgaches. Méthode ciblée, entraînement régulier, encadrement humain. ENI, EMIT, ENS, ISTE, EGSS, Polytechnique, AGRO.",
  keywords: [
    "Tremplin", "Cours Prépa Tremplin", "préparation concours universitaire Madagascar",
    "concours ENI 2026", "ENI Fianarantsoa", "EMIT", "ENS", "ISTE", "EGSS",
    "Polytechnique", "AGRO", "post-bac Madagascar", "orientation post-bac",
    "université de Fianarantsoa", "université d'Antananarivo", "BACC 2026",
    "École Nationale d'Informatique", "École Supérieure Polytechnique",
    "prépa concours", "réussir concours universitaire malgache", "AEENI", "CODEL",
  ],
  author: "Cours Prépa TREMPLIN",
  url: "https://tremplin.stonebase.tech",
  ogImage: "/assets/logo/tremplin-primary.png",
  locale: "fr_FR",
  themeColor: "#571820",
  facebookName: "Tremplin",
  locations: ["Fianarantsoa", "Antananarivo"],
} as const;

export interface NavLink {
  label: string;
  href: string;
}
export const nav = {
  links: [
    { label: "Programmes", href: "#programmes" },
    { label: "Méthode", href: "#methode" },
    { label: "Emploi du temps", href: "#emploi" },
    { label: "Actualités", href: "#actualites" },
    { label: "Résultats", href: "#resultats" },
    { label: "À propos", href: "#apropos" },
  ] as NavLink[],
  cta_label: "Nous contacter",
  cta_href: "#contact",
};

export const hero = {
  eyebrow: "Préparation aux concours universitaires",
  title_main: "Réussir les concours,",
  title_em: "commencer par TREMPLIN.",
  lead:
    "Une préparation pensée pour les concours universitaires malgaches. Méthode ciblée, entraînement régulier, encadrement humain. Comprendre la logique des épreuves de sélection, et s'y entraîner réellement avant le jour J.",
  primary_cta_label: "Découvrir nos programmes",
  primary_cta_href: "#programmes",
  secondary_cta_label: "Voir les résultats 2025",
  secondary_cta_href: "#resultats",
  carousel: [
    "/assets/photos/hero-1.jpg",
    "/assets/photos/hero-2.jpg",
    "/assets/photos/hero-3.jpg",
    "/assets/photos/hero-4.jpg",
  ],
  carousel_interval_ms: 6000,
  aside_note: "Édition 2026, inscriptions ouvertes",
};

export interface StatItem {
  value: string;
  label: string;
  sub: string;
}
export const stats = {
  eyebrow: "Édition 2025, concours ENI",
  title: "Une première édition aux résultats vérifiés.",
  items: [
    { value: "254", label: "Étudiants admis", sub: "Environ 40 % des admis au concours ENI 2025 Informatique sont tous des TREMPLIENS." },
    { value: "89 %", label: "Taux de réussite", sub: "Sur l'ensemble des trois vagues encadrées." },
    { value: "95,7 %", label: "Pic Fianarantsoa Vague 1", sub: "L'importance de commencer tôt. Ne pas attendre les dernières semaines." },
  ] as StatItem[],
};

export interface Establishment {
  acronym: string;
  full: string;
  type: string;
  logo: string;
  logos?: string[];
  cover: string;
  status: "open" | "soon";
  status_label: string;
}
export const programs = {
  eyebrow: "Programmes",
  title: "Une préparation pensée par concours.",
  lead:
    "Chaque concours a sa logique, son rythme, ses épreuves. Les programmes TREMPLIN sont construits par concours, et non autour d'un cursus générique. L'édition 2025 a été centrée sur le concours ENI ; à partir de 2026, l'offre couvre l'ensemble des concours universitaires majeurs.",
  items: [
    { acronym: "ENI", full: "École Nationale d'Informatique", type: "Informatique, technologies de l'information, Sciences de l'ingénieur.", logo: "/assets/establishments/eni.png", cover: "/assets/establishments/covers/eni.jpg", status: "soon", status_label: "Édition 2026" },
    { acronym: "EMIT", full: "École de Management et d'Innovation Technologique", type: "Management, informatique appliquée et science technologique, communication.", logo: "/assets/establishments/emit.png", cover: "/assets/establishments/covers/emit.jpg", status: "soon", status_label: "Préparation 2026" },
    { acronym: "ENS", full: "École Normale Supérieure", type: "Formation des enseignants et cadres de l'éducation.", logo: "/assets/establishments/ens.png", logos: ["/assets/establishments/ens.png", "/assets/establishments/ens-ampefiloha-logo.png"], cover: "/assets/establishments/covers/ens.jpg", status: "soon", status_label: "Préparation 2026" },
    { acronym: "ISTE", full: "Institut des Sciences et Techniques de l'Environnement", type: "Environnement, agronomie, aménagement durable.", logo: "/assets/establishments/iste.png", cover: "/assets/establishments/covers/iste.jpg", status: "soon", status_label: "Préparation 2026" },
    { acronym: "EGSS", full: "Faculté d'Économie, Gestion et Sciences Sociales", type: "Sciences de la société, économie, gestion.", logo: "/assets/establishments/egss.webp", cover: "/assets/establishments/covers/egss.jpg", status: "soon", status_label: "Préparation 2026" },
    { acronym: "POLY (ESPA Vontovorona)", full: "École Supérieure Polytechnique", type: "Sciences de l'ingénieur.", logo: "/assets/establishments/poly.jpg", cover: "/assets/establishments/covers/poly.jpg", status: "soon", status_label: "Préparation 2026" },
    { acronym: "AGRO", full: "École Supérieure des Sciences Agronomiques", type: "Agronomie, forêt, industrie agroalimentaire.", logo: "/assets/establishments/agro.png", cover: "/assets/establishments/covers/agro.jpg", status: "soon", status_label: "Préparation 2026" },
    { acronym: "ESP-Antsiranana", full: "École Supérieure Polytechnique d'Antsiranana", type: "Sciences de l'ingénieur : électronique, informatique industrielle, génie civil, mécanique, électrique, hydraulique, numérique.", logo: "/assets/establishments/esp-antsiranana.png", cover: "/assets/establishments/covers/esp-antsiranana.jpg", status: "soon", status_label: "Préparation 2026" },
  ] as Establishment[],
};

export interface Pillar {
  num: string;
  title: string;
  body: string;
}
export const method = {
  eyebrow: "Notre méthode",
  title: "Quatre piliers pour réussir autrement.",
  lead:
    "Réussir un concours demande plus qu'un bon niveau. Cela demande méthode, rigueur et constance. La préparation TREMPLIN est construite autour de quatre piliers, tenus de la première séance jusqu'au jour de l'épreuve.",
  pillars: [
    { num: "01", title: "Préparation ciblée", body: "Construite selon les attentes de chaque concours et de chaque filière. Pas de programme générique : chaque séance répond à ce qui sera réellement évalué." },
    { num: "02", title: "Méthodologie adaptée", body: "Les épreuves de sélection ne se gagnent pas comme un examen de Bac. Vitesse, précision, gestion du stress se travaillent comme des compétences à part entière." },
    { num: "03", title: "Discipline de progression", body: "Entraînement régulier jusqu'au jour J. Suivi de progression et corrections individualisées, pour transformer l'effort en résultat mesurable." },
    { num: "04", title: "Accompagnement humain", body: "Une équipe qui structure la compréhension et installe les réflexes attendus le jour de l'épreuve. Une présence, pas un cours en ligne." },
  ] as Pillar[],
};

export interface LivrePoint {
  title: string;
  body: string;
}
export const livre = {
  eyebrow: "Le Livre d'Or",
  title: "Le guide de référence, inclus dans chaque préparation.",
  lead:
    "Notre support pédagogique exclusif, édité par filière. Chaque étudiant inscrit le reçoit dans le cadre de sa préparation.",
  image: "/assets/photos/livre.jpg",
  points: [
    { title: "Leçons ciblées", body: "Alignées avec les attentes de chaque concours, ses thèmes récurrents et la structure de ses épreuves." },
    { title: "Sujets et annales", body: "Sélectionnés par filière, accompagnés de corrections détaillées et de grilles d'évaluation." },
    { title: "Fiches méthode & Guide d'orientation", body: "Pour gagner du temps et structurer le raisonnement le jour de l'épreuve." },
    { title: "Édition réservée", body: "Distribuée prioritairement aux étudiants inscrits à la préparation, dans le cadre de leur cursus TREMPLIN." },
  ] as LivrePoint[],
};

export interface TriadItem {
  title: string;
  body: string;
}
export const about = {
  eyebrow: "Pourquoi TREMPLIN",
  title: "Comprendre. Préparer. Réussir.",
  lead:
    "Le Baccalauréat et les concours universitaires ne mesurent pas les mêmes choses. TREMPLIN existe pour combler ce qui sépare les deux : la logique des épreuves de sélection, la méthode, et l'entraînement encadré jusqu'au jour J.",
  image: "/assets/photos/about.jpg",
  caption:
    "Réussir un concours demande plus qu'un bon niveau. Cela demande méthode, rigueur et constance.",
  triad: [
    { title: "Comprendre", body: "La logique propre à chaque concours, ses attentes, sa façon d'évaluer." },
    { title: "Préparer", body: "Avec méthode, rigueur, et un rythme tenu jusqu'au jour de l'épreuve." },
    { title: "Réussir", body: "Décrocher sa place dans la filière visée. C'est la finalité." },
  ] as TriadItem[],
};

export interface FooterGroup {
  title: string;
  links: NavLink[];
}
export const footer = {
  tagline:
    "Réussir les concours universitaires malgaches commence par une préparation pensée pour cela.",
  slogan: "Comprendre. Préparer. Réussir.",
  groups: [
    {
      title: "Programmes",
      links: [
        { label: "ENI", href: "#programmes" },
        { label: "EMIT", href: "#programmes" },
        { label: "ENS", href: "#programmes" },
        { label: "ISTE", href: "#programmes" },
        { label: "EGSS", href: "#programmes" },
        { label: "ESPA-Vontovorona", href: "#programmes" },
        { label: "AGRO", href: "#programmes" },
        { label: "ESP-Antsiranana", href: "#programmes" },
      ],
    },
    {
      title: "Le projet",
      links: [
        { label: "À propos", href: "#apropos" },
        { label: "Notre méthode", href: "#methode" },
        { label: "Le Livre d'Or", href: "#livre" },
        { label: "Résultats 2025", href: "#resultats" },
        { label: "Actualités", href: "#actualites" },
        { label: "Emploi du temps", href: "#emploi" },
      ],
    },
  ] as FooterGroup[],
  copyright: "Cours Prépa TREMPLIN. Tous droits réservés.",
};

export const contactCopy = {
  eyebrow: "Inscriptions pour l'Édition 2026 ouvertes",
  title: "Préparez votre concours avec nous.",
  lead:
    "Tous les programmes . Places limitées par vague. Contactez-nous pour vous inscrire ou rejoindre la liste d'attente.",
  primary_label: "Nous écrire sur Facebook",
  secondary_label: "Envoyer un e-mail",
};

export const newsCopy = {
  eyebrow: "Actualités des concours",
  title: "Annonces officielles et informations utiles.",
  lead:
    "Les publications utiles des écoles concernées, reprises et synthétisées ici. Chaque actualité renvoie à sa source officielle.",
  empty_label: "Aucune actualité publiée pour le moment.",
};

export const scheduleCopy = {
  eyebrow: "Emploi du temps",
  title: "Semaine type de préparation.",
  lead:
    "Rythme hebdomadaire publié pour la promotion en cours. La grille définitive est confirmée à l'inscription.",
};

export const resultsCopy = {
  eyebrow_fallback: "Résultats consolidés, édition 2025",
  title_fallback: "Trois vagues encadrées, trois taux vérifiables.",
};
