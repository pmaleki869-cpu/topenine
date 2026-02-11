import Link from "next/link";
import Image from "next/image";
import { SearchBar } from "./SearchBar";
import { MobileMenu } from "./MobileMenu";

/**
 * Header — v6.0
 * 56px band: logo | compact search (desktop) | All Parts + Vehicles | WhatsApp icon | hamburger (mobile)
 */
export function Header() {
  return (
    <header className="sticky top-0 z-40 bg-surface-inverse" role="banner">
      <div className="container-main">
        <div className="flex items-center gap-4 h-14">
          {/* Logo */}
          <Link href="/" className="flex items-center shrink-0">
            <Image
              src="/images/logo.png"
              alt="TopEngine"
              width={140}
              height={40}
              className="h-9 w-auto object-contain"
              priority
            />
          </Link>

          {/* Compact search — desktop only */}
          <div className="hidden lg:block flex-1 max-w-md">
            <SearchBar />
          </div>

          {/* Nav links — desktop only */}
          <nav className="hidden lg:flex items-center gap-1 text-[14px] font-medium shrink-0" aria-label="Main navigation">
            <Link
              href="/shop"
              className="px-3 py-2 rounded-md text-text-disabled hover:text-text-inverse transition-colors"
            >
              All Parts
            </Link>
            <Link
              href="/vehicles"
              className="px-3 py-2 rounded-md text-text-disabled hover:text-text-inverse transition-colors"
            >
              Vehicles
            </Link>
          </nav>

          {/* WhatsApp — icon-only button */}
          <a
            href="https://wa.me/971551521264?text=Hi%2C%20I%20need%20help%20finding%20an%20engine%20part."
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:flex items-center justify-center w-9 h-9 rounded-lg bg-status-success/10 text-status-success hover:bg-status-success/20 transition-colors shrink-0"
            aria-label="Chat on WhatsApp"
          >
            <svg className="w-[18px] h-[18px]" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
            </svg>
          </a>

          {/* Mobile hamburger menu */}
          <MobileMenu />
        </div>
      </div>
    </header>
  );
}
