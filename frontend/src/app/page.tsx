import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { UnifiedSearch } from "@/components/UnifiedSearch";
import { InStockShowcase } from "@/components/InStockShowcase";
import { getAllProducts, getInStockByMake, getOnSaleProducts } from "@/lib/products";
import { VEHICLE_HIERARCHY, PART_TYPES } from "@/data/vehicle-hierarchy";
import { organizationJsonLd } from "@/lib/json-ld";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TopEngine — Genuine OEM Engine Parts UAE | Dubai Auto Parts",
  description:
    "Shop 600+ genuine OEM engine parts for Toyota, Nissan, Ford & Mitsubishi. Turbochargers, injectors, ECU units, alternators & more. Fast UAE & GCC delivery. WhatsApp support.",
  alternates: {
    canonical: "https://www.topengine.ae",
  },
};

/* ═══════════════════════════════════════════════════════════════════════════
   Homepage — TopEngine UAE v5.1 — Impact Redesign
   1. Cinematic hero with integrated search + stats
   2. In stock now (products grid)
   3. Trust strip
   4. Shop by category (bold category cards)
   5. Shop by vehicle (make cards with hover accents)
   6. Recently added (products grid)
   7. WhatsApp CTA (dark gradient banner)
   ═══════════════════════════════════════════════════════════════════════════ */

// ─── Part-type icon (20×20) ──────────────────────────────────────────────────
function PartTypeIcon({ slug }: { slug: string }) {
  const cls = "w-5 h-5";
  switch (slug) {
    case "turbo":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
        </svg>
      );
    case "ecu":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
        </svg>
      );
    case "injector-fuel":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      );
    case "transmission":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v10M12 4v16M16 7v10M4 12h16" />
        </svg>
      );
    case "sensor":
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      );
    default:
      return (
        <svg className={cls} fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
        </svg>
      );
  }
}



const MAKE_LOGOS: Record<string, string> = {
  toyota: "/images/brands/toyota.png",
  nissan: "/images/brands/nissan.png",
  ford: "/images/brands/ford.png",
  mitsubishi: "/images/brands/mitsubishi.png",
};

