import type { Metadata } from "next";
import { DM_Sans, Sora } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const headingFont = Sora({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["600", "700"],
});

const bodyFont = DM_Sans({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Aster Studio",
    template: "%s | Aster Studio",
  },
  description:
    "A modern multi-page Next.js application with dynamic product routing and reusable layout components.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${bodyFont.variable} ${headingFont.variable}`}>
        <div className="site-shell">
          <Header />
          <main className="site-content">{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
