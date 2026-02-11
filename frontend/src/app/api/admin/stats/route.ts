import { NextResponse } from "next/server";
import { getAllProducts, getCategories } from "@/lib/products";

export const dynamic = "force-static";

export async function GET() {
  const products = getAllProducts();
  const categories = getCategories();

  const total = products.length;
  const inStock = products.filter((p) => p.is_in_stock).length;
  const outOfStock = total - inStock;
  const onSale = products.filter((p) => p.on_sale).length;
  const withImages = products.filter((p) => p.primary_image_url).length;
  const purchasable = products.filter((p) => p.is_purchasable).length;
  const variable = products.filter((p) => p.type === "variable").length;

  const priced = products.filter((p) => p.price_aed > 0);
  const avgPrice = priced.length
    ? Math.round(priced.reduce((s, p) => s + p.price_aed, 0) / priced.length)
    : 0;

  // Category breakdown for charts
  const categoryBreakdown = categories
    .map((cat) => {
      const count = products.filter((p) =>
        p.categories.some((c) => c.id === cat.id)
      ).length;
      return { name: cat.name.replace(/\s*\d+(\.\d+)?CC\s*(DIESAL|DIESEL|PETROL)?/gi, "").trim(), count, slug: cat.slug };
    })
    .sort((a, b) => b.count - a.count);

  // Price distribution (for histogram)
  const priceRanges = [
    { label: "0–50", min: 0, max: 50 },
    { label: "50–200", min: 50, max: 200 },
    { label: "200–500", min: 200, max: 500 },
    { label: "500–1K", min: 500, max: 1000 },
    { label: "1K–5K", min: 1000, max: 5000 },
    { label: "5K+", min: 5000, max: Infinity },
  ];
  const priceDistribution = priceRanges.map((r) => ({
    label: r.label,
    count: priced.filter((p) => p.price_aed >= r.min && p.price_aed < r.max).length,
  }));

  // Recent products (last 10 by ID)
  const recentProducts = [...products]
    .sort((a, b) => b.id - a.id)
    .slice(0, 10)
    .map((p) => ({
      id: p.id,
      name: p.name,
      sku: p.sku,
      price_aed: p.price_aed,
      is_in_stock: p.is_in_stock,
      primary_image_url: p.primary_image_url,
      slug: p.slug,
    }));

  return NextResponse.json({
    kpis: {
      total,
      inStock,
      outOfStock,
      onSale,
      withImages,
      purchasable,
      variable,
      avgPrice,
      categories: categories.length,
      imageCoverage: Math.round((withImages / total) * 100),
      stockRate: Math.round((inStock / total) * 100),
    },
    categoryBreakdown,
    priceDistribution,
    recentProducts,
  });
}
