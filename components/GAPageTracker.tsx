// components/GAPageTracker.tsx
"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { useCookieConsent } from "@/context/CookieConsentContext";

declare global {
  interface Window {
    gtag: (...args: any[]) => void;
  }
}

export default function GAPageTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { status } = useCookieConsent();

  useEffect(() => {
    if (status !== "accepted" || typeof window.gtag !== "function") return;
    const url = pathname + (searchParams.toString() ? `?${searchParams.toString()}` : "");
    window.gtag("event", "page_view", { page_path: url });
  }, [pathname, searchParams, status]);

  return null;
}

