import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: "Commerce Studio | Lab 11",
  description: "A premium MERN ecommerce web application for Lab 11.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <div className="page-shell">
          <Navbar />
          {children}
        </div>
      </body>
    </html>
  );
}
