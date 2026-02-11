import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";
import { organizationJsonLd } from "@/lib/json-ld";
import { getAllProducts } from "@/lib/products";

export const metadata: Metadata = {
  title: "About Us | TopEngine — Genuine Engine Parts UAE",
  description:
    "TopEngine is the UAE's trusted source for genuine OEM engine parts. Learn about our commitment to quality, fast delivery, and expert support.",
  alternates: {
    canonical: "https://www.topengine.ae/about",
  },
};

export default function AboutPage() {
  const totalProducts = getAllProducts().length;

  return (
    <>
      {/* JSON-LD: Organization */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: organizationJsonLd() }}
      />

      <Breadcrumb items={[{ label: "About Us" }]} />

      <div className="container-main py-8 lg:py-12 container-narrow">
        <h1 className="text-[28px] font-semibold text-text-primary mb-5">About TopEngine</h1>

        <div className="prose max-w-none text-text-secondary space-y-6">
          <p>
            TopEngine is the UAE&apos;s trusted destination for genuine OEM engine parts.
            We specialize in providing original equipment quality components for Toyota,
            Nissan, Ford, and Mitsubishi vehicles — the most popular makes on UAE and GCC
            roads.
          </p>

          <h2 className="text-[22px] font-semibold text-text-primary">Our Mission</h2>
          <p>
            We believe every vehicle deserves genuine parts. Our mission is to make it
            easy for workshops, fleet operators, and individual vehicle owners across the
            UAE and GCC to source authentic engine components quickly and affordably.
          </p>

          <h2 className="text-[22px] font-semibold text-text-primary">What We Offer</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>{totalProducts}+ genuine OEM engine parts in our catalog</li>
            <li>Turbochargers, injectors, ECU units, transmissions, and more</li>
            <li>Parts for popular engines: 1GD-FTV, YD25, 4D56, WL, and more</li>
            <li>Fast delivery across the UAE and GCC region</li>
            <li>Expert support via WhatsApp — talk to a parts specialist</li>
            <li>Fitment guarantee — exact fit or your money back</li>
          </ul>

          <h2 className="text-[22px] font-semibold text-text-primary">Why Choose TopEngine?</h2>
          <p>
            With years of experience in the automotive parts industry, our team
            understands the importance of getting the right part for your engine.
            Every part we sell is verified for authenticity and compatibility.
          </p>

          <div className="card p-6 mt-8">
            <h3 className="font-semibold text-text-primary mb-2">Need help?</h3>
            <p className="text-[14px] mb-4">
              Our parts specialists are available on WhatsApp to help you find the
              exact part you need. Just send us your engine code or OEM part number.
            </p>
            <a
              href="https://wa.me/971551521264?text=Hi%2C%20I%20need%20help%20finding%20a%20part."
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp text-[14px]"
            >
              Chat on WhatsApp
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
