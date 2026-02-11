import Link from "next/link";
import Image from "next/image";
import { VEHICLE_HIERARCHY } from "@/data/vehicle-hierarchy";
import { getAllProducts } from "@/lib/products";
import { Breadcrumb } from "@/components/Breadcrumb";
import { TrustStrip } from "@/components/TrustStrip";
import { breadcrumbJsonLd } from "@/lib/json-ld";
import type { Metadata } from "next";

const MAKE_LOGOS: Record<string, string> = {
  toyota: "/images/brands/toyota.png",
  nissan: "/images/brands/nissan.png",
  ford: "/images/brands/ford.png",
  mitsubishi: "/images/brands/mitsubishi.png",
};

export const metadata: Metadata = {
  title: "Shop by Vehicle | TopEngine UAE",
  description:
    "Find genuine OEM engine parts by vehicle make and model. Toyota, Nissan, Ford, Mitsubishi — fast UAE delivery.",
  alternates: { canonical: "https://www.topengine.ae/vehicles" },
  openGraph: {
    title: "Shop by Vehicle | TopEngine UAE",
    description:
      "Find genuine OEM engine parts by vehicle make and model. Fast UAE delivery.",
    url: "https://www.topengine.ae/vehicles",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Shop by Vehicle | TopEngine UAE",
    description:
      "Find genuine OEM engine parts by vehicle make and model. Fast UAE delivery.",
  },
};

export default function VehiclesIndexPage() {
  const allProducts = getAllProducts();
  const totalModels = VEHICLE_HIERARCHY.reduce(
    (sum, m) => sum + m.models.length,
    0
  );
  const totalEngines = VEHICLE_HIERARCHY.reduce(
    (sum, m) =>
      sum + m.models.reduce((s, mod) => s + mod.engines.length, 0),
    0
  );

  return (
    <>
      {/* JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: breadcrumbJsonLd([
            { name: "Home", url: "https://www.topengine.ae" },
            { name: "Vehicles" },
          ]),
        }}
      />

      <Breadcrumb items={[{ label: "Vehicles" }]} />

      {/* ━━━ HERO ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="hero">
        <div className="container-main py-12 lg:py-20 text-center">
          {/* Tagline chip */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-dark-surface border border-dark-border text-[13px] text-dark-text-secondary mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-dark-accent animate-pulse" />
            <span className="uppercase tracking-wider font-medium">
              {allProducts.length}+ Parts Available
            </span>
          </div>

          <h1 className="text-[32px] lg:text-[42px] font-bold text-dark-text-primary tracking-tight leading-tight mb-3">
            Shop Engine Parts by Vehicle
          </h1>
          <p className="text-[15px] lg:text-[16px] text-dark-text-secondary max-w-lg mx-auto mb-10">
            Find the exact part for your make and model. Genuine OEM quality
            with fast UAE delivery.
          </p>

          {/* Stats row */}
          <div className="max-w-xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-px rounded-xl overflow-hidden bg-dark-surface-hover">
            {[
              { value: VEHICLE_HIERARCHY.length, label: "Makes" },
              { value: totalModels, label: "Models" },
              { value: `${allProducts.length}+`, label: "Parts" },
              { value: totalEngines, label: "Engine Codes" },
            ].map((stat) => (
              <div key={stat.label} className="hero-stat bg-dark-surface py-4">
                <div className="hero-stat-value text-[24px]">
                  {stat.value}
                </div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ TRUST STRIP ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <TrustStrip />

      {/* ━━━ MAKES GRID ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-gap">
        <div className="container-main">
          <div className="section-label">
            <h2 className="text-[22px] font-semibold text-text-primary">
              Choose Your Make
            </h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {VEHICLE_HIERARCHY.map((make) => {
              const makePartCount = allProducts.filter((p) =>
                p.brands.some(
                  (b) => b.toLowerCase() === make.slug
                )
              ).length;
              const logo = MAKE_LOGOS[make.slug];

              return (
                <Link
                  key={make.slug}
                  href={`/vehicles/${make.slug}`}
                  className="make-card group"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-surface-secondary flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg overflow-hidden p-2">
                    {logo ? (
                      <Image
                        src={logo}
                        alt={make.name}
                        width={48}
                        height={48}
                        className="object-contain w-10 h-10"
                      />
                    ) : (
                      <span className="text-[24px] font-bold text-interactive">
                        {make.name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <h3 className="font-semibold text-text-primary text-[16px] mb-1 group-hover:text-interactive transition-colors duration-200">
                    {make.name}
                  </h3>
                  <p className="text-[13px] text-text-secondary mb-3">
                    {make.models.length} model
                    {make.models.length !== 1 ? "s" : ""}
                    {makePartCount > 0 && ` · ${makePartCount} parts`}
                  </p>
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {make.models.slice(0, 3).map((m) => (
                      <span
                        key={m.slug}
                        className="text-[12px] px-2.5 py-1 rounded-full bg-surface-secondary text-text-secondary font-medium transition-colors duration-200 group-hover:bg-interactive-subtle group-hover:text-interactive"
                      >
                        {m.name}
                      </span>
                    ))}
                    {make.models.length > 3 && (
                      <span className="text-[12px] px-2.5 py-1 rounded-full bg-surface-secondary text-text-disabled font-medium">
                        +{make.models.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ━━━ ALL MODELS QUICK-BROWSE ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="section-gap bg-surface-secondary">
        <div className="container-main">
          <div className="section-label">
            <h2 className="text-[22px] font-semibold text-text-primary">
              Browse All Models
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VEHICLE_HIERARCHY.map((make) => (
              <div key={make.slug}>
                <div className="flex items-center gap-2 mb-3">
                  {MAKE_LOGOS[make.slug] && (
                    <Image
                      src={MAKE_LOGOS[make.slug]}
                      alt=""
                      width={20}
                      height={20}
                      className="object-contain"
                    />
                  )}
                  <h3 className="font-semibold text-text-primary text-[15px]">
                    {make.name}
                  </h3>
                </div>
                <ul className="space-y-1.5">
                  {make.models.map((model) => (
                    <li key={model.slug}>
                      <Link
                        href={`/vehicles/${make.slug}/${model.slug}`}
                        className="flex items-center justify-between py-1.5 px-3 rounded-md text-[14px] text-text-secondary hover:bg-surface-elevated hover:text-interactive transition-colors group"
                      >
                        <span>{model.name}</span>
                        <span className="text-[12px] text-text-disabled group-hover:text-interactive transition-colors">
                          {model.engines.length} engine
                          {model.engines.length !== 1 ? "s" : ""}
                          <span className="ml-1">→</span>
                        </span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ━━━ CTA ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */}
      <section className="bg-dark-bg">
        <div className="container-main py-12 lg:py-16 text-center">
          <h2 className="text-[22px] font-semibold text-dark-text-primary mb-2">
            Can&apos;t find your vehicle?
          </h2>
          <p className="text-[14px] text-dark-text-secondary max-w-md mx-auto mb-6">
            We source parts for many more makes and models. Send us a message
            and we&apos;ll check availability for you.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="https://wa.me/971551521264?text=Hi%2C%20I%27m%20looking%20for%20engine%20parts%20for%20my%20vehicle."
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
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +971 55 152 1264
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
