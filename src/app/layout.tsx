import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infrastructura sprc.mta | Proiect SPRC 2025-2026",
  description: "Prezentarea arhitecturii și echipelor proiectului SPRC - Infrastructură de rețea organizațională completă cu servicii de monitorizare, securitate și colaborare.",
  keywords: ["SPRC", "infrastructura", "retea", "OpenStack", "Kubernetes", "monitorizare", "securitate"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
