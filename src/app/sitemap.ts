import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteMeta.url + "/",
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
  ];
}
