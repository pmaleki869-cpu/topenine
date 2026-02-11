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
const TAGS_PATH = path.join(DATA_DIR, "tags.json");
const INQUIRIES_PATH = path.join(DATA_DIR, "inquiries.json");
const LEADS_PATH = path.join(DATA_DIR, "leads.json");

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

// ─── PRODUCT IMAGE ──────────────────────────────────────────────────────────

export async function updateProductImage(
  productId: number,
  imageUrl: string
): Promise<ActionResult> {
  try {
    const products = readProducts();
    const idx = products.findIndex((p) => p.id === productId);
    if (idx === -1) return { success: false, error: "Product not found" };

    products[idx].primary_image_url = imageUrl;
    if (imageUrl && products[idx].images.length === 0) {
      products[idx].images = [{ id: Date.now(), src: imageUrl, alt: products[idx].name }];
      products[idx].image_count = 1;
    }
    writeProducts(products);
    return { success: true, message: "Product image updated" };
  } catch (e) {
    return { success: false, error: `Failed to update image: ${(e as Error).message}` };
  }
}

// ─── TAGS CRUD ──────────────────────────────────────────────────────────────

interface Tag {
  id: number;
  name: string;
  slug: string;
  description: string;
  parent: number;
  count: number;
}

function readTags(): Tag[] {
  try {
    const raw = fs.readFileSync(TAGS_PATH, "utf-8");
    return JSON.parse(raw) as Tag[];
  } catch {
    return [];
  }
}

function writeTags(tags: Tag[]): void {
  fs.writeFileSync(TAGS_PATH, JSON.stringify(tags, null, 2), "utf-8");
}

export async function getTags(): Promise<Tag[]> {
  return readTags();
}

export async function createTag(name: string): Promise<ActionResult & { id?: number }> {
  try {
    if (!name.trim()) return { success: false, error: "Tag name is required" };
    const tags = readTags();
    const slug = generateSlug(name);
    if (tags.some((t) => t.slug === slug)) {
      return { success: false, error: `Tag "${name}" already exists` };
    }
    const maxId = tags.reduce((max, t) => Math.max(max, t.id), 0);
    const newTag: Tag = { id: maxId + 1, name: name.trim(), slug, description: "", parent: 0, count: 0 };
    tags.push(newTag);
    writeTags(tags);
    return { success: true, message: `Tag "${name}" created`, id: newTag.id };
  } catch (e) {
    return { success: false, error: `Failed to create tag: ${(e as Error).message}` };
  }
}

export async function updateTag(tagId: number, name: string): Promise<ActionResult> {
  try {
    if (!name.trim()) return { success: false, error: "Tag name is required" };
    const tags = readTags();
    const idx = tags.findIndex((t) => t.id === tagId);
    if (idx === -1) return { success: false, error: "Tag not found" };
    const slug = generateSlug(name);
    if (tags.some((t) => t.slug === slug && t.id !== tagId)) {
      return { success: false, error: `Tag "${name}" already exists` };
    }
    tags[idx].name = name.trim();
    tags[idx].slug = slug;
    writeTags(tags);
    return { success: true, message: `Tag updated to "${name}"` };
  } catch (e) {
    return { success: false, error: `Failed to update tag: ${(e as Error).message}` };
  }
}

export async function deleteTag(tagId: number): Promise<ActionResult> {
  try {
    const tags = readTags();
    const idx = tags.findIndex((t) => t.id === tagId);
    if (idx === -1) return { success: false, error: "Tag not found" };
    const name = tags[idx].name;
    tags.splice(idx, 1);
    writeTags(tags);
    return { success: true, message: `Tag "${name}" deleted` };
  } catch (e) {
    return { success: false, error: `Failed to delete tag: ${(e as Error).message}` };
  }
}

// ─── INQUIRY / ORDER TRACKER ────────────────────────────────────────────────

export interface Inquiry {
  id: number;
  customer_name: string;
  phone: string;
  product_ids: number[];
  notes: string;
  status: "new" | "contacted" | "quoted" | "confirmed" | "shipped" | "closed" | "cancelled";
  total_aed: number;
  created_at: string;
  updated_at: string;
}

function readInquiries(): Inquiry[] {
  try {
    const raw = fs.readFileSync(INQUIRIES_PATH, "utf-8");
    return JSON.parse(raw) as Inquiry[];
  } catch {
    return [];
  }
}

function writeInquiries(inquiries: Inquiry[]): void {
  fs.writeFileSync(INQUIRIES_PATH, JSON.stringify(inquiries, null, 2), "utf-8");
}

export async function getInquiries(): Promise<Inquiry[]> {
  return readInquiries();
}

export async function createInquiry(data: {
  customer_name: string;
  phone: string;
  product_ids: number[];
  notes: string;
  total_aed: number;
}): Promise<ActionResult & { id?: number }> {
  try {
    if (!data.customer_name.trim()) return { success: false, error: "Customer name is required" };
    if (!data.phone.trim()) return { success: false, error: "Phone number is required" };
    const inquiries = readInquiries();
    const maxId = inquiries.reduce((max, i) => Math.max(max, i.id), 0);
    const now = new Date().toISOString().split("T")[0];
    const newInquiry: Inquiry = {
      id: maxId + 1,
      customer_name: data.customer_name.trim(),
      phone: data.phone.trim(),
      product_ids: data.product_ids,
      notes: data.notes,
      status: "new",
      total_aed: data.total_aed,
      created_at: now,
      updated_at: now,
    };
    inquiries.push(newInquiry);
    writeInquiries(inquiries);
    return { success: true, message: `Inquiry #${newInquiry.id} created`, id: newInquiry.id };
  } catch (e) {
    return { success: false, error: `Failed to create inquiry: ${(e as Error).message}` };
  }
}

