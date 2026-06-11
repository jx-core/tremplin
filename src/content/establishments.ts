/* =============================================================
   Per-establishment detail content for the /etablissements/[slug] pages.
   Only the establishments TREMPLIN prepares for. Sources:
     - Fianarantsoa establishments  -> UF/Data-establishements-university-fianarantsoa.md
     - Antananarivo establishments  -> UA/ folder (authoritative, corrected)
     - ESP Antsiranana              -> UA/ESP_Antsiranana_Fiche_Etablissement.md
   Cover / acronym / full name / type / logos come from `programs` in site.ts
   (single source of truth); this file adds the rich campus detail.
   ============================================================= */
import { programs, type Establishment } from "./site";

export interface Mention {
  title: string;
  note?: string;
  parcours?: string[];
}

export interface Campus {
  /** Shown only when an establishment has more than one campus (e.g. ENS). */
  label?: string;
  university: string;
  location?: string;
  founded?: string;
  system?: string;
  admission: string[];
  mentions: Mention[];
  diplomas?: string[];
  debouches?: string[];
  contact?: { phone?: string; email?: string; website?: string };
}

export interface EstablishmentDetail {
  short: string; // concise acronym for headings (e.g. "ESPA")
  tagline: string;
  intro: string;
  campuses: Campus[];
}

/** Card acronym -> URL slug. */
const SLUGS: Record<string, string> = {
  ENI: "eni",
  EMIT: "emit",
  ENS: "ens",
  ISTE: "iste",
  EGSS: "egss",
  "POLYTECH Vontovorona": "espa",
  AGRO: "agro",
  "ESP-Antsiranana": "esp-antsiranana",
};

