import { z } from "zod";

// ─── Product Schemas ────────────────────────────────────────────────────────

export const productFormSchema = z.object({
  name: z
    .string()
    .min(3, "Product name must be at least 3 characters")
    .max(300, "Product name must be under 300 characters"),
  sku: z
    .string()
    .max(100, "SKU must be under 100 characters")
    .optional()
    .default(""),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only")
    .optional()
    .default(""),
  short_description: z
    .string()
    .max(500, "Short description must be under 500 characters")
    .optional()
    .default(""),
  description_raw: z
    .string()
    .max(5000, "Description must be under 5000 characters")
    .optional()
    .default(""),
  price_aed: z
    .number()
    .min(0, "Price cannot be negative")
    .default(0),
  regular_price_aed: z
    .number()
    .min(0, "Regular price cannot be negative")
    .default(0),
  sale_price_aed: z
    .number()
    .min(0, "Sale price cannot be negative")
    .default(0),
  on_sale: z.boolean().default(false),
  is_in_stock: z.boolean().default(true),
  is_purchasable: z.boolean().default(true),
  type: z.enum(["simple", "variable"]).default("simple"),
  category_ids: z.array(z.number()).optional().default([]),
  tag_names: z.array(z.string()).optional().default([]),
  brand_names: z.array(z.string()).optional().default([]),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

// ─── Category Schemas ───────────────────────────────────────────────────────

export const categoryFormSchema = z.object({
  name: z
    .string()
    .min(2, "Category name must be at least 2 characters")
    .max(100, "Category name must be under 100 characters"),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase with hyphens only")
    .optional()
    .default(""),
  description: z
    .string()
    .max(500, "Description must be under 500 characters")
    .optional()
    .default(""),
  parent: z.number().optional().default(0),
});

export type CategoryFormData = z.infer<typeof categoryFormSchema>;
export type CategoryFormInput = z.input<typeof categoryFormSchema>;

// ─── Stock Toggle Schema ────────────────────────────────────────────────────

export const stockToggleSchema = z.object({
  productId: z.number(),
  is_in_stock: z.boolean(),
});

export type StockToggleData = z.infer<typeof stockToggleSchema>;

// ─── Bulk Action Schema ─────────────────────────────────────────────────────

export const bulkActionSchema = z.object({
  productIds: z.array(z.number()).min(1, "Select at least one product"),
  action: z.enum(["delete", "set_in_stock", "set_out_of_stock"]),
});

export type BulkActionData = z.infer<typeof bulkActionSchema>;

// ─── Helpers ────────────────────────────────────────────────────────────────

/** Generate a URL-safe slug from a string */
export function generateSlug(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 200);
}

/** Parse a string to a number, returning 0 for invalid inputs */
export function parsePrice(value: string): number {
  const n = parseFloat(value);
  return isNaN(n) || n < 0 ? 0 : Math.round(n * 100) / 100;
}
