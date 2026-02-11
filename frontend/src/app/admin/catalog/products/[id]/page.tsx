import { getAllProducts, getCategories } from "@/lib/products";
import { notFound } from "next/navigation";
import ProductEditForm from "./ProductEditForm";

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ id: p.id.toString() }));
}

export default async function ProductDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const products = getAllProducts();
  const product = products.find((p) => p.id === parseInt(id));
  if (!product) notFound();

  const categories = getCategories();

  return <ProductEditForm product={product} allCategories={categories} />;
}
