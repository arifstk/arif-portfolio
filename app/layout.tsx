import type { Metadata } from "next";
import { Inter, Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Provider from "@/components/Hoc/Provider";
import ResponsiveNav from "@/components/Helper/Home/Navbar/ResponsiveNav";

const geist = Geist({ subsets: ['latin'], variable: '--font-sans' });

const font = Inter({
  weight: ["400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Arif Portfolio",
  description: "Portfolio website of Arif",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en" suppressHydrationWarning
      className={cn("h-full", "antialiased", font.className, "font-sans", geist.variable)}
    >
      <body className="min-h-full flex flex-col ">
        <Provider>
          <ResponsiveNav />
          {children}
          FOOTER
        </Provider>
      </body>
    </html>
  );
}