export const establishmentDetails: Record<string, EstablishmentDetail> = {
  eni: {
    short: "ENI",
    tagline: "L'école d'ingénieurs informatiques de référence à Madagascar.",
    intro:
      "L'École Nationale d'Informatique forme, par voie de concours national, les ingénieurs et experts du numérique malgache : génie logiciel, systèmes et réseaux, données et intelligence artificielle.",
    campuses: [
      {
        university: "Université de Fianarantsoa",
        location: "Quartier de Tanambao-Antaninarenina, Fianarantsoa.",
        system: "Système LMD (Licence–Master–Doctorat).",
        admission: [
          "Informatique & IA — Concours national. Baccalauréats séries C, D, S ou Technique (Industrielle / Génie Civil).",
          "Expertise Digitale — Concours national. Baccalauréats de toutes séries.",
        ],
        mentions: [
          { title: "Informatique", note: "Tronc commun en L1 et L2", parcours: ["Génie Logiciel et Base de Données (GB)", "Administration des Systèmes et Réseaux (SR)", "Informatique Générale (IG)"] },
          { title: "Expertise Digitale", note: "Formation à distance et hybride", parcours: ["Métiers du Digital (MDi) — Licence", "Audit des Systèmes d'Informations (ASI) — Master"] },
          { title: "Intelligence Artificielle (IA)", note: "Niveau Master uniquement", parcours: ["Gouvernance et Ingénierie de Données (GID)", "Objets Connectés et Cyber Sécurité (OCC)"] },
        ],
      },
    ],
  },

  emit: {
    short: "EMIT",
    tagline: "Management, informatique appliquée et communication.",
    intro:
      "L'École de Management et d'Innovation Technologique croise trois mondes — gestion, informatique et communication — pour former des profils hybrides recrutés sur concours d'entrée.",
    campuses: [
      {
        university: "Université de Fianarantsoa",
        system: "Système LMD.",
        admission: [
          "Concours d'entrée.",
          "Management & Communication — Baccalauréat toutes séries (A, C, D) ou technique G1/G2.",
          "Informatique — Baccalauréat séries C, D, S ou technique industriel.",
        ],
        mentions: [
          { title: "Management", parcours: ["Administration Économique et Sociale (AES)", "Management Décisionnel (MD)", "Management d'Entreprises et Développement des Affaires (MEDA)"] },
          { title: "Informatique", parcours: ["Développement d'Application Internet/Intranet (DA2I)", "Conception, Intégration et Gestion des Systèmes d'Information (CIGSI)", "Système d'Information, Géomatique et Décision (SIGD)", "Modélisation et Ingénierie Informatique (M2I)", "Sciences des Données et Intelligence Artificielle (SDIA)"] },
          { title: "Information, Communication et Multimédia", parcours: ["Communication Multimédia (CM)", "Relations Publiques et Communication Organisationnelle (RPCO)", "Communications et Médias Numériques (CMN)", "Relations Publiques et Communications (RPC)", "Communication Numérique et Management de Projet (CNMP)"] },
        ],
      },
    ],
  },

  ens: {
    short: "ENS",
    tagline: "Former les enseignants et les cadres de l'éducation.",
    intro:
      "L'École Normale Supérieure recrute sur concours national (écrit et oral) les futurs professeurs et encadreurs de l'éducation. TREMPLIN prépare aux deux ENS : Fianarantsoa et Antananarivo (Ampefiloha).",
    campuses: [
      {
        label: "ENS Fianarantsoa",
        university: "Université de Fianarantsoa",
        system: "Système LMD.",
        admission: [
          "Concours d'entrée (écrit et oral).",
          "Filières scientifiques — Baccalauréat séries C, D ou S.",
          "Sciences de l'éducation — Baccalauréat de toutes séries.",
        ],
        mentions: [
          { title: "Mathématiques", parcours: ["LAPEN Mathématiques (Licence)", "MAPEN Mathématiques (Master)"] },
          { title: "Physique-Chimie", parcours: ["LAPEN Physique-Chimie (Licence)", "MAPEN Physique-Chimie (Master)"] },
          { title: "Sciences de l'Éducation", parcours: ["Éducation Générale", "Éducation Préscolaire", "Éducation et Formation d'Adultes et Développement (MFD)", "Recherche en Éducation et Formation d'Adultes (MRFA)"] },
        ],
      },
      {
        label: "ENS Antananarivo (Ampefiloha)",
        university: "Université d'Antananarivo",
        location: "Complexe scolaire Ampefiloha, B.P. 881, Antananarivo.",
        founded: "Créée en 1980 ; formalisée par le Décret n°93-394 du 20 juillet 1993.",
        system: "LMD + Certificat d'aptitude à l'enseignement (CAP/CAPE) par discipline.",
        admission: [
          "Concours national (écrit et oral). Être titulaire du baccalauréat et avoir moins de 25 ans.",
          "Littéraire (Langues, Philosophie, HGEC) — séries A, L.",
          "Scientifique (Maths, Physique-Chimie, SVT) — séries C, D, S.",
          "Sportive (APSA) — toutes séries (conditions physiques : 1,55 m candidates / 1,60 m candidats).",
        ],
        mentions: [
          { title: "Filières littéraires", parcours: ["Malgache", "Français", "Anglais", "Philosophie"] },
          { title: "Histoire-Géographie-Éducation à la Citoyenneté", note: "Mention EAD-HGEC" },
          { title: "Filières scientifiques", parcours: ["Mathématiques", "Physique-Chimie", "Sciences de la Vie et de la Terre (SVT)"] },
          { title: "Activités Physiques Sportives et Artistiques (APSA)" },
          { title: "Administration de l'Éducation (ADMED)" },
        ],
        debouches: ["Professeur certifié de collège/lycée", "Enseignement supérieur (après doctorat)", "Inspecteur / conseiller pédagogique", "Direction d'établissement, cadre du Ministère de l'Éducation", "Recherche en sciences de l'éducation"],
        contact: { phone: "+261 34 11 654 49", email: "ens.antananarivo@gmail.com", website: "ens.univ-antananarivo.mg" },
      },
    ],
  },

  iste: {
    short: "ISTE",
    tagline: "Environnement, agronomie et aménagement durable.",
    intro:
      "L'Institut des Sciences et Techniques de l'Environnement forme, sur sélection de dossier, aux métiers de l'agronomie, de l'environnement et de l'aménagement écologique.",
    campuses: [
      {
        university: "Université de Fianarantsoa",
        system: "Système LMD.",
        admission: ["Sélection sur dossier. Accessible aux Baccalauréats séries C, D, S ou équivalents techniques/agricoles."],
        mentions: [
          { title: "Agronomie", parcours: ["Industrie Agro-alimentaire et Biotechnologique", "Production Animale", "Production Végétale"] },
          { title: "Environnement", parcours: ["Gestion des Bassins Versants, des Bas-Fonds et Assainissement (GBV)", "Conservation et Valorisation de la Biodiversité (CVB)", "Information, Éducation et Communication Environnementales (IECE)"] },
          { title: "Technologie", parcours: ["Architecture Écologique (AE)", "Bâtiment Écologique (BTPE)", "Géomètre et Topographe d'Aménagement Écologique (TAE)"] },
          { title: "Tourisme Management", note: "Écotourisme" },
        ],
      },
    ],
  },

  egss: {
    short: "EGSS",
    tagline: "Économie, gestion et sciences sociales.",
    intro:
      "La Faculté EGSS-MCI forme aux sciences de la société et au commerce international : économie, gestion, et sciences sociales appliquées.",
    campuses: [
      {
        university: "Université de Fianarantsoa",
        system: "Système LMD.",
        admission: [
          "Concours d'entrée ou sélection sur dossier.",
          "Économie-Gestion — Baccalauréat séries A2, G1, G2 ou G3.",
          "Sciences Sociales — Baccalauréat séries L, A1, A2, C, D, G1 ou G2.",
        ],
        mentions: [
          { title: "Économie-Gestion", parcours: ["Économie", "Gestion et Management des Entreprises", "Finance et Comptabilité (Master)", "Entrepreneuriat (Master)"] },
          { title: "Sciences Sociales", parcours: ["Socio-Économie", "Socio-Environnement", "Sociopolitique", "Ingénierie Sociale (Master)"] },
        ],
      },
    ],
  },

  espa: {
    short: "ESPA",
    tagline: "L'ingénierie d'excellence à Vontovorona.",
    intro:
      "L'École Supérieure Polytechnique d'Antananarivo forme des ingénieurs polytechniciens (Bac+5) sur concours national. Seize mentions réparties en quatre pôles couvrant toutes les sciences de l'ingénieur.",
    campuses: [
      {
        university: "Université d'Antananarivo",
        location: "Campus de Vontovorona, ~26 km à l'ouest d'Antananarivo (RN1).",
        founded: "En activité depuis 1973 ; dénomination fixée par le Décret n°91-148 du 26 mars 1991.",
        system: "Diplôme d'ingénieur (grade Master) en 5 ans après le baccalauréat, système LMD.",
        admission: [
          "Concours national écrit.",
          "Baccalauréats séries C, D, S, Technique Industriel ou Technique Génie Civil.",
          "Droits de concours : 50 000 Ar.",
        ],
        mentions: [
          { title: "Pôle Génie des Procédés Industriels (GPI)", parcours: ["Génie des Procédés Chimiques et Industriels (GPCI)", "Sciences et Ingénierie des Matériaux (SIM)", "Génie Électrique (GE)", "Génie Mécanique et Industriel (GMI)", "Génie Rural (GR)"] },
          { title: "Pôle Génie Civil (GC)", parcours: ["Bâtiments et Travaux Publics (BTP)", "Urbanisme, Architecture et Génie Civil (UAGC)", "Hydraulique (HYD)", "Information Géographique et Aménagement du Territoire (IGAT)"] },
          { title: "Pôle Génie des Sciences et Technologies Industrielles (GSTI)", parcours: ["Électronique (EN)", "Télécommunication (TCO)", "Météorologie (MTO)", "Ingénierie des Systèmes Avancés (ISA)"] },
          { title: "Pôle Génie des Sciences de la Terre (GST)", parcours: ["Génie Géologique (GGEO)", "Ingénierie Minière (IMIN)", "Ingénierie Pétrolière (IPE)"] },
        ],
        diplomas: ["Ingénieur polytechnicien (grade Master, Bac+5)", "Licence ès Sciences Techniques (Bac+3)", "Masters spécialisés et professionnels", "DEA et Doctorat"],
        debouches: ["BTP et géotechnique", "Énergie et industrie", "Mines, pétrole et géologie", "Numérique et télécoms", "Eau et environnement", "Génie rural", "Bureaux d'études et ingénierie-conseil"],
        contact: { phone: "+261 34 71 174 26", email: "espa.tana@gmail.com", website: "espa-tana.mg" },
      },
    ],
  },

  agro: {
    short: "ESSA",
    tagline: "L'excellence au service du développement.",
    intro:
      "L'École Supérieure des Sciences Agronomiques forme des ingénieurs agronomes (Bac+5) sur concours, au service du développement rural et agro-industriel de Madagascar.",
    campuses: [
      {
        university: "Université d'Antananarivo",
        location: "Campus d'Ankatso, Ambohitsaina, B.P. 175, Antananarivo 101.",
        system: "Ingénieur agronome en 5 ans (grade Master 2), système LMD.",
        admission: [
          "Concours d'entrée en deux groupes : épreuves de connaissances scientifiques, puis épreuves pratiques, test psychotechnique et entretien.",
          "Baccalauréats séries C, D ou Technique Agricole.",
        ],
        mentions: [
          { title: "Licence — Sciences Agronomiques et Environnementales (SAE)", note: "Tronc commun ; spécialisation au S6", parcours: ["Agriculture Tropicale et Développement Durable (AT2D)", "Agro-Management", "Foresterie et Environnement (FE)", "Industries Agricoles et Alimentaires (IAA)", "Sciences Animales (SA)"] },
          { title: "Master — 6 mentions", parcours: ["Agriculture Tropicale et Développement Durable (AT2D)", "Foresterie et Environnement (ESSA-Forêts)", "Industries Agricoles et Alimentaires (IAA)", "Sciences Animales (Ruminants / Monogastriques)", "Agro-Management", "Agroécologie, Biodiversité et Changement Climatique (ABC)"] },
        ],
        debouches: ["Ingénieur agronome, conseiller agricole, chef de projet rural", "Industrie agroalimentaire (production, qualité)", "Gestion des ressources naturelles (forêts, eau)", "Recherche et enseignement", "Institutions et ONG de développement", "Secteur public (Agriculture, Environnement, Eau)"],
        contact: { phone: "+261 20 24 393 53", email: "contact@essagro.mg", website: "essagro.mg" },
      },
    ],
  },

  "esp-antsiranana": {
    short: "ESP Antsiranana",
    tagline: "La polyvalence par excellence.",
    intro:
      "L'École Supérieure Polytechnique d'Antsiranana forme des ingénieurs sur concours, dans huit mentions couvrant les grands domaines des sciences de l'ingénieur. Première année en tronc commun, spécialisation dès la deuxième année.",
    campuses: [
      {
        university: "Université Nord d'Antsiranana (UNA)",
        location: "Lazaret CUR, Antsiranana 201.",
        founded: "Fondée en 1976 dans le cadre de la décentralisation universitaire.",
        system: "Tronc Commun Industriel (TCI) en 1ère année, puis spécialisation. Système LMD.",
        admission: [
          "Concours d'entrée — 300 places par promotion.",
          "Baccalauréats séries C, D, S, Technique Industriel, Technique Génie Civil ou Technique Agricole.",
          "Avoir moins de 25 ans à la date du concours.",
        ],
        mentions: [
          { title: "Science et Technologie de l'Information et de la Communication (STIC)", parcours: ["Électronique et Informatique Industrielles (EII)", "Télécommunications et Réseaux (TR)"] },
          { title: "Génie Civil (GC)", parcours: ["Bâtiment (BAT)", "Travaux Publics et Aménagements (TPA)"] },
          { title: "Génie Mécanique (GM)", parcours: ["Mécanique Industrielle (MI)", "Mécatronique (MO)", "Matériaux (MX)"] },
          { title: "Génie Électrique (GE)", parcours: ["Machines Électriques (MAE)", "Réseaux Électriques (PTDE)"] },
          { title: "Hydraulique et Énergétique (HE)", parcours: ["Énergies Renouvelables (ENR)", "Hydraulique Industrielle et Thermique (HIT)", "Hydraulique, Ouvrages et Environnement (HOE)"] },
          { title: "Génie Électrique et Technologique (GET)" },
          { title: "Technologie Numérique et Communication (TNC)" },
          { title: "Génie Mécanique et Hydraulique (GMH)" },
        ],
        debouches: ["BTP et aménagement", "Énergie et électricité", "Mécanique et industrie", "Numérique et télécoms", "Hydraulique et environnement"],
        contact: { phone: "+261 32 98 089 95", email: "secretariat.direction@espantsiranana.mg", website: "espantsiranana.mg" },
      },
    ],
  },
};

export const establishmentSlugs = Object.keys(establishmentDetails);

export function slugForAcronym(acronym: string): string | undefined {
  return SLUGS[acronym];
}

/** The card/program record (cover, full name, type, logos) for a given slug. */
export function programForSlug(slug: string): Establishment | undefined {
  const acronym = (Object.keys(SLUGS) as string[]).find((a) => SLUGS[a] === slug);
  return acronym ? programs.items.find((p) => p.acronym === acronym) : undefined;
}

export function getEstablishment(slug: string) {
  const detail = establishmentDetails[slug];
  const program = programForSlug(slug);
  if (!detail || !program) return null;
  return { slug, detail, program };
}
