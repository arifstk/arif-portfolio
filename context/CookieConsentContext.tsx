// context/CookieConsentContext.tsx
"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

type ConsentStatus = "pending" | "accepted" | "rejected";

interface CookieConsentContextType {
  status: ConsentStatus;
  accept: () => void;
  reject: () => void;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(undefined);

const STORAGE_KEY = "cookie_consent";

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [status, setStatus] = useState<ConsentStatus>("pending");

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY) as ConsentStatus | null;
    if (stored === "accepted" || stored === "rejected") {
      setStatus(stored);
    }
  }, []);

  const accept = () => {
    localStorage.setItem(STORAGE_KEY, "accepted");
    setStatus("accepted");
  };

  const reject = () => {
    localStorage.setItem(STORAGE_KEY, "rejected");
    setStatus("rejected");
  };

  return (
    <CookieConsentContext.Provider value={{ status, accept, reject }}>
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const ctx = useContext(CookieConsentContext);
  if (!ctx) throw new Error("useCookieConsent must be used within CookieConsentProvider");
  return ctx;
}

