/* ─── Product & Catalog Types ─────────────────────────────────────────────── */

export interface Product {
  id: number;
  name: string;
  slug: string;
  type: "simple" | "variable";
  permalink: string;
  sku: string;
  short_description: string;
  description_raw: string;
  on_sale: boolean;
  price_aed: number;
  regular_price_aed: number;
  sale_price_aed: number;
  currency: string;
  is_purchasable: boolean;
  is_in_stock: boolean;
  average_rating: string;
  review_count: number;
  image_count: number;
  images: ProductImage[];
  primary_image_url: string;
  categories: CategoryRef[];
  tags: TagRef[];
  brands: string[];
  attributes: ProductAttribute[];
  variations: unknown[];
  has_options: boolean;
  add_to_cart_text: string;
  add_to_cart_url: string;
}

export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface CategoryRef {
  id: number;
  name: string;
  slug: string;
}

export interface TagRef {
  id: number;
  name: string;
  slug: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  taxonomy: string;
  has_variations: boolean;
  terms: AttributeTerm[];
}

export interface AttributeTerm {
  id: number;
  name: string;
  slug: string;
}

/* ─── Category (full object from API) ────────────────────────────────────── */
export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
  image: {
    id: number;
    src: string;
    alt: string;
  } | null;
  permalink: string;
}

/* ─── Vehicle Hierarchy (for redesigned IA) ──────────────────────────────── */
export interface VehicleMake {
  slug: string;
  name: string;
  logo?: string;
  models: VehicleModel[];
}

export interface VehicleModel {
  slug: string;
  name: string;
  engines: VehicleEngine[];
}

export interface VehicleEngine {
  code: string;
  displacement: string;
  fuel: "diesel" | "petrol";
  categoryIds: number[];         // maps to WC category IDs
}

/* ─── Filter State ───────────────────────────────────────────────────────── */
export interface FilterState {
  make?: string;
  model?: string;
  engine?: string;
  partType?: string;  categoryId?: number;  priceMin?: number;
  priceMax?: number;
  inStockOnly?: boolean;
  purchasableOnly?: boolean;
  search?: string;
  page: number;
  perPage: number;
  sort: SortOption;
}

export type SortOption =
  | "name-asc"
  | "name-desc"
  | "price-asc"
  | "price-desc"
  | "newest"
  | "relevance";
