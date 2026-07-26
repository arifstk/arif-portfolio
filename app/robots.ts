// app/robots.ts

import { SITE_URL } from "@/lib/seo";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/admin", "/api", "/_next", "/server-sitemap.xml"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
