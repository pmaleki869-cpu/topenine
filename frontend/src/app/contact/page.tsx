import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Contact Us | TopEngine — Genuine Engine Parts UAE",
  description:
    "Get in touch with TopEngine for genuine OEM engine parts inquiries, bulk orders, and support. WhatsApp, email, and more.",
  alternates: {
    canonical: "https://www.topengine.ae/contact",
  },
};

export default function ContactPage() {
  const contactJsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "TopEngine",
    url: "https://www.topengine.ae",
    logo: "https://www.topengine.ae/images/logo.png",
    telephone: "+971-55-152-1264",
    email: "info@topengine.ae",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Sharjah",
      addressRegion: "Sharjah",
      addressCountry: "AE",
    },
    openingHours: "Su-Th 09:00-18:00",
    areaServed: ["AE", "SA", "OM", "KW", "BH", "QA"],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactJsonLd) }}
      />

      <Breadcrumb items={[{ label: "Contact Us" }]} />

      <div className="container-main py-8 lg:py-12 container-narrow">
        <h1 className="text-[28px] font-semibold text-text-primary mb-5">Contact Us</h1>

        <p className="text-text-secondary mb-8">
          Have a question about a part, need a bulk quote, or want to check
          availability? We&apos;re here to help.
        </p>

        <div className="grid sm:grid-cols-2 gap-5 mb-10">
          {/* WhatsApp */}
          <a
            href="https://wa.me/971551521264?text=Hi%2C%20I%20have%20a%20question%20about%20a%20part."
            target="_blank"
            rel="noopener noreferrer"
            className="card p-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-interactive-subtle flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-interactive" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1 group-hover:text-interactive transition-colors">
              WhatsApp
            </h3>
            <p className="text-[14px] text-text-secondary">
              Fastest way to reach us. Chat with a parts specialist instantly.
            </p>
          </a>

          {/* Email */}
          <a
            href="mailto:info@topengine.ae"
            className="card p-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-interactive-subtle flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-interactive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1 group-hover:text-interactive transition-colors">
              Email
            </h3>
            <p className="text-[14px] text-text-secondary">
              info@topengine.ae — we typically respond within 24 hours.
            </p>
          </a>

          {/* Phone */}
          <a href="tel:+971551521264" className="card p-6 group">
            <div className="w-12 h-12 rounded-full bg-interactive-subtle flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-interactive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1 group-hover:text-interactive transition-colors">Phone</h3>
            <p className="text-[14px] text-text-secondary">
              +971 55 152 1264 — Sun–Thu, 9AM–6PM GST.
            </p>
          </a>

          {/* Location */}
          <a
            href="https://maps.google.com/?q=Sharjah+Industrial+Area+UAE"
            target="_blank"
            rel="noopener noreferrer"
            className="card p-6 group"
          >
            <div className="w-12 h-12 rounded-full bg-interactive-subtle flex items-center justify-center mb-3">
              <svg className="w-6 h-6 text-interactive" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-text-primary mb-1 group-hover:text-interactive transition-colors">Location</h3>
            <p className="text-[14px] text-text-secondary">
              Sharjah Industrial Area, UAE. We ship across UAE &amp; GCC.
            </p>
          </a>
        </div>
      </div>
    </>
  );
}
