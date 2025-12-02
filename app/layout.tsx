import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Navigation from "@/components/Navigation";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Sergi Marquez — Frontend Engineer",
    template: "%s | Sergi Marquez",
  },
  description:
    "Frontend architect and engineer building scalable, maintainable frontend architectures. Specialized in React, Next.js, TypeScript, design systems, and engineering leadership.",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sergimarquez.com",
    siteName: "Sergi Marquez",
    title: "Sergi Marquez — Frontend Engineer",
    description:
      "Frontend architect and engineer building scalable, maintainable frontend architectures.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergi Marquez — Frontend Engineer",
    description:
      "Frontend architect and engineer building scalable, maintainable frontend architectures.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${spaceGrotesk.variable} antialiased`}>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
