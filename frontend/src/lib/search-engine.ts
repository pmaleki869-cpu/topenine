/**
 * TopEngine Instant Search Engine — v1.0
 * ───────────────────────────────────────
 * Pre-computed in-memory search index over 619 static products.
 * Tiered scoring, OEM-normalized fuzzy matching, grouped results.
 * Zero external dependencies.
 */
import type { Product, Category } from "@/types";
import { extractEngineCodes } from "@/lib/engine-codes";
import { formatAED, classifyPartType } from "@/lib/products";
import { VEHICLE_HIERARCHY, PART_TYPES } from "@/data/vehicle-hierarchy";
import productsData from "@/data/exports/products.json";
import categoriesData from "@/data/exports/categories.json";

// ─── Types ──────────────────────────────────────────────────────────────────

export interface SearchResultProduct {
  id: number;
  name: string;
  slug: string;
  sku: string;
  price: string;            // formatted AED
  priceRaw: number;
  imageUrl: string;
  inStock: boolean;
  categoryName: string;
  score: number;
}

export interface SearchResultCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
  score: number;
}

export interface SearchResultEngine {
  code: string;
  displacement: string;
  fuel: string;
  make: string;
  model: string;
  makeSlug: string;
  modelSlug: string;
  score: number;
}

export interface SearchResultVehicle {
  makeSlug: string;
  makeName: string;
  modelSlug: string;
  modelName: string;
  engineCount: number;
  score: number;
}

export interface SearchResultPartType {
  slug: string;
  name: string;
  score: number;
}

export interface InstantSearchResults {
  products: SearchResultProduct[];
  categories: SearchResultCategory[];
  engineCodes: SearchResultEngine[];
  vehicles: SearchResultVehicle[];
  partTypes: SearchResultPartType[];
  totalProducts: number;
  query: string;
}

export interface HighlightSegment {
  text: string;
  highlighted: boolean;
}

// ─── Normalization Helpers ──────────────────────────────────────────────────

/** Strip dashes, spaces, dots for OEM fuzzy matching */
function normalizeOem(s: string): string {
  return s.replace(/[\s\-\.\/]/g, "").toLowerCase();
}

/** Lowercase + trim */
function norm(s: string): string {
  return s.toLowerCase().trim();
}

// ─── Pre-computed Index ─────────────────────────────────────────────────────

interface IndexedProduct {
  product: Product;
  nameLower: string;
  nameWords: string[];
  skuLower: string;
  skuNorm: string;
  engineCodes: string[];
  categoryNames: string[];
  tagNames: string[];
  descLower: string;
  partType: string;
  priceFormatted: string;
}

const allProducts = productsData as Product[];
const allCategories = categoriesData as Category[];

// Build product index at module load
const productIndex: IndexedProduct[] = allProducts.map((p) => ({
  product: p,
  nameLower: norm(p.name),
  nameWords: norm(p.name).split(/\s+/),
  skuLower: norm(p.sku),
  skuNorm: normalizeOem(p.sku),
  engineCodes: extractEngineCodes(p.name + " " + p.description_raw),
  categoryNames: p.categories.map((c) => norm(c.name)),
  tagNames: p.tags.map((t) => norm(t.name)),
  descLower: norm(p.short_description + " " + p.description_raw),
  partType: classifyPartType(p.name),
  priceFormatted: p.price_aed > 0 ? formatAED(p.price_aed) : "Request price",
}));

// Build engine code → vehicle mapping
interface EngineEntry {
  code: string;
  displacement: string;
  fuel: string;
  makeSlug: string;
  makeName: string;
  modelSlug: string;
  modelName: string;
}

const engineIndex: EngineEntry[] = [];
for (const make of VEHICLE_HIERARCHY) {
  for (const model of make.models) {
    for (const engine of model.engines) {
      engineIndex.push({
        code: engine.code,
        displacement: engine.displacement,
        fuel: engine.fuel,
        makeSlug: make.slug,
        makeName: make.name,
        modelSlug: model.slug,
        modelName: model.name,
      });
    }
  }
}

// Build vehicle index (make + model combos)
interface VehicleEntry {
  makeSlug: string;
  makeName: string;
  modelSlug: string;
  modelName: string;
  engineCount: number;
  searchText: string;
}

const vehicleIndex: VehicleEntry[] = [];
for (const make of VEHICLE_HIERARCHY) {
  for (const model of make.models) {
    vehicleIndex.push({
      makeSlug: make.slug,
      makeName: make.name,
      modelSlug: model.slug,
      modelName: model.name,
      engineCount: model.engines.length,
      searchText: norm(`${make.name} ${model.name}`),
    });
  }
}

