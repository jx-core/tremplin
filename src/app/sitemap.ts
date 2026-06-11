import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site";
import { establishmentSlugs } from "@/content/establishments";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: siteMeta.url + "/", lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...establishmentSlugs.map((slug) => ({
      url: `${siteMeta.url}/etablissements/${slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
