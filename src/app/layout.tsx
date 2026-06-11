import type { Metadata, Viewport } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { siteMeta } from "@/content/site";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700", "800"],
  variable: "--font-poppins",
  display: "swap",
});
const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-mono-jb",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: siteMeta.title,
  description: siteMeta.description,
  keywords: [...siteMeta.keywords],
  authors: [{ name: siteMeta.author }],
  applicationName: siteMeta.name,
  robots: { index: true, follow: true, maxImagePreview: "large" },
  alternates: { canonical: "/" },
  manifest: "/assets/favicon/site.webmanifest",
  icons: {
    icon: [
      { url: "/assets/favicon/favicon.ico", sizes: "any" },
      { url: "/assets/favicon/favicon.svg", type: "image/svg+xml" },
      { url: "/assets/favicon/favicon-96x96.png", type: "image/png", sizes: "96x96" },
    ],
    apple: "/assets/favicon/apple-touch-icon.png",
  },
  openGraph: {
    type: "website",
    locale: siteMeta.locale,
    url: siteMeta.url,
    siteName: siteMeta.name,
    title: siteMeta.title,
    description: siteMeta.shortDescription,
    images: [{ url: siteMeta.ogImage, alt: "Logo TREMPLIN" }],
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.shortDescription,
    images: [siteMeta.ogImage],
  },
};

export const viewport: Viewport = {
  themeColor: siteMeta.themeColor,
  colorScheme: "light",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EducationalOrganization",
  name: "Cours Prépa TREMPLIN",
  url: siteMeta.url + "/",
  logo: siteMeta.url + siteMeta.ogImage,
  description:
    "Préparation structurée aux concours universitaires malgaches (ENI, EMIT, ENS, ISTE, EGSS, Polytechnique, AGRO).",
  address: [
    {
      "@type": "PostalAddress",
      streetAddress: "Lycée FJKM Rozelina, Antarandolo",
      addressLocality: "Fianarantsoa",
      addressCountry: "MG",
    },
  ],
  telephone: ["+261 34 49 670 43", "+261 33 40 304 54"],
  areaServed: ["Fianarantsoa", "Antananarivo", "Madagascar"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr" className={`${inter.variable} ${poppins.variable} ${jetbrains.variable}`}>
      <body>
        {/* Without JS, reveal-on-scroll elements must still be visible. */}
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
