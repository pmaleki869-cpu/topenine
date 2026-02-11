import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "FAQ | TopEngine — Genuine Engine Parts UAE",
  description:
    "Frequently asked questions about ordering genuine OEM engine parts from TopEngine. Shipping, returns, compatibility, and more.",
  alternates: {
    canonical: "https://www.topengine.ae/faq",
  },
};

const faqs: { q: string; a: string | React.ReactNode }[] = [
  {
    q: "Are your parts genuine OEM?",
    a: "Yes. All parts listed on TopEngine are genuine Original Equipment Manufacturer (OEM) parts. We source directly from authorized distributors to ensure authenticity and quality.",
  },
  {
    q: "How do I know if a part fits my vehicle?",
    a: "Each part is listed with its OEM part number and associated vehicle/engine code. You can search by your engine code (e.g., 1GD-FTV, YD25) or OEM number. If you're unsure, send us your vehicle details on WhatsApp and our specialists will confirm compatibility.",
  },
  {
    q: "What is your delivery time?",
    a: "For items in stock, delivery within the UAE typically takes 1–3 business days. GCC deliveries take 3–7 business days depending on the destination. For items that need to be sourced, we'll provide an estimated timeline.",
  },
  {
    q: "Do you ship outside the UAE?",
    a: "Yes, we ship across the entire GCC region including Saudi Arabia, Oman, Bahrain, Kuwait, and Qatar. Contact us for international shipping inquiries.",
  },
  {
    q: "How can I get a quote for a part?",
    a: "If a part doesn't show a price, tap \"Get quote on WhatsApp\" on the product page. This opens a WhatsApp chat with the part details pre-filled. Our team will respond with pricing within a few hours.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept bank transfers, credit/debit cards (Visa, Mastercard), and cash on delivery (within UAE). For bulk orders, we can arrange custom payment terms.",
  },
  {
    q: "Can I return a part?",
    a: "Yes, we offer returns within 14 days of delivery for unused parts in original packaging. Parts installed or showing signs of use cannot be returned. See our Returns Policy page for full details.",
  },
  {
    q: "Do you offer bulk/wholesale pricing?",
    a: "Yes. Workshops, fleet operators, and dealers can contact us for wholesale pricing. Send your parts list on WhatsApp or email and we'll provide a competitive bulk quote.",
  },
  {
    q: "How do I track my order?",
    a: (<>Once your order ships, you&apos;ll receive a tracking number via WhatsApp or email. You can also visit our <Link href="/order-tracking" className="text-interactive hover:underline font-medium">Order Status</Link> page to get in touch for a delivery update.</>),
  },
];

export default function FAQPage() {
  /* FAQPage JSON-LD — only use plain-text answers for structured data */
  const faqJsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: typeof faq.a === "string" ? faq.a : "Once your order ships, you'll receive a tracking number via WhatsApp or email. You can also visit our Order Status page to get in touch for a delivery update.",
      },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <Breadcrumb items={[{ label: "FAQ" }]} />

      <div className="container-main py-8 lg:py-12 container-narrow">
        <h1 className="text-[28px] font-semibold text-text-primary mb-2">
          Frequently Asked Questions
        </h1>
        <p className="text-text-secondary mb-10">
          Find answers to common questions about our products, shipping, and
          services.
        </p>

        <div className="divide-y divide-border">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group"
            >
              <summary className="px-6 py-4 cursor-pointer font-semibold text-text-primary hover:text-interactive transition-colors list-none flex items-center justify-between group-open:bg-surface-secondary">
                {faq.q}
                <svg
                  className="w-5 h-5 text-text-secondary shrink-0 transition-transform group-open:rotate-180"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </summary>
              <div className="px-6 pb-4 text-[14px] text-text-secondary leading-relaxed bg-surface-secondary">
                {faq.a}
              </div>
            </details>
          ))}
        </div>

        <div className="mt-10 card p-6 text-center">
          <h3 className="font-semibold text-text-primary mb-2">Still have questions?</h3>
          <p className="text-[14px] text-text-secondary mb-4">
            Our parts specialists are happy to help.
          </p>
          <a
            href="https://wa.me/971551521264?text=Hi%2C%20I%20have%20a%20question."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp text-[14px]"
          >
            Ask on WhatsApp
          </a>
        </div>
      </div>
    </>
  );
}
