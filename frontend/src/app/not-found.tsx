import Link from "next/link";
import type { Metadata } from "next";
import { SearchBar } from "@/components/SearchBar";

export const metadata: Metadata = {
  title: "Page Not Found | TopEngine",
};

export default function NotFound() {
  return (
    <div className="container-main py-20 lg:py-32">
      <div className="max-w-lg mx-auto text-center">
        {/* 404 indicator */}
        <div className="text-[64px] font-bold text-border leading-none mb-4">404</div>

        <h1 className="text-[28px] font-semibold text-text-primary mb-3">
          Page not found
        </h1>

        <p className="text-[15px] text-text-secondary mb-8 leading-relaxed">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
          Try searching for the part you need below.
        </p>

        {/* Search bar */}
        <div className="max-w-md mx-auto mb-8">
          <SearchBar />
        </div>

        {/* Quick links */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/"
            className="px-4 py-2 rounded-md text-[14px] font-medium bg-interactive text-text-inverse hover:bg-interactive-hover transition-colors"
          >
            Back to homepage
          </Link>
          <Link
            href="/shop"
            className="px-4 py-2 rounded-md text-[14px] font-medium border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
          >
            Browse all parts
          </Link>
          <Link
            href="/contact"
            className="px-4 py-2 rounded-md text-[14px] font-medium border border-border text-text-secondary hover:text-text-primary hover:border-border-strong transition-colors"
          >
            Contact us
          </Link>
        </div>
      </div>
    </div>
  );
}
