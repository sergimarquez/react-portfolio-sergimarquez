import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import Script from "next/script";
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
    default: "Sergi Marquez — Senior Frontend Engineer & Frontend Architect",
    template: "%s | Sergi Marquez",
  },
  description:
    "Senior Frontend Engineer building high-performance web applications with React, Next.js, and TypeScript. Focused on clean architecture, design systems, accessibility, and developer experience.",
  authors: [{ name: "Sergi Marquez" }],
  alternates: {
    canonical: "https://sergimarquez.com",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://sergimarquez.com",
    siteName: "Sergi Marquez",
    title: "Sergi Marquez — Senior Frontend Engineer & Frontend Architect",
    description:
      "Senior Frontend Engineer building high-performance web applications with React, Next.js, and TypeScript. Focused on clean architecture, design systems, accessibility, and developer experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sergi Marquez — Senior Frontend Engineer & Frontend Architect",
    description:
      "Senior Frontend Engineer building high-performance web applications with React, Next.js, and TypeScript. Focused on clean architecture, design systems, accessibility, and developer experience.",
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
        <Script id="ld-json-person" type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Sergi Marquez",
            url: "https://sergimarquez.com",
            jobTitle: "Senior Frontend Engineer & Frontend Architect",
            sameAs: [
              "https://www.linkedin.com/in/sergimarquez",
              "https://github.com/sergimarquez",
            ],
          })}
        </Script>
      </body>
    </html>
  );
}
