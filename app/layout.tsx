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


// const getCurrentTimestamp = () => new Date().toISOString();

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
  // ✅ others social media
  other: {
    // 'og:image': `${SITE_URL}/og-image.jpg?t=${Date.now()}`,
    // 'og:image:secure_url': `${SITE_URL}/og-image.jpg?t=${Date.now()}`,
    // 'og:image:type': 'image/jpeg',
    // 'og:image:width': '1200',
    // 'og:image:height': '630',
    // 'og:image:alt': 'Shaikh Arif | Software Developer Portfolio',
    'og:updated_time': new Date().toISOString(),
    'og:locale': 'en_US',
    'pinterest': 'nopin',
    'format-detection': 'telephone=no',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const session = await getServerSession(authOptions);
  const headersList = await headers();
  const pathname = headersList.get("x-pathname") ?? "";
  const isAdmin = pathname.startsWith("/admin");

  // ✅ dynamic timestamp
  // const timestamp = Date.now();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full antialiased", font.className, geist.variable, kalam.variable)}
    >
      <head>
        {/* ✅ Pinterest */}
        <meta name="pinterest-rich-pin" content="true" />

        {/* ✅ LinkedIn */}
        {/* <meta property="og:image:secure_url" content={`${SITE_URL}/og-image.jpg?t=${timestamp}`} /> */}

        {/* ✅ WhatsApp / Instagram / Messenger */}
        {/* <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Shaikh Arif | Software Developer Portfolio" /> */}

        {/* ✅ dynamic  og:image  */}
        {/* <meta property="og:image" content={`${SITE_URL}/og-image.jpg?t=${timestamp}`} /> */}

        {/* ✅ og:updated_time */}
        <meta property="og:updated_time" content={new Date().toISOString()} />

        {/* ✅ Fallback */}
        {/* <meta name="image" content={`${SITE_URL}/og-image.jpg?t=${timestamp}`} /> */}

        {/* ✅ Google verification */}
        <meta name="google-site-verification" content="btnaOk_cok44sK_BnN1Pz-trMY2KiXzEYTLT4L0Uyl8" />
      </head>

      <body className="min-h-screen flex flex-col bg-violet-50/60 dark:bg-transparent font-sans">
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
      </body>
    </html>
  );
}


// // Cookies & Google Analytics setup
// // create file CookieConsentContext.tsx in context folder
// // create file CookieConsentBanner.tsx in components folder
// // create file GoogleAnalytics.tsx in components folder
// // create file GAPageTracker.tsx in components folder
// // intigreat all these files in layout.tsx




