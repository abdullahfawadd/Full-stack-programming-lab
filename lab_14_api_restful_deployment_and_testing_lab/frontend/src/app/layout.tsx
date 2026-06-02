import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lab 14 API Testing Dashboard",
  description: "No-key REST API dashboard for weather forecasts and news headlines.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
