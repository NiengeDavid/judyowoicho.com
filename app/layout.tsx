import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Oswald } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import { Toaster } from "@/components/ui/sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const geistInter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistOswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "- Judy Owoicho",
    template: "%s - Judy Owoicho",
  },
  description: "Welcome to my world - Judy.",
  openGraph: {
    title: "Judy Owoicho",
    description: "Welcome to my world - Judy.",
    siteName: "Judy Owoicho",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Judy Owoicho",
    description: "Welcome to my world - Judy.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${geistInter.variable} ${geistOswald.variable} antialiased`}
      >
        <Navbar />
        {children}
        <Toaster />
      </body>
    </html>
  );
}
