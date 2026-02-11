import { NextRequest, NextResponse } from "next/server";
import { getAllProducts, getCategories } from "@/lib/products";

export const dynamic = "force-static";

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Math.max(1, parseInt(searchParams.get("page") || "1", 10));
  const perPage = Math.min(100, Math.max(1, parseInt(searchParams.get("per_page") || "20", 10)));
  const search = searchParams.get("search") || "";
  const category = searchParams.get("category") || "";
  const stock = searchParams.get("stock") || "all"; // all | in | out
  const sortBy = searchParams.get("sort") || "id"; // id | name | price
  const sortDir = searchParams.get("dir") || "desc"; // asc | desc

  let products = getAllProducts();

  // Filter by search
  if (search) {
    const q = search.toLowerCase().replace(/[-\s]/g, "");
    products = products.filter(
      (p) =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().replace(/[-\s]/g, "").includes(q) ||
        String(p.id).includes(search)
    );
  }

  // Filter by category
  if (category) {
    products = products.filter((p) =>
      p.categories.some((c) => c.slug === category)
    );
  }

  // Filter by stock
  if (stock === "in") {
    products = products.filter((p) => p.is_in_stock);
  } else if (stock === "out") {
    products = products.filter((p) => !p.is_in_stock);
  }

  // Sort
  products = [...products].sort((a, b) => {
    let cmp = 0;
    if (sortBy === "name") cmp = a.name.localeCompare(b.name);
    else if (sortBy === "price") cmp = a.price_aed - b.price_aed;
    else cmp = a.id - b.id;
    return sortDir === "asc" ? cmp : -cmp;
  });

  const total = products.length;
  const totalPages = Math.ceil(total / perPage);
  const offset = (page - 1) * perPage;
  const paginated = products.slice(offset, offset + perPage);

  return NextResponse.json({
    products: paginated,
    pagination: {
      page,
      perPage,
      total,
      totalPages,
    },
  });
}
