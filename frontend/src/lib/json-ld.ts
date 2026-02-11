import type { Product } from "@/types";

const BASE_URL = "https://www.topengine.ae";
const ORGANIZATION = {
  "@type": "Organization",
  name: "TopEngine",
  url: BASE_URL,
  logo: `${BASE_URL}/images/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+971-55-152-1264",
    contactType: "sales",
    areaServed: ["AE", "SA", "OM", "KW", "BH", "QA"],
    availableLanguage: ["English", "Arabic"],
  },
  sameAs: ["https://wa.me/971551521264"],
};

/**
 * Organization + WebSite JSON-LD for the homepage.
 */
export function organizationJsonLd(): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@graph": [
      ORGANIZATION,
      {
        "@type": "WebSite",
        name: "TopEngine",
        url: BASE_URL,
        potentialAction: {
          "@type": "SearchAction",
          target: {
            "@type": "EntryPoint",
            urlTemplate: `${BASE_URL}/shop?search={search_term_string}`,
          },
          "query-input": "required name=search_term_string",
        },
      },
    ],
  });
}

/**
 * Product JSON-LD for individual product pages.
 */
export function productJsonLd(product: Product): string {
  const offers: Record<string, unknown> = {
    "@type": "Offer",
    priceCurrency: "AED",
    availability: product.is_in_stock
      ? "https://schema.org/InStock"
      : "https://schema.org/OutOfStock",
    seller: ORGANIZATION,
    url: `${BASE_URL}/product/${product.slug}`,
  };

  if (product.price_aed > 0) {
    offers.price = product.price_aed.toFixed(2);
  }

  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    sku: product.sku || undefined,
    image: product.primary_image_url || undefined,
    description: product.short_description
      ? product.short_description.replace(/<[^>]+>/g, "").slice(0, 300)
      : `Genuine OEM ${product.name} for UAE vehicles.`,
    brand: product.brands?.[0]
      ? { "@type": "Brand", name: product.brands[0] }
      : undefined,
    category: product.categories?.[0]?.name || "Engine Parts",
    offers,
  });
}

/**
 * BreadcrumbList JSON-LD for any page with breadcrumbs.
 */
export function breadcrumbJsonLd(
  items: { name: string; url?: string }[]
): string {
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      ...(item.url ? { item: item.url } : {}),
    })),
  });
}
