// app/layout.tsx

import type { Metadata } from "next";
import { Inter, Geist, Nunito } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/Hoc/Provider";
import ResponsiveNav from "@/components/Helper/Home/Navbar/ResponsiveNav";
import Footer from "@/components/Footer";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/route";
import { headers } from "next/headers";
import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/seo";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });
const font = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});

// const font = Nunito({
//   weight: ["400", "500", "600", "700", "800", "900"],
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Arif Hossain",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Arif Hossain",
    "Arif Hossain Portfolio",
    "Full-Stack Developer",
    "Next.js Developer",
    "Node.js Developer",
    "Express.js Developer",
    "React Developer",
    "MongoDB Developer",
    "Tailwind CSS Developer",
    "Web Developer Portfolio",
  ],
  authors: [{ name: "Arif Hossain" }],
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
        alt: 'Arif Hossain - Software Developer Portfolio',
        type: 'image/jpg',
      },
      // Additional image as callback
      {
        url: `${SITE_URL}/og-image.jpg`,
        width: 800,
        height: 420,
        alt: 'Arif Hossain Portfolio',
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
    // google-verification-code
    google: 'btnaOk_cok44sK_BnN1Pz-trMY2KiXzEYTLT4L0Uyl8',
  },

  other: {
    // Facebook / WhatsApp / Messenger
    'og:image:type': 'image/jpg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Arif Hossain - Software Developer Portfolio',
    'og:locale': 'en_US',
    'og:updated_time': new Date().toISOString(),

    // LinkedIn / Pinterest
    'og:image:secure_url': `${SITE_URL}/og-image.jpg`,

    // Instagram (via WhatsApp/Facebook)
    'og:type': 'website',

    // Pinterest Specific
    'pinterest': 'nopin',
    // Google Search Console
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

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", font.className, "font-sans", geist.variable)}
    >
      <head>
        {/* ✅ Pinterest Specific */}
        <meta name="pinterest-rich-pin" content="true" />
        {/* ✅ LinkedIn Specific */}
        <meta property="og:image:secure_url" content={`${SITE_URL}/og-image.jpg`} />
        {/* ✅ WhatsApp / Instagram / Messenger */}
        <meta property="og:image:type" content="image/jpg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        {/* ✅ Fallback for all platforms */}
        <meta name="image" content={`${SITE_URL}/og-image.jpg`} />
        {/* ✅ Google verification (backup) */}
        <meta name="google-site-verification" content="btnaOk_cok44sK_BnN1Pz-trMY2KiXzEYTLT4L0Uyl8" />
      </head>

      <body className="min-h-screen flex flex-col">
        <Provider session={session}>
          {isAdmin ? (
            <>{children}</>
          ) : (
            <>
              <ResponsiveNav />
              {/* <main className="w-[94%] xl:w-[80%] mx-auto"> */}
              <main>
                {children}
              </main>
              <Footer />
            </>
          )}
        </Provider>
      </body>
    </html>
  );
}

