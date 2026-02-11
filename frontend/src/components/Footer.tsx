import Link from "next/link";
import Image from "next/image";

const linkCls = "text-[14px] leading-normal text-dark-text-secondary transition-colors duration-150 hover:underline hover:text-dark-text-primary";

/**
 * Footer — v5.4 Design System
 * Shared background with CTA (dark-bg). 4-column grid.
 * All colors via dark-section design tokens — no inline hex.
 */
export function Footer() {
  return (
    <footer className="bg-dark-bg">

      {/* Divider from CTA */}
      <div className="container-main"><div className="border-t border-dark-border" /></div>

      {/* ── Main grid ──────────────────────────────────────── */}
      <div className="container-main py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">

          {/* Col 1 — Brand (wider on mobile) */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-3">
              <Image
                src="/images/logo.png"
                alt="TopEngine — Back to homepage"
                width={130}
                height={38}
                className="h-8 w-auto object-contain brightness-0 invert"
              />
            </Link>
            <p className="text-[13px] text-dark-text-secondary leading-relaxed">
              Genuine OEM engine parts — Sharjah, UAE
            </p>
          </div>

          {/* Col 2 — Vehicles */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-dark-text-primary">Vehicles</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/vehicles/toyota" className={linkCls}>Toyota</Link></li>
              <li><Link href="/vehicles/nissan" className={linkCls}>Nissan</Link></li>
              <li><Link href="/vehicles/ford" className={linkCls}>Ford</Link></li>
              <li><Link href="/vehicles/mitsubishi" className={linkCls}>Mitsubishi</Link></li>
              <li><Link href="/shop" className={linkCls}>All parts</Link></li>
            </ul>
          </div>

          {/* Col 3 — Company */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-dark-text-primary">Company</h4>
            <ul className="flex flex-col gap-2.5">
              <li><Link href="/about" className={linkCls}>About</Link></li>
              <li><Link href="/contact" className={linkCls}>Contact</Link></li>
              <li><Link href="/faq" className={linkCls}>FAQ</Link></li>
              <li><Link href="/returns" className={linkCls}>Returns policy</Link></li>
              <li><Link href="/order-tracking" className={linkCls}>Order status</Link></li>
            </ul>
          </div>

          {/* Col 4 — Contact */}
          <div>
            <h4 className="text-[14px] font-semibold mb-4 text-dark-text-primary">Contact</h4>
            <ul className="flex flex-col gap-3">
              <li>
                <a href="tel:+971551521264" className="flex items-center gap-2 text-[14px] text-dark-text-secondary hover:text-dark-text-primary transition-colors">
                  <svg className="w-4 h-4 shrink-0 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="font-mono">+971 55 152 1264</span>
                </a>
              </li>
              <li>
                <a href="mailto:info@topengine.ae" className="flex items-center gap-2 text-[14px] text-dark-text-secondary hover:text-dark-text-primary transition-colors">
                  <svg className="w-4 h-4 shrink-0 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-mono">info@topengine.ae</span>
                </a>
              </li>
              <li>
                <a
                  href="https://maps.google.com/?q=Sharjah+Industrial+Area+UAE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-[13px] text-dark-text-secondary hover:text-dark-text-primary transition-colors"
                >
                  <svg className="w-4 h-4 shrink-0 mt-0.5 text-dark-text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  Sharjah Industrial Area, UAE
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* ── Copyright bar ──────────────────────────────────── */}
      <div className="container-main"><div className="border-t border-dark-border" /></div>
      <div className="container-main py-5 text-center">
        <span className="text-[12px] text-dark-text-muted">
          &copy; {new Date().getFullYear()} TopEngine.ae &middot; Genuine OEM parts &middot; Sharjah, UAE
        </span>
      </div>
    </footer>
  );
}
