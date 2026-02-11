import type { Metadata } from "next";
import { Breadcrumb } from "@/components/Breadcrumb";

export const metadata: Metadata = {
  title: "Returns Policy | TopEngine — Genuine Engine Parts UAE",
  description:
    "TopEngine returns and refund policy for genuine OEM engine parts. Learn about our return process, conditions, and refund timeline.",
  alternates: {
    canonical: "https://www.topengine.ae/returns",
  },
};

export default function ReturnsPage() {
  return (
    <>
      <Breadcrumb items={[{ label: "Returns Policy" }]} />

      <div className="container-main py-8 lg:py-12 container-narrow">
        <h1 className="text-[28px] font-semibold text-text-primary mb-5">
          Returns &amp; Refund Policy
        </h1>

        <div className="prose max-w-none text-text-secondary space-y-6">
          <h2 className="text-[22px] font-semibold text-text-primary">Return Window</h2>
          <p>
            You may return any unused part within <strong>14 days</strong> of
            delivery. The part must be in its original packaging, unopened, and
            in resalable condition.
          </p>

          <h2 className="text-[22px] font-semibold text-text-primary">Non-Returnable Items</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Parts that have been installed or show signs of use</li>
            <li>Electrical components (ECU, sensors) once opened</li>
            <li>Custom-ordered or special-request parts</li>
            <li>Parts purchased more than 14 days ago</li>
          </ul>

          <h2 className="text-[22px] font-semibold text-text-primary">Fitment Guarantee</h2>
          <p>
            If a part does not fit your vehicle as specified, we offer a full
            refund or free exchange. Please provide your vehicle details (VIN,
            engine code) when requesting a fitment claim so we can verify
            compatibility.
          </p>

          <h2 className="text-[22px] font-semibold text-text-primary">How to Initiate a Return</h2>
          <ol className="list-decimal pl-6 space-y-2">
            <li>
              Contact us via WhatsApp or email with your order number and reason
              for return.
            </li>
            <li>
              We&apos;ll confirm eligibility and provide a return shipping address.
            </li>
            <li>
              Ship the part back in its original packaging. Customer covers
              return shipping unless it&apos;s a fitment guarantee claim.
            </li>
            <li>
              Once received and inspected, we&apos;ll process the refund within 5–7
              business days.
            </li>
          </ol>

          <h2 className="text-[22px] font-semibold text-text-primary">Refund Method</h2>
          <p>
            Refunds are issued to the original payment method. Bank transfer
            refunds may take 3–5 additional business days to appear in your
            account.
          </p>

          <div className="card p-6 mt-8">
            <h3 className="font-semibold text-text-primary mb-2">Questions about a return?</h3>
            <p className="text-[14px] mb-4">
              Our team is ready to help with any return or refund inquiries.
            </p>
            <a
              href="https://wa.me/971551521264?text=Hi%2C%20I%20need%20help%20with%20a%20return."
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
