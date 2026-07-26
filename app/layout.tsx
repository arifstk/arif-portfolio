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
import SmoothScroll from "@/components/Helper/SmoothScroll";

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
  title: "Arif Hossain",
  description: "Portfolio website of Arif",
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
      <body className="min-h-screen flex flex-col">
        <SmoothScroll />
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

