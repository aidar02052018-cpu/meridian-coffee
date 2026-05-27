import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "МЕРИДИАН — спешелти-кофе с координатами",
    template: "%s | МЕРИДИАН",
  },
  description:
    "Каждое зерно знает откуда оно. Подписка на свежеобжаренное спешелти от обжарочной МЕРИДИАН.",
  openGraph: {
    title: "МЕРИДИАН — спешелти-кофе с координатами",
    description:
      "Каждое зерно знает откуда оно. Подписка на свежее зерно.",
    type: "website",
    locale: "ru_RU",
    siteName: "МЕРИДИАН",
  },
  twitter: {
    card: "summary_large_image",
    title: "МЕРИДИАН — спешелти-кофе с координатами",
    description: "Каждое зерно знает откуда оно.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-night text-parchment">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
