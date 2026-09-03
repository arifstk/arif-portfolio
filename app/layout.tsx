// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Geist, Kalam } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/Hoc/Provider";
import ResponsiveNav from "@/components/Helper/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";
import { CookieConsentProvider } from "@/context/CookieConsentContext";
import GoogleAnalytics from "@/components/GoogleAnalytics";
import GAPageTracker from "@/components/GAPageTracker";
import CookieConsentBanner from "@/components/CookieConsentBanner";
import { headers } from "next/headers";
import { Suspense } from "react";

const geist = Geist({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap'
});

const font = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  display: 'swap',
});

const kalam = Kalam({
  weight: "400",
  subsets: ["latin"],
  display: "swap",
  variable: "--font-kalam",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Shaikh Arif",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Shaikh Arif",
    "Arif Shaikh",
    "Arif Hossain",
    "Shaikh Arif Hossain",
    "Shaikh Arif Developer",
    "Shaikh Arif Full Stack Developer",
    "Shaikh Arif Full Stack Web Developer",
    "Shaikh Arif Portfolio",
    "Full-Stack Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Express.js Developer",
    "React Developer",
    "MongoDB Developer",
    "Tailwind CSS Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Shaikh Arif" }],
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 1200,
        height: 630,
        alt: 'Shaikh Arif | Software Developer Portfolio',
        type: 'image/jpeg',
      },
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 800,
        height: 420,
        alt: 'Shaikh Arif | Software Developer Portfolio',
        type: 'image/jpeg',
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_NAME,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.jpg`],
  },
  verification: {
    google: 'btnaOk_cok44sK_BnN1Pz-trMY2KiXzEYTLT4L0Uyl8',
  },
  other: {
    'og:locale': 'en_US',
    'pinterest': 'nopin',
    'format-detection': 'telephone=no',
  },
};

// Isolated component for dynamic request context
async function MainContent({ children }: { children: React.ReactNode }) {
  const session = await getServerSession(authOptions);
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  return (
    <Provider session={session}>
      <CookieConsentProvider>
        {isAdmin ? (
          <>{children}</>
        ) : (
          <>
            <ResponsiveNav />
            <main>
              {children}
            </main>
            <Footer />
          </>
        )}
        <GoogleAnalytics />
        <GAPageTracker />
        <CookieConsentBanner />
      </CookieConsentProvider>
    </Provider>
  );
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", font.className, geist.variable, kalam.variable)}
    >
      <head>
        {/* ✅ Pinterest */}
        <meta name="pinterest-rich-pin" content="true" />

        {/* ✅ Google verification */}
        <meta name="google-site-verification" content="btnaOk_cok44sK_BnN1Pz-trMY2KiXzEYTLT4L0Uyl8" />
      </head>

      <body className="min-h-screen flex flex-col bg-violet-50/60 dark:bg-transparent font-sans">
        <Suspense fallback={<div className="min-h-screen flex flex-col bg-violet-50/60 dark:bg-transparent" />}>
          <MainContent>{children}</MainContent>
        </Suspense>
      </body>
    </html>
  );
}

// Cookies & Google Analytics setup
// create file CookieConsentContext.tsx in context folder
// create file CookieConsentBanner.tsx in components folder
// create file GoogleAnalytics.tsx in components folder
// create file GAPageTracker.tsx in components folder
// intigreat all these files in layout.tsx
