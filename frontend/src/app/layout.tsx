import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { LayoutWrapper } from "@/components/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "latin-ext"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.topengine.ae"),
  title: "TopEngine — Genuine Engine Parts UAE | OEM Auto Parts Dubai",
  description:
    "Shop genuine OEM engine parts for Toyota, Nissan, Ford & Mitsubishi. Turbochargers, injectors, ECU units & more. Fast UAE & GCC delivery. WhatsApp support available.",
  keywords: [
    "engine parts UAE",
    "OEM auto parts Dubai",
    "Toyota engine parts",
    "Nissan engine parts",
    "turbocharger UAE",
    "diesel injector Dubai",
    "TopEngine",
  ],
  openGraph: {
    title: "TopEngine — Genuine Engine Parts UAE",
    description:
      "Shop genuine OEM engine parts for Toyota, Nissan, Ford & Mitsubishi. Fast UAE & GCC delivery.",
    url: "https://www.topengine.ae",
    siteName: "TopEngine",
    locale: "en_AE",
    type: "website",
    images: [
      {
        url: "/images/logo.png",
        width: 400,
        height: 120,
        alt: "TopEngine — Genuine Engine Parts UAE",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "TopEngine — Genuine Engine Parts UAE",
    description:
      "Shop genuine OEM engine parts for Toyota, Nissan, Ford & Mitsubishi. Fast UAE & GCC delivery.",
    images: ["/images/logo.png"],
  },
  alternates: {
    canonical: "https://www.topengine.ae",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo-small.png",
  },
  other: {
    "theme-color": "#111827",
    "apple-mobile-web-app-capable": "yes",
    "apple-mobile-web-app-status-bar-style": "black-translucent",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${jetbrainsMono.variable} antialiased`}
        suppressHydrationWarning
      >
        <LayoutWrapper>{children}</LayoutWrapper>
      </body>
    </html>
  );
}
