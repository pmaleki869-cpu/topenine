"use server";

import fs from "fs";
import path from "path";
import type { Product, Category } from "@/types";
import {
  productFormSchema,
  categoryFormSchema,
  stockToggleSchema,
  bulkActionSchema,
  generateSlug,
  type ProductFormData,
  type CategoryFormData,
  type CategoryFormInput,
} from "@/lib/validations";

// ─── File paths ─────────────────────────────────────────────────────────────

const DATA_DIR = path.join(process.cwd(), "src", "data", "exports");
const PRODUCTS_PATH = path.join(DATA_DIR, "products.json");
const CATEGORIES_PATH = path.join(DATA_DIR, "categories.json");

// ─── Helpers ────────────────────────────────────────────────────────────────

function readProducts(): Product[] {
  const raw = fs.readFileSync(PRODUCTS_PATH, "utf-8");
  return JSON.parse(raw) as Product[];
}

function writeProducts(products: Product[]): void {
  fs.writeFileSync(PRODUCTS_PATH, JSON.stringify(products, null, 2), "utf-8");
}

function readCategories(): Category[] {
  const raw = fs.readFileSync(CATEGORIES_PATH, "utf-8");
  return JSON.parse(raw) as Category[];
}

function writeCategories(categories: Category[]): void {
  fs.writeFileSync(CATEGORIES_PATH, JSON.stringify(categories, null, 2), "utf-8");
}

type ActionResult = { success: true; message: string } | { success: false; error: string };

// ─── PRODUCT CRUD ───────────────────────────────────────────────────────────

export async function createProduct(data: ProductFormData): Promise<ActionResult & { id?: number }> {
  try {
    const parsed = productFormSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const products = readProducts();
    const categories = readCategories();
    const maxId = products.reduce((max, p) => Math.max(max, p.id), 0);
    const newId = maxId + 1;

    const slug = parsed.data.slug || generateSlug(parsed.data.name);

    // Check slug uniqueness
    if (products.some((p) => p.slug === slug)) {
      return { success: false, error: `Slug "${slug}" already exists` };
    }

    const categoryRefs = categories
      .filter((c) => parsed.data.category_ids.includes(c.id))
      .map((c) => ({ id: c.id, name: c.name, slug: c.slug }));

    const newProduct: Product = {
      id: newId,
      name: parsed.data.name,
      slug,
      type: parsed.data.type,
      permalink: "",
      sku: parsed.data.sku,
      short_description: parsed.data.short_description,
      description_raw: parsed.data.description_raw,
      on_sale: parsed.data.on_sale,
      price_aed: parsed.data.price_aed,
      regular_price_aed: parsed.data.regular_price_aed,
      sale_price_aed: parsed.data.sale_price_aed,
      currency: "AED",
      is_purchasable: parsed.data.is_purchasable,
      is_in_stock: parsed.data.is_in_stock,
      average_rating: "0",
      review_count: 0,
      image_count: 0,
      images: [],
      primary_image_url: "",
      categories: categoryRefs,
      tags: parsed.data.tag_names.map((name, i) => ({
        id: 9000 + i,
        name,
        slug: generateSlug(name),
      })),
      brands: parsed.data.brand_names,
      attributes: [],
      variations: [],
      has_options: false,
      add_to_cart_text: "Add to cart",
      add_to_cart_url: "",
    };

    products.push(newProduct);
    writeProducts(products);

    return { success: true, message: `Product "${parsed.data.name}" created`, id: newId };
  } catch (e) {
    return { success: false, error: `Failed to create product: ${(e as Error).message}` };
  }
}

export async function updateProduct(
  productId: number,
  data: ProductFormData
): Promise<ActionResult> {
  try {
    const parsed = productFormSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const products = readProducts();
    const categories = readCategories();
    const idx = products.findIndex((p) => p.id === productId);
    if (idx === -1) return { success: false, error: "Product not found" };

    const slug = parsed.data.slug || generateSlug(parsed.data.name);

    // Check slug uniqueness (excluding self)
    if (products.some((p) => p.slug === slug && p.id !== productId)) {
      return { success: false, error: `Slug "${slug}" already exists` };
    }

    const categoryRefs = categories
      .filter((c) => parsed.data.category_ids.includes(c.id))
      .map((c) => ({ id: c.id, name: c.name, slug: c.slug }));

    products[idx] = {
      ...products[idx],
      name: parsed.data.name,
      slug,
      type: parsed.data.type,
      sku: parsed.data.sku,
      short_description: parsed.data.short_description,
      description_raw: parsed.data.description_raw,
      on_sale: parsed.data.on_sale,
      price_aed: parsed.data.price_aed,
      regular_price_aed: parsed.data.regular_price_aed,
      sale_price_aed: parsed.data.sale_price_aed,
      is_purchasable: parsed.data.is_purchasable,
      is_in_stock: parsed.data.is_in_stock,
      categories: categoryRefs,
      tags: parsed.data.tag_names.map((name, i) => ({
        id: products[idx].tags[i]?.id || 9000 + i,
        name,
        slug: generateSlug(name),
      })),
      brands: parsed.data.brand_names,
    };

    writeProducts(products);
    return { success: true, message: `Product "${parsed.data.name}" updated` };
  } catch (e) {
    return { success: false, error: `Failed to update product: ${(e as Error).message}` };
  }
}