// ─── Scoring Engine ─────────────────────────────────────────────────────────

function scoreProduct(idx: IndexedProduct, q: string, qNorm: string): number {
  let score = 0;
  const qWords = q.split(/\s+/).filter(Boolean);

  // SKU matching (highest priority for OEM lookups)
  if (idx.skuNorm && qNorm) {
    if (idx.skuNorm === qNorm) score += 100;
    else if (idx.skuNorm.startsWith(qNorm)) score += 90;
    else if (idx.skuNorm.includes(qNorm)) score += 80;
    else if (idx.skuLower.includes(q)) score += 75;
  }

  // Name matching
  if (idx.nameLower === q) {
    score += 70;
  } else {
    // Check if all query words appear in name
    const allWordsMatch = qWords.every((w) => idx.nameLower.includes(w));
    if (allWordsMatch && qWords.length > 1) {
      score += 65;
    } else if (idx.nameWords.some((w) => w.startsWith(q))) {
      score += 60;
    } else if (idx.nameLower.includes(q)) {
      score += 50;
    } else {
      // Individual word matches in name
      const wordMatches = qWords.filter((w) => idx.nameLower.includes(w));
      if (wordMatches.length > 0) {
        score += 30 + (wordMatches.length / qWords.length) * 20;
      }
    }
  }

  // Tag matching
  if (idx.tagNames.some((t) => t === q || t.includes(q))) {
    score += 40;
  }

  // Category name matching
  if (idx.categoryNames.some((c) => c.includes(q))) {
    score += 30;
  }

  // Engine code matching
  const qUpper = q.toUpperCase();
  if (idx.engineCodes.some((ec) => ec === qUpper || ec.includes(qUpper))) {
    score += 45;
  }

  // Description matching (low priority)
  if (score === 0 && idx.descLower.includes(q)) {
    score += 15;
  }

  // OEM normalized fallback across name
  if (score === 0 && normalizeOem(idx.nameLower).includes(qNorm)) {
    score += 35;
  }

  // Boost in-stock items
  if (score > 0 && idx.product.is_in_stock) {
    score += 5;
  }

  // Boost items with prices
  if (score > 0 && idx.product.price_aed > 0) {
    score += 3;
  }

  return score;
}

// ─── Main Search Function ───────────────────────────────────────────────────

