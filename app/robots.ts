// app/robots.ts

import { SITE_URL } from "@/lib/seo";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/", "/_next/image",
        disallow: ["/admin", "/api", "/_next/static", "/_next/data"],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
