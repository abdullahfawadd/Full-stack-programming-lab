import type { Metadata } from "next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import "./globals.css";

const headingFont = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

const bodyFont = Manrope({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "Lab 08 Dashboard",
    template: "%s | Lab 08 Dashboard",
  },
  description:
    "Professional Next.js lab project with dashboard-first flow, multi-page task navigation, and dynamic product routing.",
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
