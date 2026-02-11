import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductCard } from "@/components/ProductCard";
import { TrustStrip } from "@/components/TrustStrip";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
  formatAED,
  classifyPartType,
} from "@/lib/products";
import { extractEngineCodes } from "@/lib/engine-codes";
import { WhatsAppCTA } from "./whatsapp-cta";
import { ImageGallery } from "./image-gallery";
import { Breadcrumb } from "@/components/Breadcrumb";
import { productJsonLd, breadcrumbJsonLd } from "@/lib/json-ld";

export async function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Part not found | TopEngine" };

  const desc = product.short_description
    ? product.short_description.replace(/<[^>]+>/g, "").slice(0, 155)
    : `Genuine OEM ${product.name} for UAE vehicles. Fast delivery.`;

  return {
    title: `${product.name} | TopEngine UAE`,
    description: desc,
    alternates: {
      canonical: `https://www.topengine.ae/product/${slug}`,
    },
    openGraph: {
      title: product.name,
      description: desc,
      url: `https://www.topengine.ae/product/${slug}`,
      images: product.primary_image_url ? [product.primary_image_url] : [],
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: product.name,
      description: desc,
      images: product.primary_image_url ? [product.primary_image_url] : [],
    },
  };
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const isPurchasable = product.is_purchasable && product.price_aed > 0;
  const partType = classifyPartType(product.name);
  const engineCodes = extractEngineCodes(product.name);

  const hasGenuineSale =
    product.on_sale &&
    product.regular_price_aed > 0 &&
    product.sale_price_aed > 0 &&
    product.sale_price_aed < product.regular_price_aed;

  const related = getRelatedProducts(product, 4).filter(
    (p) => p.price_aed > 0 || p.is_purchasable
  );

  const mainCategory = product.categories[0];

  return (
    <>
      {/* JSON-LD: Product */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: productJsonLd(product) }}
      />
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: "https://www.topengine.ae" },
            { name: "Shop", url: "https://www.topengine.ae/shop" },
            ...(mainCategory
              ? [{ name: mainCategory.name, url: `https://www.topengine.ae/shop?search=${encodeURIComponent(mainCategory.name)}` }]
              : []),
            { name: product.name },
          ]),
        }}
      />

      {/* Breadcrumb */}
      <Breadcrumb
        items={[
          { label: "Shop", href: "/shop" },
          ...(mainCategory
            ? [{ label: mainCategory.name, href: `/shop?search=${encodeURIComponent(mainCategory.name)}` }]
            : []),
          { label: product.name },
        ]}
      />

      {/* Product detail */}
      <div className="container-main py-6 lg:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10">
          {/* Left: Images */}
          <div>
            <ImageGallery
              images={product.images}
              productName={product.name}
              primaryImageUrl={product.primary_image_url}
              showSaleBadge={hasGenuineSale}
            />
          </div>

          {/* Right: Product info */}
          <div>
            {/* Product name */}
            <h1 className="text-[28px] font-semibold text-text-primary leading-tight mb-2">
              {product.name}
            </h1>

            {/* SKU */}
            {product.sku && (
              <div className="mb-3">
                <span className="sku-badge text-[14px]">{product.sku}</span>
              </div>
            )}

            {/* Price block */}
            <div className="card p-4 mb-4">
              {isPurchasable ? (
                <div className="mb-3">
                  {hasGenuineSale && (
                    <div className="text-[14px] text-text-disabled line-through mb-0.5">
                      {formatAED(product.regular_price_aed)}
                    </div>
                  )}
                  <div className="text-[22px] font-bold text-text-primary leading-tight font-numeric">
                    {formatAED(product.price_aed)}
                  </div>
                  {hasGenuineSale && (
                    <div className="text-[14px] text-status-sale font-semibold mt-0.5">
                      Save {formatAED(product.regular_price_aed - product.price_aed)}
                    </div>
                  )}
                </div>
              ) : (
                <div className="mb-3">
                  <div className="text-[16px] font-semibold text-text-secondary">Price on request</div>
                  <p className="text-[14px] text-text-disabled mt-0.5">Contact us for pricing and availability.</p>
                </div>
              )}

              <div className="flex items-center gap-2 mb-4">
                {product.is_in_stock ? (
                  <>
                    <div className="w-2 h-2 rounded-full bg-status-success" />
                    <span className="text-[14px] text-status-success font-medium">In stock</span>
                  </>
                ) : (
                  <>
                    <div className="w-2 h-2 rounded-full bg-status-danger" />
                    <span className="text-[14px] text-status-danger font-medium">Contact for availability</span>
                  </>
                )}
              </div>

              {/* WhatsApp is the PRIMARY action — no "Add to cart" per catalog model */}
              <WhatsAppCTA productName={product.name} sku={product.sku} />
            </div>

            {/* Engine code badges */}
            {engineCodes.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-4">
                {engineCodes.map((code) => (
                  <span key={code} className="badge-engine">{code}</span>
                ))}
              </div>
            )}

            {/* Shipping / Returns / Warranty */}
            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="text-center p-2.5 card">
                <svg className="w-4 h-4 mx-auto mb-1 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                </svg>
                <div className="text-[12px] text-text-secondary font-medium">1-3 day delivery</div>
              </div>
              <div className="text-center p-2.5 card">
                <svg className="w-4 h-4 mx-auto mb-1 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" />
                </svg>
                <div className="text-[12px] text-text-secondary font-medium">14-day returns</div>
              </div>
              <div className="text-center p-2.5 card">
                <svg className="w-4 h-4 mx-auto mb-1 text-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                <div className="text-[12px] text-text-secondary font-medium">OEM genuine</div>
              </div>
            </div>

            {/* Specifications */}
            <div className="card overflow-hidden mb-4">
              <h2 className="font-semibold text-text-primary text-[12px] tracking-wide px-4 py-2.5 bg-surface-secondary border-b border-border">
                Specifications
              </h2>
              <table className="w-full text-[14px]">
                <tbody className="divide-y divide-border">
                  {product.sku && (
                    <tr>
                      <td className="px-4 py-2 text-text-secondary font-medium w-36">OEM part number</td>
                      <td className="px-4 py-2 font-mono text-text-primary">{product.sku}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="px-4 py-2 text-text-secondary font-medium">Type</td>
                    <td className="px-4 py-2 text-text-primary capitalize">{partType.replace(/-/g, " ")}</td>
                  </tr>
                  {engineCodes.length > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-text-secondary font-medium">Engine codes</td>
                      <td className="px-4 py-2 text-text-primary font-mono">{engineCodes.join(", ")}</td>
                    </tr>
                  )}
                  {product.categories.length > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-text-secondary font-medium">Vehicle / category</td>
                      <td className="px-4 py-2 text-text-primary">{product.categories.map((c) => c.name).join(", ")}</td>
                    </tr>
                  )}
                  <tr>
                    <td className="px-4 py-2 text-text-secondary font-medium">Stock status</td>
                    <td className="px-4 py-2">
                      {product.is_in_stock ? (
                        <span className="text-status-success font-medium">In stock</span>
                      ) : (
                        <span className="text-status-danger font-medium">Contact for availability</span>
                      )}
                    </td>
                  </tr>
                  {product.tags.length > 0 && (
                    <tr>
                      <td className="px-4 py-2 text-text-secondary font-medium">Tags</td>
                      <td className="px-4 py-2 text-text-primary">{product.tags.map((t) => t.name).join(", ")}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>

            {/* Description */}
            {product.short_description && (
              <div className="card p-4 mb-4">
                <h2 className="font-semibold text-text-primary text-[12px] tracking-wide mb-2">Description</h2>
                <div
                  className="text-[14px] text-text-secondary leading-relaxed prose prose-sm max-w-none"
                  dangerouslySetInnerHTML={{ __html: product.short_description }}
                />
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        {related.length > 0 && (
          <section className="mt-10 lg:mt-12">
            <h2 className="text-[22px] font-semibold text-text-primary mb-5">Related parts</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>

      <TrustStrip />

      {/* Sticky Mobile CTA — WhatsApp primary */}
      <div className="lg:hidden sticky-cta">
        <div className="container-main py-2.5 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <div className="font-semibold text-text-primary text-[14px] truncate">{product.name}</div>
            {isPurchasable && (
              <div className="text-text-primary font-semibold font-numeric text-[14px]">{formatAED(product.price_aed)}</div>
            )}
          </div>
          <WhatsAppCTA productName={product.name} sku={product.sku} compact />
        </div>
      </div>
    </>
  );
}
