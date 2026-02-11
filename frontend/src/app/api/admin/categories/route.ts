import { NextResponse } from "next/server";
import { getCategories, getAllProducts } from "@/lib/products";

export const dynamic = "force-static";

export async function GET() {
  const categories = getCategories();
  const products = getAllProducts();

  // Enrich categories with actual product counts
  const enriched = categories.map((cat) => {
    const productCount = products.filter((p) =>
      p.categories.some((c) => c.id === cat.id)
    ).length;

    return {
      ...cat,
      productCount,
    };
  });

  return NextResponse.json({ categories: enriched });
}
