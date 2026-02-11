import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VEHICLE_HIERARCHY, PART_TYPES } from "@/data/vehicle-hierarchy";
import { getProductsByCategory, classifyPartType } from "@/lib/products";
import { ProductCard } from "@/components/ProductCard";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustStrip } from "@/components/TrustStrip";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import type { Product } from "@/types";

const MAKE_LOGOS: Record<string, string> = {
  toyota: "/images/brands/toyota.png",
  nissan: "/images/brands/nissan.png",
  ford: "/images/brands/ford.png",
  mitsubishi: "/images/brands/mitsubishi.png",
};

export async function generateStaticParams() {
  const params: { make: string; model: string }[] = [];
  for (const make of VEHICLE_HIERARCHY) {
    for (const model of make.models) {
      params.push({ make: make.slug, model: model.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ make: string; model: string }>;
}) {
  const { make: makeSlug, model: modelSlug } = await params;
  const make = VEHICLE_HIERARCHY.find((m) => m.slug === makeSlug);
  const model = make?.models.find((m) => m.slug === modelSlug);
  if (!make || !model)
    return { title: "Vehicle Not Found | TopEngine" };

  return {
    title: `${make.name} ${model.name} Engine Parts | TopEngine UAE`,
    description: `Genuine OEM engine parts for ${make.name} ${model.name}. Engine codes: ${model.engines.map((e) => e.code).join(", ")}. Fast UAE delivery.`,
    alternates: {
      canonical: `https://www.topengine.ae/vehicles/${makeSlug}/${modelSlug}`,
    },
    openGraph: {
      title: `${make.name} ${model.name} Engine Parts | TopEngine UAE`,
      description: `Genuine OEM engine parts for ${make.name} ${model.name}. Engine codes: ${model.engines.map((e) => e.code).join(", ")}.`,
      url: `https://www.topengine.ae/vehicles/${makeSlug}/${modelSlug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${make.name} ${model.name} Engine Parts | TopEngine UAE`,
      description: `Genuine OEM engine parts for ${make.name} ${model.name}. Fast UAE delivery.`,
    },
  };
}

export default async function VehicleModelPage({
  params,
}: {
  params: Promise<{ make: string; model: string }>;
}) {
  const { make: makeSlug, model: modelSlug } = await params;
  const make = VEHICLE_HIERARCHY.find((m) => m.slug === makeSlug);
  const model = make?.models.find((m) => m.slug === modelSlug);
  if (!make || !model) notFound();

  const logo = MAKE_LOGOS[make.slug];

  // Gather all products across engine categories (deduped)
  const productSet = new Map<number, Product>();
  for (const engine of model.engines) {
    for (const catId of engine.categoryIds) {
      for (const p of getProductsByCategory(catId)) {
        productSet.set(p.id, p);
      }
    }
  }
  const products = Array.from(productSet.values());

  // Group products by part type
  const grouped = new Map<string, Product[]>();
  for (const p of products) {
    const slug = classifyPartType(p.name);
    if (!grouped.has(slug)) grouped.set(slug, []);
    grouped.get(slug)!.push(p);
  }

  // Order groups by PART_TYPES order, filter to non-empty
  const orderedGroups = PART_TYPES.filter((pt) => grouped.has(pt.slug)).map(
    (pt) => ({
      slug: pt.slug,
      name: pt.name,
      products: grouped.get(pt.slug)!,
    })
  );

  // Sibling models for cross-navigation
  const siblingModels = make.models.filter((m) => m.slug !== model.slug);

  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: "https://www.topengine.ae" },
            { name: "Vehicles", url: "https://www.topengine.ae/vehicles" },
            {
              name: make.name,
              url: `https://www.topengine.ae/vehicles/${make.slug}`,
            },
            { name: model.name },
          ]),
        }}
      />

      <Breadcrumb
        items={[
          { label: "Vehicles", href: "/vehicles" },
          { label: make.name, href: `/vehicles/${make.slug}` },
          { label: model.name },
        ]}
      />

      {/* ━━━ DARK HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="hero">
        <div className="container-main py-10 lg:py-14 text-center">
          {/* Brand logo */}
          {logo && (
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-dark-surface border border-dark-border flex items-center justify-center overflow-hidden p-2">
              <Image
                src={logo}
                alt={make.name}
                width={32}
                height={32}
                className="object-contain w-8 h-8"
              />
            </div>
          )}

          <h1 className="text-[28px] lg:text-[36px] font-bold text-dark-text-primary tracking-tight leading-tight mb-2">
            {make.name} {model.name}
          </h1>
          <p className="text-[15px] text-dark-text-secondary max-w-lg mx-auto mb-6">
            Genuine OEM engine parts for all {model.name} engine variants.
            {products.length > 0 && ` ${products.length} parts in stock.`}
          </p>

          {/* Engine badges — linked to part-type sections */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {model.engines.map((eng) => (
              <div
                key={eng.code}
                className="badge-engine !bg-dark-surface !text-dark-text-primary !border !border-dark-border px-3 py-1.5 text-[14px]"
              >
                <span className="font-mono font-semibold text-dark-accent">
                  {eng.code}
                </span>
                <span className="text-dark-text-secondary ml-1.5">
                  {eng.displacement} {eng.fuel}
                </span>
              </div>
            ))}
          </div>

          {/* Stats row */}
          <div className="max-w-sm mx-auto grid grid-cols-3 gap-px rounded-xl overflow-hidden bg-dark-surface-hover">
            {[
              { value: products.length, label: "Parts" },
              { value: model.engines.length, label: "Engine Codes" },
              { value: orderedGroups.length, label: "Categories" },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat bg-dark-surface py-3">
                <div className="hero-stat-value text-[20px]">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Cross-make navigation */}
          <nav aria-label="Vehicle makes" className="mt-8">
            <div className="flex flex-wrap items-center justify-center gap-2">
              {VEHICLE_HIERARCHY.map((m) => {
                const isActive = m.slug === make.slug;
                return (
                  <Link
                    key={m.slug}
                    href={`/vehicles/${m.slug}`}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[12px] font-medium transition-all duration-200 ${
                      isActive
                        ? "bg-interactive text-white"
                        : "bg-dark-surface text-dark-text-secondary hover:bg-dark-surface-hover hover:text-dark-text-primary border border-dark-border"
                    }`}
                    aria-current={isActive ? "page" : undefined}
                  >
                    {MAKE_LOGOS[m.slug] && (
                      <Image
                        src={MAKE_LOGOS[m.slug]}
                        alt=""
                        width={14}
                        height={14}
                        className="object-contain w-3.5 h-3.5"
                      />
                    )}
                    {m.name}
                  </Link>
                );
              })}
            </div>
          </nav>
        </div>
      </section>

      {/* ━━━ TRUST STRIP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <TrustStrip />

      {/* ━━━ SIBLING MODEL NAV ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {siblingModels.length > 0 && (
        <div className="bg-surface-secondary border-b border-border">
          <div className="container-main py-3">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <Link
                href={`/vehicles/${make.slug}`}
                className="shrink-0 text-[13px] text-text-secondary hover:text-interactive transition-colors"
              >
                ← All {make.name}
              </Link>
              <span className="text-border">|</span>
              {siblingModels.map((m) => (
                <Link
                  key={m.slug}
                  href={`/vehicles/${make.slug}/${m.slug}`}
                  className="shrink-0 text-[13px] px-2.5 py-1 rounded-full bg-surface-elevated text-text-secondary hover:text-interactive hover:bg-interactive-subtle transition-colors"
                >
                  {m.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ━━━ PRODUCTS ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <div className="container-main section-gap">
        {products.length === 0 ? (
          /* Empty state */
          <div className="text-center py-14 card max-w-lg mx-auto">
            <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-surface-secondary flex items-center justify-center">
              <svg
                className="w-7 h-7 text-text-disabled"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="text-[16px] font-semibold text-text-primary mb-1">
              No parts currently listed
            </h3>
            <p className="text-text-secondary mb-4 text-[14px] max-w-xs mx-auto">
              We may still have parts for the {make.name} {model.name} in our
              warehouse. Ask us directly!
            </p>
            <a
              href={`https://wa.me/971551521264?text=Hi%2C%20I%27m%20looking%20for%20parts%20for%20a%20${encodeURIComponent(make.name)}%20${encodeURIComponent(model.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp btn-sm"
            >
              <svg
                className="w-4 h-4"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Ask on WhatsApp
            </a>
          </div>
        ) : (
          <>
            {/* Summary header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-[18px] font-semibold text-text-primary">
                  All Parts ({products.length})
                </h2>
                <p className="text-[13px] text-text-secondary mt-0.5">
                  Across {orderedGroups.length} categories
                </p>
              </div>
              <Link
                href={`/shop?search=${encodeURIComponent(`${make.name} ${model.name}`)}`}
                className="btn btn-secondary btn-sm"
              >
                Advanced filter →
              </Link>
            </div>

            {/* Quick-jump category pills */}
            {orderedGroups.length > 1 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-border">
                {orderedGroups.map((group) => (
                  <a
                    key={group.slug}
                    href={`#category-${group.slug}`}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium bg-surface-secondary text-text-secondary hover:bg-interactive-subtle hover:text-interactive transition-colors"
                  >
                    {group.name}
                    <span className="text-[11px] text-text-disabled">
                      {group.products.length}
                    </span>
                  </a>
                ))}
              </div>
            )}

            {/* Grouped product sections */}
            {orderedGroups.map((group) => (
              <section
                key={group.slug}
                id={`category-${group.slug}`}
                className="mb-10 last:mb-0 scroll-mt-24"
              >
                <div className="section-label">
                  <h3 className="text-[18px] font-semibold text-text-primary whitespace-nowrap">
                    {group.name}
                    <span className="text-text-secondary font-normal ml-2 text-[14px]">
                      ({group.products.length})
                    </span>
                  </h3>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {group.products.slice(0, 8).map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {group.products.length > 8 && (
                  <div className="mt-4 text-center">
                    <Link
                      href={`/shop?search=${encodeURIComponent(`${make.name} ${model.name} ${group.name}`)}`}
                      className="text-[14px] text-interactive font-medium hover:text-interactive-hover transition-colors"
                    >
                      View all {group.products.length} {group.name.toLowerCase()}{" "}
                      →
                    </Link>
                  </div>
                )}
              </section>
            ))}
          </>
        )}
      </div>

      {/* ━━━ WHATSAPP CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-dark-bg">
        <div className="container-main py-10 lg:py-14 text-center">
          <h2 className="text-[20px] font-semibold text-dark-text-primary mb-2">
            Questions about {make.name} {model.name} parts?
          </h2>
          <p className="text-[14px] text-dark-text-secondary max-w-md mx-auto mb-5">
            Send us your chassis number or engine code and our team will help
            you find the exact part you need.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/971551521264?text=Hi%2C%20I%27m%20looking%20for%20parts%20for%20a%20${encodeURIComponent(make.name)}%20${encodeURIComponent(model.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
              Ask on WhatsApp
            </a>
            <a
              href="tel:+971551521264"
              className="btn btn-secondary border-dark-border text-dark-text-secondary hover:text-dark-text-primary hover:bg-dark-surface"
            >
              +971 55 152 1264
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
