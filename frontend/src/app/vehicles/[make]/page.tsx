import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { VEHICLE_HIERARCHY } from "@/data/vehicle-hierarchy";
import { getAllProducts, getProductsByCategory } from "@/lib/products";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustStrip } from "@/components/TrustStrip";
import { breadcrumbJsonLd } from "@/lib/json-ld";

const MAKE_LOGOS: Record<string, string> = {
  toyota: "/images/brands/toyota.png",
  nissan: "/images/brands/nissan.png",
  ford: "/images/brands/ford.png",
  mitsubishi: "/images/brands/mitsubishi.png",
};

export async function generateStaticParams() {
  return VEHICLE_HIERARCHY.map((make) => ({ make: make.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ make: string }>;
}) {
  const { make: makeSlug } = await params;
  const make = VEHICLE_HIERARCHY.find((m) => m.slug === makeSlug);
  if (!make) return { title: "Vehicle Not Found | TopEngine" };

  return {
    title: `${make.name} Engine Parts | TopEngine UAE`,
    description: `Genuine OEM engine parts for ${make.name} vehicles. Browse by model and engine code. Fast UAE delivery.`,
    alternates: {
      canonical: `https://www.topengine.ae/vehicles/${makeSlug}`,
    },
    openGraph: {
      title: `${make.name} Engine Parts | TopEngine UAE`,
      description: `Genuine OEM engine parts for ${make.name} vehicles. Browse by model and engine code.`,
      url: `https://www.topengine.ae/vehicles/${makeSlug}`,
      type: "website",
    },
    twitter: {
      card: "summary",
      title: `${make.name} Engine Parts | TopEngine UAE`,
      description: `Genuine OEM engine parts for ${make.name} vehicles. Fast UAE delivery.`,
    },
  };
}

/** Count unique products for a given model (deduped across engine categories) */
function getModelProductCount(model: { engines: { categoryIds: number[] }[] }): number {
  const seen = new Set<number>();
  for (const engine of model.engines) {
    for (const catId of engine.categoryIds) {
      for (const p of getProductsByCategory(catId)) {
        seen.add(p.id);
      }
    }
  }
  return seen.size;
}

export default async function VehicleMakePage({
  params,
}: {
  params: Promise<{ make: string }>;
}) {
  const { make: makeSlug } = await params;
  const make = VEHICLE_HIERARCHY.find((m) => m.slug === makeSlug);
  if (!make) notFound();

  const allProducts = getAllProducts();
  const logo = MAKE_LOGOS[make.slug];

  const makePartCount = allProducts.filter((p) =>
    p.brands.some((b) => b.toLowerCase() === make.slug)
  ).length;
  const totalEngines = make.models.reduce(
    (sum, m) => sum + m.engines.length,
    0
  );

  return (
    <>
      {/* JSON-LD: BreadcrumbList */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: "https://www.topengine.ae" },
            { name: "Vehicles", url: "https://www.topengine.ae/vehicles" },
            { name: make.name },
          ]),
        }}
      />

      <Breadcrumb
        items={[
          { label: "Vehicles", href: "/vehicles" },
          { label: make.name },
        ]}
      />

      {/* ━━━ DARK HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="hero">
        <div className="container-main py-10 lg:py-16 text-center">
          {/* Brand logo */}
          <div className="w-20 h-20 mx-auto mb-5 rounded-2xl bg-dark-surface border border-dark-border flex items-center justify-center overflow-hidden p-3">
            {logo ? (
              <Image
                src={logo}
                alt={make.name}
                width={56}
                height={56}
                className="object-contain w-12 h-12"
              />
            ) : (
              <span className="text-[32px] font-bold text-dark-accent">
                {make.name.charAt(0)}
              </span>
            )}
          </div>

          <h1 className="text-[30px] lg:text-[38px] font-bold text-dark-text-primary tracking-tight leading-tight mb-2">
            {make.name} Engine Parts
          </h1>
          <p className="text-[15px] text-dark-text-secondary max-w-md mx-auto mb-8">
            Select your {make.name} model below. Genuine OEM parts for all
            engine variants with fast UAE delivery.
          </p>

          {/* Stats row */}
          <div className="max-w-md mx-auto grid grid-cols-3 gap-px rounded-xl overflow-hidden bg-dark-surface-hover">
            {[
              { value: make.models.length, label: "Models" },
              { value: makePartCount > 0 ? `${makePartCount}+` : "—", label: "Parts" },
              { value: totalEngines, label: "Engine Codes" },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat bg-dark-surface py-3">
                <div className="hero-stat-value text-[22px]">{stat.value}</div>
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
                    className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full text-[13px] font-medium transition-all duration-200 ${
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
                        width={16}
                        height={16}
                        className="object-contain w-4 h-4"
                      />
                    )}
                    {m.name}
                  </Link>
                );
              })}
              <Link
                href="/vehicles"
                className="px-4 py-1.5 rounded-full text-[13px] font-medium bg-dark-surface text-dark-text-muted hover:text-dark-text-secondary border border-dark-border transition-colors"
              >
                All makes
              </Link>
            </div>
          </nav>
        </div>
      </section>

      {/* ━━━ TRUST STRIP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <TrustStrip />

      {/* ━━━ MODELS GRID ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-gap">
        <div className="container-main">
          <div className="section-label">
            <h2 className="text-[22px] font-semibold text-text-primary">
              {make.name} Models
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {make.models.map((model) => {
              const productCount = getModelProductCount(model);
              const hasDiesel = model.engines.some((e) => e.fuel === "diesel");
              const hasPetrol = model.engines.some((e) => e.fuel === "petrol");

              return (
                <Link
                  key={model.slug}
                  href={`/vehicles/${make.slug}/${model.slug}`}
                  className="group product-card overflow-hidden"
                >
                  {/* Accent top bar */}
                  <div className="h-1 bg-interactive" />

                  <div className="p-5">
                    {/* Model name + fuel tags */}
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <h3 className="text-[17px] font-semibold text-text-primary group-hover:text-interactive transition-colors">
                        {model.name}
                      </h3>
                      <div className="flex gap-1 shrink-0 mt-0.5">
                        {hasDiesel && (
                          <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-surface-secondary text-text-secondary">
                            Diesel
                          </span>
                        )}
                        {hasPetrol && (
                          <span className="text-[11px] font-medium uppercase tracking-wider px-2 py-0.5 rounded bg-surface-secondary text-text-secondary">
                            Petrol
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Part count */}
                    <p className="text-[14px] text-text-secondary mb-3">
                      {productCount > 0
                        ? `${productCount} genuine parts available`
                        : `${model.engines.length} engine variant${model.engines.length !== 1 ? "s" : ""}`}
                    </p>

                    {/* Engine badges */}
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {model.engines.map((eng) => (
                        <span key={eng.code} className="badge-engine">
                          {eng.code} {eng.displacement}
                        </span>
                      ))}
                    </div>

                    {/* CTA */}
                    <div className="flex items-center text-[14px] text-interactive font-medium">
                      Browse parts
                      <svg
                        className="w-4 h-4 ml-1 transition-transform duration-200 group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5l7 7-7 7"
                        />
                      </svg>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ WHATSAPP CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-dark-bg">
        <div className="container-main py-10 lg:py-14 text-center">
          <h2 className="text-[20px] font-semibold text-dark-text-primary mb-2">
            Need help finding {make.name} parts?
          </h2>
          <p className="text-[14px] text-dark-text-secondary max-w-md mx-auto mb-5">
            Our team specializes in {make.name} engine components. Send us your
            chassis number or engine code and we&apos;ll find the exact part.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href={`https://wa.me/971551521264?text=Hi%2C%20I%27m%20looking%20for%20engine%20parts%20for%20my%20${encodeURIComponent(make.name)}.`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
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
