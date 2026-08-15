// app/robots.ts

import { SITE_URL } from "@/lib/seo";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "Google-InspectionTool",
        allow: "/",
      },
      {
        userAgent: "Chrome-Lighthouse",
        allow: "/",
      },
      {
        userAgent: "*",
        allow: [
          "/",
          "/_next/image",
          "/_next/static",
          "/_next/static/chunks",
          "/_next/static/media",
          "/_next/static/css",
          "/api/socials",
        ],
        disallow: [
          "/admin",
          "/api/admin",
          "/api/auth",
          "/_next/data",
          "/_next/static/webpack",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