export default function HomePage() {
  const allProducts = getAllProducts();

  const featured = allProducts
    .filter((p) => p.is_purchasable && p.price_aed > 0 && p.is_in_stock)
    .slice(0, 8);

  const { groups: makeGroups, all: allMix, totalInStock } = getInStockByMake();

  const recent = [...allProducts]
    .filter((p) => p.price_aed > 0)
    .sort((a, b) => b.id - a.id)
    .slice(0, 8);

  const topPartTypes = PART_TYPES.filter((pt) => pt.slug !== "other").slice(0, 6);

  // On-sale products for Deals section
  const onSale = getOnSaleProducts(4);

  // Compute real stats for the stats counter
  const totalEngineCodes = new Set(
    VEHICLE_HIERARCHY.flatMap((m) =>
      m.models.flatMap((mod) => mod.engines.map((e) => e.code))
    )
  ).size;
  const totalPartTypes = PART_TYPES.filter((pt) => pt.slug !== "other").length;

  return (
    <>
      {/* JSON-LD: Organization + WebSite */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
      />

      {/* ━━━ 1. HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section id="hero" className="hero">
        <div className="container-main relative z-30 pt-12 pb-12 lg:pt-16 lg:pb-16">
          <div className="max-w-2xl mx-auto text-center">
            {/* Contextual label */}
            <p className="text-[13px] uppercase tracking-[0.12em] text-dark-text-muted mb-3">
              OEM Engine Components &mdash; UAE
            </p>

            {/* Headline */}
            <h1 className="text-[32px] lg:text-[40px] font-bold text-dark-text-primary leading-[1.1] tracking-tight mb-2">
              Diesel Engine Parts. Sourced Direct.
            </h1>

            {/* Subheadline */}
            <p className="text-[15px] lg:text-[16px] text-dark-text-secondary mb-6 leading-relaxed">
              Toyota, Nissan, Ford, Mitsubishi. Search by OEM number or engine code.
            </p>

            {/* Hero search — professional typewriter + instant search */}
            <UnifiedSearch variant="hero" />

            {/* Helper text with fallback links */}
            <p className="text-[13px] text-dark-text-muted mt-4">
              <Link href="/shop" className="text-dark-text-muted hover:text-interactive underline-offset-2 hover:underline transition-colors">
                Browse all parts
              </Link>
              {" \u00B7 "}
              <Link href="/vehicles" className="text-dark-text-muted hover:text-interactive underline-offset-2 hover:underline transition-colors">
                Browse by vehicle
              </Link>
            </p>

            {/* Trust line — plain text, no icons */}
            <div className="mt-5 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[12px] text-dark-text-muted">
              <span>OEM &amp; Genuine Parts</span>
              <span className="text-dark-text-muted/40">·</span>
              <span>UAE Delivery 1–3 Days</span>
              <span className="text-dark-text-muted/40">·</span>
              <span>14-Day Returns</span>
            </div>
          </div>
        </div>
      </section>

      {/* ━━━ 2. TRUST BAR (hero → content bridge) ━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="trust-bar section-gap-sm">
        <div className="container-main">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {[
              {
                label: "OEM Genuine Parts",
                desc: "Factory-direct sourcing",
                icon: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /></svg>,
              },
              {
                label: "1–3 Day UAE Delivery",
                desc: "Sharjah warehouse",
                icon: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" /></svg>,
              },
              {
                label: "WhatsApp Support",
                desc: "Replies in 30 min",
                icon: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" /></svg>,
              },
              {
                label: "14-Day Returns",
                desc: "Hassle-free policy",
                icon: <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z" /></svg>,
              },
            ].map((item) => (
              <div key={item.label} className="trust-bar-item">
                <div className="trust-bar-icon">
                  {item.icon}
                </div>
                <div>
                  <div className="text-[14px] font-semibold text-text-primary leading-tight">{item.label}</div>
                  <div className="text-[12px] text-text-secondary leading-tight mt-0.5 hidden sm:block">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 3. IN STOCK NOW ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-gap">
        <div className="container-main">
          <InStockShowcase
            groups={makeGroups}
            allProducts={allMix}
            totalInStock={totalInStock}
          />
        </div>
      </section>

      {/* ━━━ 4. WHY TOPENGINE — STATS COUNTER ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="stats-section section-gap">
        <div className="container-main relative z-10">
          <div className="text-center mb-8">
            <p className="text-[12px] uppercase tracking-[0.12em] text-dark-text-muted mb-2">Why TopEngine</p>
            <h2 className="text-[22px] lg:text-[28px] font-bold text-dark-text-primary">
              Your Trusted OEM Parts Source
            </h2>
          </div>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                number: `${allProducts.length}+`,
                label: "OEM Parts Listed",
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>,
              },
              {
                number: `${VEHICLE_HIERARCHY.length}`,
                label: "Vehicle Makes",
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7v10M12 4v16M16 7v10M4 12h16" /></svg>,
              },
              {
                number: `${totalEngineCodes}`,
                label: "Engine Codes",
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.573-1.066z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>,
              },
              {
                number: `${totalPartTypes}`,
                label: "Part Categories",
                icon: <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>,
              },
            ].map((stat) => (
              <div key={stat.label} className="stat-card">
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ 5. SHOP BY CATEGORY ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-gap section-accent-bg">
        <div className="container-main">
          <div className="section-label">
            <h2 className="text-[22px] font-semibold text-text-primary">
              Shop by Category
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {topPartTypes.map((pt) => {
              const partCount = allProducts.filter((p) =>
                p.categories.some((c) => c.slug === pt.slug)
              ).length;

              return (
                <Link key={pt.slug} href={`/shop?partType=${pt.slug}`} className="cat-card group">
                  <div className="w-12 h-12 rounded-xl bg-interactive-subtle text-interactive flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                    <PartTypeIcon slug={pt.slug} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-text-primary text-[16px] group-hover:text-interactive transition-colors duration-200">
                      {pt.name}
                    </h3>
                    <p className="text-[13px] text-text-secondary mt-0.5">
                      {partCount > 0 ? `${partCount} genuine OEM parts` : "Browse genuine OEM parts"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {partCount > 0 && (
                      <span className="hidden sm:inline-flex text-[12px] font-medium px-2 py-0.5 rounded-full bg-interactive-subtle text-interactive">
                        {partCount}
                      </span>
                    )}
                    <svg className="w-5 h-5 text-text-disabled group-hover:text-interactive transition-all duration-200 group-hover:translate-x-1 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ 6. SHOP BY VEHICLE (enriched v2) ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-gap bg-surface-secondary">
        <div className="container-main">
          <div className="section-label">
            <h2 className="text-[22px] font-semibold text-text-primary">
              Shop by Vehicle
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {VEHICLE_HIERARCHY.map((make) => {
              const makePartCount = allProducts.filter((p) =>
                p.brands.some((b) => b.toLowerCase() === make.slug)
              ).length;

              const logo = MAKE_LOGOS[make.slug];
              const engineCodes = Array.from(
                new Set(make.models.flatMap((m) => m.engines.map((e) => e.code)))
              );

              return (
                <Link key={make.slug} href={`/vehicles/${make.slug}`} className="make-card-v2 group">
                  {/* Logo */}
                  <div className="w-16 h-16 rounded-2xl bg-surface-secondary flex items-center justify-center shrink-0 transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg overflow-hidden p-2">
                    {logo ? (
                      <Image src={logo} alt={make.name} width={48} height={48} className="object-contain w-10 h-10" />
                    ) : (
                      <span className="text-[24px] font-bold text-interactive">
                        {make.name.charAt(0)}
                      </span>
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold text-text-primary text-[17px] group-hover:text-interactive transition-colors duration-200">
                        {make.name}
                      </h3>
                      {makePartCount > 0 && (
                        <span className="text-[12px] font-medium px-2 py-0.5 rounded-full bg-interactive-subtle text-interactive">
                          {makePartCount} parts
                        </span>
                      )}
                    </div>

                    {/* Models */}
                    <p className="text-[13px] text-text-secondary mb-2.5">
                      {make.models.map((m) => m.name).join(" · ")}
                    </p>

                    {/* Engine code badges */}
                    <div className="flex flex-wrap gap-1.5">
                      {engineCodes.slice(0, 4).map((code) => (
                        <span key={code} className="badge-engine">
                          {code}
                        </span>
                      ))}
                      {engineCodes.length > 4 && (
                        <span className="text-[12px] px-2 py-0.5 rounded bg-surface-secondary text-text-disabled font-medium">
                          +{engineCodes.length - 4}
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Arrow */}
                  <svg className="w-5 h-5 text-text-disabled group-hover:text-interactive transition-all duration-200 group-hover:translate-x-1 shrink-0 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ 7. DEALS & SAVINGS (conditional) ━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      {onSale.length > 0 && (
        <section className="section-gap">
          <div className="container-main">
            <div className="section-label">
              <h2 className="text-[22px] font-semibold text-text-primary">
                <span className="inline-flex items-center gap-2">
                  Deals &amp; Savings
                  <span className="text-[12px] font-medium px-2.5 py-1 rounded-full bg-[#FFF7ED] text-status-sale">
                    SALE
                  </span>
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {onSale.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/shop?sort=price-asc" className="btn btn-secondary">
                View all deals →
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ━━━ 8. RECENTLY ADDED ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-gap bg-surface-secondary">
        <div className="container-main">
          <div className="section-label">
            <h2 className="text-[22px] font-semibold text-text-primary">
              Recently Added
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {recent.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/shop?sort=newest" className="btn btn-secondary">
              See all new arrivals →
            </Link>
          </div>
        </div>
      </section>

      {/* ━━━ 9. BRAND SHOWCASE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="brand-strip section-gap-sm">
        <div className="container-main">
          <div className="text-center mb-5">
            <p className="text-[12px] uppercase tracking-[0.12em] text-text-disabled mb-1">Trusted OEM Brands</p>
            <p className="text-[14px] text-text-secondary">Factory-authorized parts from the world&apos;s leading manufacturers</p>
          </div>
          <div className="flex items-center justify-center gap-8 lg:gap-16">
            {VEHICLE_HIERARCHY.map((make) => {
              const logo = MAKE_LOGOS[make.slug];
              return logo ? (
                <Link key={make.slug} href={`/vehicles/${make.slug}`} className="brand-logo block">
                  <Image
                    src={logo}
                    alt={`${make.name} genuine parts`}
                    width={64}
                    height={64}
                    className="w-12 h-12 lg:w-16 lg:h-16 object-contain"
                  />
                </Link>
              ) : null;
            })}
          </div>
        </div>
      </section>

      {/* ━━━ 10. CTA + FOOTER SYSTEM ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-dark-bg">
        <div className="cta-accent-top" />
        <div className="container-main py-16 lg:py-12">
          <div className="flex flex-col lg:flex-row lg:items-start gap-10 lg:gap-16">

            {/* Left — headline + actions */}
            <div className="flex-1 flex flex-col">
              {/* Status badge */}
              <div className="inline-flex items-center gap-2 mb-5 self-start px-3 py-1.5 rounded-full bg-status-success/10 border border-status-success/[0.18]">
                <span className="w-1.5 h-1.5 rounded-full bg-dark-accent" />
                <span className="text-[12px] font-semibold text-dark-accent tracking-wide">Typically replies within 30 minutes</span>
              </div>

              {/* Headline */}
              <h2 className="text-[22px] lg:text-[28px] font-bold mb-3 text-dark-text-primary leading-[1.2]">
                Can&apos;t Find Your Part?
              </h2>

              {/* Description */}
              <p className="text-[15px] max-w-lg mb-6 text-dark-text-secondary leading-relaxed">
                Send us an OEM part number, engine code, or vehicle details.
                Our UAE-based specialists will locate and quote it — free, no obligation.
              </p>

              {/* Action row */}
              <div className="flex flex-row items-center gap-3 mb-6">
                <a
                  href="https://wa.me/971551521264?text=Hi%2C%20I%20need%20help%20finding%20an%20engine%20part."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp text-[15px]"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
                  </svg>
                  Chat on WhatsApp
                </a>
                <a
                  href="tel:+971551521264"
                  className="inline-flex items-center gap-2 text-[14px] font-medium rounded-lg px-4 py-3 text-dark-text-secondary border border-dark-border hover:bg-dark-surface-hover transition-colors"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-mono">+971 55 152 1264</span>
                </a>
              </div>

              {/* Trust row */}
              <div className="flex flex-row flex-wrap items-center gap-4">
                {['Free quote', '100% genuine OEM', 'UAE & GCC delivery'].map((t) => (
                  <span key={t} className="inline-flex items-center gap-1.5 text-[12px] font-medium text-dark-text-muted">
                    <svg className="w-3.5 h-3.5 text-dark-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — How It Works (360px) */}
            <div className="w-full lg:w-[360px] shrink-0">
              <p className="text-[14px] font-semibold mb-4 text-dark-text-primary">How it works</p>

              <div className="flex flex-col gap-0">
                {[
                  { n: '1', label: 'Send part details', desc: 'OEM number, engine code, VIN, or just describe what you need.' },
                  { n: '2', label: 'Receive a free quote', desc: 'We source from our OEM supplier network and send pricing.' },
                  { n: '3', label: 'Get it delivered', desc: 'Confirm your order — genuine part arrives in 1–3 days.' },
                ].map((step, i) => (
                  <div key={step.n}>
                    {i > 0 && <div className="w-px h-2 ml-[19px] bg-dark-surface-hover" />}
                    <div className="flex items-start gap-3 py-3 px-3 rounded-lg bg-dark-surface">
                      <div className="w-7 h-7 rounded flex items-center justify-center text-[12px] font-bold shrink-0 bg-status-success/[0.12] text-dark-accent">
                        {step.n}
                      </div>
                      <div>
                        <div className="text-[14px] font-semibold text-dark-text-primary leading-[1.4]">{step.label}</div>
                        <div className="text-[13px] text-dark-text-secondary leading-[1.5]">{step.desc}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
