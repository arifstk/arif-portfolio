// components/CookieConsentBanner.tsx

"use client";
import { useCookieConsent } from "@/context/CookieConsentContext";
import { Cookie } from "lucide-react";

export default function CookieConsentBanner() {
  const { status, accept, reject } = useCookieConsent();

  if (status !== "pending") return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-neutral-900/91 text-white">
      <div className="w-[92%] xl:w-[80%] mx-auto py-1.5 sm:py-3 flex flex-row items-center justify-between gap-2">
        <p className="flex items-center justify-center gap-2 text-xs sm:text-sm text-neutral-300">
          <Cookie className='w-6 h-6' />  This site uses cookies to personalize your site experience.
        </p>
        <div className="flex gap-3 shrink-0">
          <button
            onClick={accept}
            className="px-2 sm:px-4 py-1 text-xs sm:text-sm rounded-xl bg-white text-neutral-900 hover:bg-neutral-200 hover:scale-96 transform transition duration-300 ease-in-out cursor-pointer"
          >
            Accept
          </button>
          <button
            onClick={reject}
            className="px-2 sm:px-4 py-1 text-xs sm:text-sm rounded-xl border border-neutral-600 hover:bg-neutral-800 hover:scale-96 transform transition duration-300 ease-in-out cursor-pointer"
          >
            Reject
          </button>
        </div>
      </div>
    </div>
  );
}


