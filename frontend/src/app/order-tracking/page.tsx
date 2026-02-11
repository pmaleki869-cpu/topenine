import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Order Status | TopEngine — Genuine Engine Parts UAE",
  description:
    "Check the status of your TopEngine order via WhatsApp. Get real-time updates on delivery and availability.",
  alternates: {
    canonical: "https://www.topengine.ae/order-tracking",
  },
};

export default function OrderStatusPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Order Status" }]} />

      <div className="container-main py-8 lg:py-12 container-narrow">
        <h1 className="text-[28px] font-semibold text-text-primary mb-2">
          Order Status
        </h1>
        <p className="text-text-secondary mb-8 max-w-lg">
          All order updates are sent directly to your WhatsApp. If you need a
          status check, message our team with your order number and we&apos;ll
          reply right away.
        </p>

        {/* Status check CTA */}
        <div className="card p-6 sm:p-8 max-w-lg">
          <h2 className="font-semibold text-text-primary mb-1 text-[16px]">
            Check your order status
          </h2>
          <p className="text-[14px] text-text-secondary mb-5">
            Have your order number ready (e.g. #12345). Our team typically
            responds within 30 minutes during business hours.
          </p>

          <a
            href="https://wa.me/971551521264?text=Hi%2C%20I%27d%20like%20to%20check%20the%20status%20of%20my%20order."
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp text-[15px] w-full sm:w-auto"
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
            Check status on WhatsApp
          </a>

          <div className="mt-5 pt-5 border-t border-border">
            <p className="text-[13px] text-text-disabled">
              You can also email{" "}
              <a href="mailto:info@topengine.ae" className="text-interactive hover:underline">
                info@topengine.ae
              </a>{" "}
              or call{" "}
              <a href="tel:+971551521264" className="text-interactive hover:underline font-mono">
                +971 55 152 1264
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
