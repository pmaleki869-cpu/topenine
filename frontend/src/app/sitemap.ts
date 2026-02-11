import type { MetadataRoute } from "next";
import { getAllProducts } from "@/lib/products";
import { VEHICLE_HIERARCHY } from "@/data/vehicle-hierarchy";

const BASE_URL = "https://www.topengine.ae";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  // ── Static pages ──────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE_URL}/shop`, lastModified: now, changeFrequency: "daily", priority: 0.9 },
    { url: `${BASE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.4 },
    { url: `${BASE_URL}/returns`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${BASE_URL}/order-tracking`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
  ];

  // ── Vehicle pages (make + model) ─────────────────────────────────────
  const vehiclePages: MetadataRoute.Sitemap = [];
  for (const make of VEHICLE_HIERARCHY) {
    vehiclePages.push({
      url: `${BASE_URL}/vehicles/${make.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.7,
    });
    for (const model of make.models) {
      vehiclePages.push({
        url: `${BASE_URL}/vehicles/${make.slug}/${model.slug}`,
        lastModified: now,
        changeFrequency: "weekly",
        priority: 0.6,
      });
    }
  }

  // ── Product pages ────────────────────────────────────────────────────
  const products = getAllProducts();
  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: `${BASE_URL}/product/${p.slug}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...staticPages, ...vehiclePages, ...productPages];
}
