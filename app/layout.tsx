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


const getCurrentTimestamp = () => new Date().toISOString();

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: SITE_NAME,
    template: "%s | Shaikh Arif",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "Shaikh Arif",
    "Arif Hossain",
    "Shaikh Arif Developer",
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
        url: `${SITE_URL}/og-image.jpg?t=${Date.now()}`, // URL with timestamp
        width: 1200,
        height: 630,
        alt: 'Shaikh Arif | Software Developer Portfolio',
        type: 'image/jpeg',
      },
      {
        url: `${SITE_URL}/og-image.jpg?t=${Date.now()}`,
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
    images: [`${SITE_URL}/og-image.jpg?t=${Date.now()}`],
  },
  verification: {
    google: 'btnaOk_cok44sK_BnN1Pz-trMY2KiXzEYTLT4L0Uyl8',
  },
  // ✅ others social media
  other: {
    'og:image': `${SITE_URL}/og-image.jpg?t=${Date.now()}`,
    'og:image:secure_url': `${SITE_URL}/og-image.jpg?t=${Date.now()}`,
    'og:image:type': 'image/jpeg',
    'og:image:width': '1200',
    'og:image:height': '630',
    'og:image:alt': 'Shaikh Arif | Software Developer Portfolio',
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
  const timestamp = Date.now();

  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("h-full", "antialiased", font.className, "font-sans", geist.variable)}
    >
      <head>
        {/* ✅ Pinterest */}
        <meta name="pinterest-rich-pin" content="true" />

        {/* ✅ LinkedIn */}
        <meta property="og:image:secure_url" content={`${SITE_URL}/og-image.jpg?t=${timestamp}`} />

        {/* ✅ WhatsApp / Instagram / Messenger */}
        <meta property="og:image:type" content="image/jpeg" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="Shaikh Arif | Software Developer Portfolio" />

        {/* ✅ dynamic  og:image  */}
        <meta property="og:image" content={`${SITE_URL}/og-image.jpg?t=${timestamp}`} />

        {/* ✅ og:updated_time */}
        <meta property="og:updated_time" content={new Date().toISOString()} />

        {/* ✅ Fallback */}
        <meta name="image" content={`${SITE_URL}/og-image.jpg?t=${timestamp}`} />

        {/* ✅ Google verification */}
        <meta name="google-site-verification" content="btnaOk_cok44sK_BnN1Pz-trMY2KiXzEYTLT4L0Uyl8" />
      </head>

      <body className="min-h-screen flex flex-col bg-violet-50/60 dark:bg-transparent">
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

