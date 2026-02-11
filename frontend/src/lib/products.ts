/**
 * Product data loader — reads from the extracted JSON export.
 * In production this would query WooCommerce REST API or a custom backend.
 * For the redesign prototype, we use the static export at /data/products.json.
 */
import type { Product, Category, FilterState } from "@/types";
import { PART_TYPES, VEHICLE_HIERARCHY } from "@/data/vehicle-hierarchy";
import productsData from "../data/exports/products.json";
import categoriesData from "../data/exports/categories.json";

// ─── Typed imports ──────────────────────────────────────────────────────────
const allProducts = productsData as Product[];
const allCategories = categoriesData as Category[];

// ─── Part-type classifier ───────────────────────────────────────────────────
export function classifyPartType(productName: string): string {
  const lower = productName.toLowerCase();
  for (const pt of PART_TYPES) {
    if (pt.keywords.some((kw) => lower.includes(kw))) {
      return pt.slug;
    }
  }
  return "other";
}

// ─── Price formatter ────────────────────────────────────────────────────────
export function formatAED(amount: number): string {
  if (amount <= 0) return "";
  return new Intl.NumberFormat("en-AE", {
    style: "currency",
    currency: "AED",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

// ─── Getters ────────────────────────────────────────────────────────────────
export function getAllProducts(): Product[] {
  return allProducts;
}

export function getCategories(): Category[] {
  return allCategories;
}

export function getProductBySlug(slug: string): Product | undefined {
  return allProducts.find((p) => p.slug === slug);
}

export function getProductById(id: number): Product | undefined {
  return allProducts.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: number): Product[] {
  return allProducts.filter((p) =>
    p.categories.some((c) => c.id === categoryId)
  );
}

/** Normalize OEM part number for fuzzy matching — strip dashes, spaces, dots */
function normalizeOem(s: string): string {
  return s.replace(/[\s\-\.]/g, "").toLowerCase();
}

export function searchProducts(query: string): Product[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  const qNorm = normalizeOem(q);
  return allProducts.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      normalizeOem(p.sku).includes(qNorm) ||
      p.slug.includes(q) ||
      p.tags.some((t) => t.name.toLowerCase().includes(q))
  );
}

// ─── Filtered + Sorted Product List ─────────────────────────────────────────
export function getFilteredProducts(filters: FilterState): {
  products: Product[];
  total: number;
  pages: number;
} {
  let results = [...allProducts];

  // Category filter (from vehicle hierarchy)
  if (filters.engine || filters.model || filters.make) {
    // This would need mapping from vehicle hierarchy to category IDs
    // For now, filter by search within category names
  }

  // Category filter (direct category ID)
  if (filters.categoryId) {
    results = results.filter((p) =>
      p.categories.some((c) => c.id === filters.categoryId)
    );
  }

  // Part type filter
  if (filters.partType) {
    results = results.filter(
      (p) => classifyPartType(p.name) === filters.partType
    );
  }

  // Price range
  if (filters.priceMin !== undefined) {
    results = results.filter((p) => p.price_aed >= filters.priceMin!);
  }
  if (filters.priceMax !== undefined) {
    results = results.filter(
      (p) => p.price_aed <= filters.priceMax! && p.price_aed > 0
    );
  }

  // Stock / purchasable
  if (filters.inStockOnly) {
    results = results.filter((p) => p.is_in_stock);
  }
  if (filters.purchasableOnly) {
    results = results.filter((p) => p.is_purchasable);
  }

  // Search (with OEM normalization)
  if (filters.search) {
    const q = filters.search.toLowerCase();
    const qNorm = normalizeOem(q);
    results = results.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        normalizeOem(p.sku).includes(qNorm) ||
        p.categories.some((c) => c.name.toLowerCase().includes(q))
    );
  }

  // Sort
  switch (filters.sort) {
    case "name-asc":
      results.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      results.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "price-asc":
      results.sort((a, b) => a.price_aed - b.price_aed);
      break;
    case "price-desc":
      results.sort((a, b) => b.price_aed - a.price_aed);
      break;
    case "newest":
      results.sort((a, b) => b.id - a.id);
      break;
    default:
      break;
  }

  const total = results.length;
  const pages = Math.ceil(total / filters.perPage);
  const start = (filters.page - 1) * filters.perPage;
  const paged = results.slice(start, start + filters.perPage);

  return { products: paged, total, pages };
}

// ─── Related Products ───────────────────────────────────────────────────────
export function getRelatedProducts(product: Product, limit = 4): Product[] {
  const partType = classifyPartType(product.name);
  const catIds = new Set(product.categories.map((c) => c.id));

  return allProducts
    .filter(
      (p) =>
        p.id !== product.id &&
        (p.categories.some((c) => catIds.has(c.id)) ||
          classifyPartType(p.name) === partType)
    )
    .slice(0, limit);
}

// ─── On Sale Products ───────────────────────────────────────────────────────
export function getOnSaleProducts(limit = 4): Product[] {
  return allProducts
    .filter((p) => p.on_sale && p.sale_price_aed > 0 && p.regular_price_aed > 0)
    .sort((a, b) => {
      const discA = ((a.regular_price_aed - a.sale_price_aed) / a.regular_price_aed) * 100;
      const discB = ((b.regular_price_aed - b.sale_price_aed) / b.regular_price_aed) * 100;
      return discB - discA; // highest discount first
    })
    .slice(0, limit);
}

// ─── In-Stock Products Grouped by Vehicle Make ──────────────────────────────
export interface MakeProductGroup {
  slug: string;
  name: string;
  products: Product[];
  categoryIds: number[];
}

/**
 * Returns in-stock products grouped by vehicle make (Toyota, Nissan, Ford, Mitsubishi)
 * plus an "all" group with a diversified round-robin mix.
 * Products are sorted: purchasable first, then by price descending.
 */
export function getInStockByMake(): { groups: MakeProductGroup[]; all: Product[]; totalInStock: number } {
  const inStock = allProducts.filter((p) => p.is_in_stock && p.price_aed > 0);

  // Collect all categoryIds per make from vehicle hierarchy
  const groups: MakeProductGroup[] = VEHICLE_HIERARCHY.map((make) => {
    const catIds = new Set<number>();
    for (const model of make.models) {
      for (const engine of model.engines) {
        for (const cid of engine.categoryIds) catIds.add(cid);
      }
    }
    const catIdArr = Array.from(catIds);

    // Filter products matching this make's categories
    const makeProducts = inStock
      .filter((p) => p.categories.some((c) => catIds.has(c.id)))
      .sort((a, b) => {
        // Purchasable products first
        if (a.is_purchasable !== b.is_purchasable) return a.is_purchasable ? -1 : 1;
        // Then by price descending (showcase premium items)
        return b.price_aed - a.price_aed;
      });

    return {
      slug: make.slug,
      name: make.name,
      products: makeProducts,
      categoryIds: catIdArr,
    };
  });

  // "All" tab: round-robin diversified mix from each make (max 16)
  const allMix: Product[] = [];
  const seen = new Set<number>();
  const maxPerRound = 16;
  let round = 0;
  while (allMix.length < maxPerRound && round < 50) {
    let added = false;
    for (const g of groups) {
      if (round < g.products.length && allMix.length < maxPerRound) {
        const p = g.products[round];
        if (!seen.has(p.id)) {
          allMix.push(p);
          seen.add(p.id);
          added = true;
        }
      }
    }
    if (!added) break;
    round++;
  }

  return { groups, all: allMix, totalInStock: inStock.length };
}
