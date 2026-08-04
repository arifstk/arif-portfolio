// app/robots.ts

import { SITE_URL } from "@/lib/seo";
import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
       {
        userAgent: "*",
        allow: [
          "/",
          "/_next/image",
          "/_next/static",        // ✅ CSS/JS/ফন্ট ক্রল করার অনুমতি
          "/_next/static/chunks", // ✅ আরও নির্দিষ্ট
          "/_next/static/media",  // ✅ ফন্ট ফাইলের জন্য
          "/_next/static/css",    // ✅ CSS ফাইলের জন্য
        ],
        disallow: [
          "/admin",
          "/api",
          "/_next/data",          // ✅ শুধু data ব্লক
          "/_next/static/webpack",// ✅ webpack ফাইল ব্লক
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