export async function deleteProduct(productId: number): Promise<ActionResult> {
  try {
    const products = readProducts();
    const idx = products.findIndex((p) => p.id === productId);
    if (idx === -1) return { success: false, error: "Product not found" };

    const name = products[idx].name;
    products.splice(idx, 1);
    writeProducts(products);

    return { success: true, message: `Product "${name}" deleted` };
  } catch (e) {
    return { success: false, error: `Failed to delete product: ${(e as Error).message}` };
  }
}

export async function toggleStock(
  productId: number,
  is_in_stock: boolean
): Promise<ActionResult> {
  try {
    const parsed = stockToggleSchema.safeParse({ productId, is_in_stock });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const products = readProducts();
    const idx = products.findIndex((p) => p.id === productId);
    if (idx === -1) return { success: false, error: "Product not found" };

    products[idx].is_in_stock = is_in_stock;
    writeProducts(products);

    return {
      success: true,
      message: `"${products[idx].name}" marked ${is_in_stock ? "in stock" : "out of stock"}`,
    };
  } catch (e) {
    return { success: false, error: `Failed to toggle stock: ${(e as Error).message}` };
  }
}

export async function bulkAction(
  productIds: number[],
  action: "delete" | "set_in_stock" | "set_out_of_stock"
): Promise<ActionResult> {
  try {
    const parsed = bulkActionSchema.safeParse({ productIds, action });
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const products = readProducts();
    const idSet = new Set(productIds);

    if (action === "delete") {
      const remaining = products.filter((p) => !idSet.has(p.id));
      writeProducts(remaining);
      return { success: true, message: `${productIds.length} products deleted` };
    }

    const inStock = action === "set_in_stock";
    let count = 0;
    for (const p of products) {
      if (idSet.has(p.id)) {
        p.is_in_stock = inStock;
        count++;
      }
    }
    writeProducts(products);
    return {
      success: true,
      message: `${count} products marked ${inStock ? "in stock" : "out of stock"}`,
    };
  } catch (e) {
    return { success: false, error: `Bulk action failed: ${(e as Error).message}` };
  }
}

// ─── CATEGORY CRUD ──────────────────────────────────────────────────────────

export async function createCategory(data: CategoryFormInput): Promise<ActionResult & { id?: number }> {
  try {
    const parsed = categoryFormSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const categories = readCategories();
    const maxId = categories.reduce((max, c) => Math.max(max, c.id), 0);
    const newId = maxId + 1;

    const slug = parsed.data.slug || generateSlug(parsed.data.name);

    if (categories.some((c) => c.slug === slug)) {
      return { success: false, error: `Slug "${slug}" already exists` };
    }

    const newCat: Category = {
      id: newId,
      name: parsed.data.name,
      slug,
      description: parsed.data.description,
      parent: parsed.data.parent,
      count: 0,
      image: null,
      permalink: "",
    };

    categories.push(newCat);
    writeCategories(categories);

    return { success: true, message: `Category "${parsed.data.name}" created`, id: newId };
  } catch (e) {
    return { success: false, error: `Failed to create category: ${(e as Error).message}` };
  }
}

export async function updateCategory(
  categoryId: number,
  data: CategoryFormInput
): Promise<ActionResult> {
  try {
    const parsed = categoryFormSchema.safeParse(data);
    if (!parsed.success) {
      return { success: false, error: parsed.error.issues[0].message };
    }

    const categories = readCategories();
    const idx = categories.findIndex((c) => c.id === categoryId);
    if (idx === -1) return { success: false, error: "Category not found" };

    const slug = parsed.data.slug || generateSlug(parsed.data.name);

    if (categories.some((c) => c.slug === slug && c.id !== categoryId)) {
      return { success: false, error: `Slug "${slug}" already exists` };
    }

    categories[idx] = {
      ...categories[idx],
      name: parsed.data.name,
      slug,
      description: parsed.data.description,
      parent: parsed.data.parent,
    };

    writeCategories(categories);
    return { success: true, message: `Category "${parsed.data.name}" updated` };
  } catch (e) {
    return { success: false, error: `Failed to update category: ${(e as Error).message}` };
  }
}

export async function deleteCategory(categoryId: number): Promise<ActionResult> {
  try {
    const categories = readCategories();
    const idx = categories.findIndex((c) => c.id === categoryId);
    if (idx === -1) return { success: false, error: "Category not found" };

    // Check for products using this category
    const products = readProducts();
    const usingCount = products.filter((p) =>
      p.categories.some((c) => c.id === categoryId)
    ).length;

    if (usingCount > 0) {
      return {
        success: false,
        error: `Cannot delete: ${usingCount} products use this category. Reassign them first.`,
      };
    }

    const name = categories[idx].name;
    categories.splice(idx, 1);
    writeCategories(categories);

    return { success: true, message: `Category "${name}" deleted` };
  } catch (e) {
    return { success: false, error: `Failed to delete category: ${(e as Error).message}` };
  }
}
