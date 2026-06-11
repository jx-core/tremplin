import type { MetadataRoute } from "next";
import { siteMeta } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: "/admin" }],
    sitemap: siteMeta.url + "/sitemap.xml",
    host: siteMeta.url,
  };
}
