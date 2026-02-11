import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop All Engine Parts | TopEngine UAE",
  description:
    "Browse 600+ genuine OEM engine parts — turbochargers, injectors, ECU units, and more for Toyota, Nissan, Ford & Mitsubishi. Fast UAE delivery.",
  alternates: {
    canonical: "https://www.topengine.ae/shop",
  },
  openGraph: {
    title: "Shop All Engine Parts | TopEngine UAE",
    description:
      "Browse 600+ genuine OEM engine parts — turbochargers, injectors, ECU units, and more. Fast UAE delivery.",
    url: "https://www.topengine.ae/shop",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shop All Engine Parts | TopEngine UAE",
    description:
      "Browse 600+ genuine OEM engine parts for Toyota, Nissan, Ford & Mitsubishi. Fast UAE delivery.",
  },
};

export default function ShopLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