export async function updateInquiryStatus(
  inquiryId: number,
  status: Inquiry["status"]
): Promise<ActionResult> {
  try {
    const inquiries = readInquiries();
    const idx = inquiries.findIndex((i) => i.id === inquiryId);
    if (idx === -1) return { success: false, error: "Inquiry not found" };
    inquiries[idx].status = status;
    inquiries[idx].updated_at = new Date().toISOString().split("T")[0];
    writeInquiries(inquiries);
    return { success: true, message: `Inquiry #${inquiryId} → ${status}` };
  } catch (e) {
    return { success: false, error: `Failed to update inquiry: ${(e as Error).message}` };
  }
}

export async function deleteInquiry(inquiryId: number): Promise<ActionResult> {
  try {
    const inquiries = readInquiries();
    const idx = inquiries.findIndex((i) => i.id === inquiryId);
    if (idx === -1) return { success: false, error: "Inquiry not found" };
    inquiries.splice(idx, 1);
    writeInquiries(inquiries);
    return { success: true, message: `Inquiry #${inquiryId} deleted` };
  } catch (e) {
    return { success: false, error: `Failed to delete inquiry: ${(e as Error).message}` };
  }
}

// ─── LEADS / CUSTOMER TRACKER ───────────────────────────────────────────────

export interface Lead {
  id: number;
  name: string;
  email: string;
  phone: string;
  source: "whatsapp" | "phone" | "website" | "referral" | "other";
  notes: string;
  status: "new" | "contacted" | "qualified" | "converted" | "lost";
  created_at: string;
  updated_at: string;
}

function readLeads(): Lead[] {
  try {
    const raw = fs.readFileSync(LEADS_PATH, "utf-8");
    return JSON.parse(raw) as Lead[];
  } catch {
    return [];
  }
}

function writeLeads(leads: Lead[]): void {
  fs.writeFileSync(LEADS_PATH, JSON.stringify(leads, null, 2), "utf-8");
}

export async function getLeads(): Promise<Lead[]> {
  return readLeads();
}

export async function createLead(data: {
  name: string;
  email: string;
  phone: string;
  source: Lead["source"];
  notes: string;
}): Promise<ActionResult & { id?: number }> {
  try {
    if (!data.name.trim()) return { success: false, error: "Name is required" };
    const leads = readLeads();
    const maxId = leads.reduce((max, l) => Math.max(max, l.id), 0);
    const now = new Date().toISOString().split("T")[0];
    const newLead: Lead = {
      id: maxId + 1,
      name: data.name.trim(),
      email: data.email.trim(),
      phone: data.phone.trim(),
      source: data.source,
      notes: data.notes,
      status: "new",
      created_at: now,
      updated_at: now,
    };
    leads.push(newLead);
    writeLeads(leads);
    return { success: true, message: `Lead "${data.name}" added`, id: newLead.id };
  } catch (e) {
    return { success: false, error: `Failed to add lead: ${(e as Error).message}` };
  }
}

export async function updateLeadStatus(
  leadId: number,
  status: Lead["status"]
): Promise<ActionResult> {
  try {
    const leads = readLeads();
    const idx = leads.findIndex((l) => l.id === leadId);
    if (idx === -1) return { success: false, error: "Lead not found" };
    leads[idx].status = status;
    leads[idx].updated_at = new Date().toISOString().split("T")[0];
    writeLeads(leads);
    return { success: true, message: `Lead status → ${status}` };
  } catch (e) {
    return { success: false, error: `Failed to update lead: ${(e as Error).message}` };
  }
}

export async function deleteLead(leadId: number): Promise<ActionResult> {
  try {
    const leads = readLeads();
    const idx = leads.findIndex((l) => l.id === leadId);
    if (idx === -1) return { success: false, error: "Lead not found" };
    leads.splice(idx, 1);
    writeLeads(leads);
    return { success: true, message: `Lead deleted` };
  } catch (e) {
    return { success: false, error: `Failed to delete lead: ${(e as Error).message}` };
  }
}

// ─── DATA EXPORT ────────────────────────────────────────────────────────────

export async function exportData(format: "json" | "csv"): Promise<{ success: true; data: string; filename: string } | { success: false; error: string }> {
  try {
    const products = readProducts();
    if (format === "json") {
      return { success: true, data: JSON.stringify(products, null, 2), filename: "products-export.json" };
    }
    // CSV export
    const headers = ["id","name","slug","sku","type","price_aed","regular_price_aed","sale_price_aed","on_sale","is_in_stock","is_purchasable","categories","tags","brands","primary_image_url"];
    const rows = products.map((p) => [
      p.id, `"${p.name.replace(/"/g, '""')}"`, p.slug, p.sku, p.type,
      p.price_aed, p.regular_price_aed, p.sale_price_aed, p.on_sale, p.is_in_stock, p.is_purchasable,
      `"${p.categories.map((c) => c.name).join("; ")}"`,
      `"${p.tags.map((t) => t.name).join("; ")}"`,
      `"${p.brands.join("; ")}"`,
      p.primary_image_url,
    ].join(","));
    const csv = [headers.join(","), ...rows].join("\n");
    return { success: true, data: csv, filename: "products-export.csv" };
  } catch (e) {
    return { success: false, error: `Export failed: ${(e as Error).message}` };
  }
}