export function instantSearch(rawQuery: string): InstantSearchResults {
  const q = norm(rawQuery);
  const qNorm = normalizeOem(rawQuery);

  const empty: InstantSearchResults = {
    products: [],
    categories: [],
    engineCodes: [],
    vehicles: [],
    partTypes: [],
    totalProducts: 0,
    query: rawQuery,
  };

  if (q.length < 2) return empty;

  // ── Score products ──
  const scored: { idx: IndexedProduct; score: number }[] = [];
  for (const idx of productIndex) {
    const score = scoreProduct(idx, q, qNorm);
    if (score > 0) {
      scored.push({ idx, score });
    }
  }
  scored.sort((a, b) => b.score - a.score);

  const totalProducts = scored.length;
  const topProducts: SearchResultProduct[] = scored.slice(0, 5).map(({ idx, score }) => ({
    id: idx.product.id,
    name: idx.product.name,
    slug: idx.product.slug,
    sku: idx.product.sku,
    price: idx.priceFormatted,
    priceRaw: idx.product.price_aed,
    imageUrl: idx.product.primary_image_url || "",
    inStock: idx.product.is_in_stock,
    categoryName: idx.product.categories[0]?.name || "",
    score,
  }));

  // ── Score categories ──
  const matchedCategories: SearchResultCategory[] = [];
  for (const cat of allCategories) {
    const catLower = norm(cat.name);
    let score = 0;
    if (catLower.includes(q)) score = 60;
    else if (normalizeOem(cat.name).includes(qNorm)) score = 40;
    else if (norm(cat.description).includes(q)) score = 20;

    if (score > 0) {
      matchedCategories.push({
        id: cat.id,
        name: cat.name,
        slug: cat.slug,
        count: cat.count,
        score,
      });
    }
  }
  matchedCategories.sort((a, b) => b.score - a.score);

  // ── Score engine codes ──
  const matchedEngines: SearchResultEngine[] = [];
  const qUpper = rawQuery.toUpperCase().trim();
  const seenEngines = new Set<string>();
  for (const eng of engineIndex) {
    const codeLower = norm(eng.code);
    const codeNorm = normalizeOem(eng.code);
    let score = 0;
    if (eng.code === qUpper) score = 100;
    else if (codeLower.startsWith(q)) score = 80;
    else if (codeLower.includes(q) || codeNorm.includes(qNorm)) score = 60;

    if (score > 0 && !seenEngines.has(eng.code)) {
      seenEngines.add(eng.code);
      matchedEngines.push({
        code: eng.code,
        displacement: eng.displacement,
        fuel: eng.fuel,
        make: eng.makeName,
        model: eng.modelName,
        makeSlug: eng.makeSlug,
        modelSlug: eng.modelSlug,
        score,
      });
    }
  }
  matchedEngines.sort((a, b) => b.score - a.score);

  // ── Score vehicles ──
  const matchedVehicles: SearchResultVehicle[] = [];
  const seenVehicles = new Set<string>();
  for (const v of vehicleIndex) {
    let score = 0;
    if (v.searchText.includes(q)) score = 50;
    else if (norm(v.makeName).startsWith(q)) score = 40;
    else if (norm(v.modelName).includes(q)) score = 35;

    const key = `${v.makeSlug}/${v.modelSlug}`;
    if (score > 0 && !seenVehicles.has(key)) {
      seenVehicles.add(key);
      matchedVehicles.push({
        makeSlug: v.makeSlug,
        makeName: v.makeName,
        modelSlug: v.modelSlug,
        modelName: v.modelName,
        engineCount: v.engineCount,
        score,
      });
    }
  }
  matchedVehicles.sort((a, b) => b.score - a.score);

  // ── Score part types ──
  const matchedPartTypes: SearchResultPartType[] = [];
  for (const pt of PART_TYPES) {
    if (pt.slug === "other") continue;
    const ptLower = norm(pt.name);
    let score = 0;
    if (ptLower.includes(q)) score = 50;
    else if (pt.keywords.some((kw) => kw.includes(q) || q.includes(kw))) score = 40;

    if (score > 0) {
      matchedPartTypes.push({ slug: pt.slug, name: pt.name, score });
    }
  }
  matchedPartTypes.sort((a, b) => b.score - a.score);

  return {
    products: topProducts,
    categories: matchedCategories.slice(0, 3),
    engineCodes: matchedEngines.slice(0, 3),
    vehicles: matchedVehicles.slice(0, 3),
    partTypes: matchedPartTypes.slice(0, 3),
    totalProducts,
    query: rawQuery,
  };
}

// ─── Highlight Helper ───────────────────────────────────────────────────────

export function highlightMatch(text: string, query: string): HighlightSegment[] {
  if (!query || query.length < 2) {
    return [{ text, highlighted: false }];
  }

  const segments: HighlightSegment[] = [];
  const lowerText = text.toLowerCase();
  const lowerQuery = query.toLowerCase().trim();
  let lastIndex = 0;

  // Find all non-overlapping occurrences
  let searchFrom = 0;
  while (searchFrom < lowerText.length) {
    const idx = lowerText.indexOf(lowerQuery, searchFrom);
    if (idx === -1) break;

    // Add non-highlighted segment before match
    if (idx > lastIndex) {
      segments.push({ text: text.slice(lastIndex, idx), highlighted: false });
    }

    // Add highlighted match (preserving original case)
    segments.push({ text: text.slice(idx, idx + lowerQuery.length), highlighted: true });

    lastIndex = idx + lowerQuery.length;
    searchFrom = lastIndex;
  }

  // Add remaining text
  if (lastIndex < text.length) {
    segments.push({ text: text.slice(lastIndex), highlighted: false });
  }

  return segments.length > 0 ? segments : [{ text, highlighted: false }];
}

// ─── Recent Searches (localStorage) ─────────────────────────────────────────

const STORAGE_KEY = "te-recent-searches";
const MAX_RECENT = 5;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) ? parsed.slice(0, MAX_RECENT) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string): void {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed || trimmed.length < 2) return;

  try {
    const existing = getRecentSearches();
    const filtered = existing.filter((s) => s.toLowerCase() !== trimmed.toLowerCase());
    const updated = [trimmed, ...filtered].slice(0, MAX_RECENT);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage unavailable
  }
}

export function clearRecentSearches(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // localStorage unavailable
  }
}

// ─── Popular Searches ───────────────────────────────────────────────────────

export const POPULAR_SEARCHES = [
  "1GD turbocharger",
  "89661-F0B00",
  "Hilux crankshaft",
  "YD25 injector",
  "piston ring set",
  "4D56 gasket",
];
