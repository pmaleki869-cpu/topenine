import Link from "next/link";
import type { Product } from "@/types";
import { formatAED } from "@/lib/products";
import { ProductImage } from "@/components/ProductImage";

interface ProductCardProps {
  product: Product;
}

/**
 * ProductCard — v5.2 Enhanced Design
 * Rich card: image with hover zoom → category label → name → stock status → price + action
 */
export function ProductCard({ product }: ProductCardProps) {
  const hasPrice = product.price_aed > 0;

  const hasGenuineSale =
    product.on_sale &&
    product.regular_price_aed > 0 &&
    product.sale_price_aed > 0 &&
    product.sale_price_aed < product.regular_price_aed;

  const isOutOfStock = !product.is_in_stock;
  const isInStock = product.is_in_stock && hasPrice;

  /* Discount percentage for sale items */
  const discountPct =
    hasGenuineSale
      ? Math.round(
          ((product.regular_price_aed - product.sale_price_aed) /
            product.regular_price_aed) *
            100
        )
      : 0;

  /* Category label from first category */
  const categoryLabel = product.categories?.[0]?.name ?? null;

  /* SKU short – show last segment if long */
  const skuShort = product.sku
    ? product.sku.length > 16
      ? "…" + product.sku.slice(-12)
      : product.sku
    : null;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="product-card group"
    >
      {/* ── Image area ─────────────────────────────────────────── */}
      <div className="product-card-image">
        <ProductImage
          src={product.primary_image_url || ""}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          className="object-contain p-3 transition-transform duration-300 group-hover:scale-110"
          fallbackText="No image"
        />

        {/* Badges — top-left stack */}
        <div className="absolute top-2 left-2 flex flex-col gap-1">
          {hasGenuineSale && !isOutOfStock && (
            <span className="badge badge-sale">
              -{discountPct}%
            </span>
          )}
          {isOutOfStock && (
            <span className="badge badge-oos">
              Out of stock
            </span>
          )}
        </div>
      </div>

      {/* ── Content area ───────────────────────────────────────── */}
      <div className="p-3 sm:p-4 flex flex-col flex-1">
        {/* Category + SKU row */}
        <div className="flex items-center justify-between gap-2 mb-1.5">
          {categoryLabel && (
            <span className="text-[12px] font-medium uppercase tracking-wider text-interactive truncate">
              {categoryLabel}
            </span>
          )}
          {skuShort && (
            <span className="text-[10px] font-mono text-text-disabled tracking-wide shrink-0 hidden sm:inline">
              {skuShort}
            </span>
          )}
        </div>

        {/* Product name */}
        <h3 className="text-[14px] sm:text-[15px] font-medium text-text-primary leading-snug line-clamp-2 mb-2 group-hover:text-interactive transition-colors duration-200">
          {product.name}
        </h3>

        {/* Spacer pushes price/stock to bottom */}
        <div className="mt-auto" />

        {/* Stock indicator */}
        <div className="flex items-center gap-1.5 mb-2">
          {isInStock ? (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-status-success shrink-0" />
              <span className="text-[12px] font-medium text-status-success">In Stock</span>
            </>
          ) : (
            <>
              <span className="w-1.5 h-1.5 rounded-full bg-status-warning shrink-0" />
              <span className="text-[12px] font-medium text-text-secondary">Contact for availability</span>
            </>
          )}
        </div>

        {/* Price row */}
        <div className="flex items-end gap-2">
          {hasPrice ? (
            <>
              <span className="text-[17px] sm:text-[18px] font-bold text-text-primary font-numeric leading-none">
                {formatAED(product.price_aed)}
              </span>
              {hasGenuineSale && (
                <span className="text-[12px] text-text-disabled line-through font-numeric leading-none mb-0.5">
                  {formatAED(product.regular_price_aed)}
                </span>
              )}
            </>
          ) : (
            <span className="text-[13px] text-text-secondary italic">Price on request</span>
          )}
        </div>
      </div>
    </Link>
  );
}
