"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, RotateCcw, ArrowLeft } from "lucide-react";

export default function ProductError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Product page error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-red-500" />
      </div>
      <h2 className="text-lg font-semibold text-text-primary mb-1">Product could not be loaded</h2>
      <p className="text-sm text-text-secondary mb-6 max-w-md">
        {error.message || "Something went wrong while loading this product. Please try again."}
      </p>
      <div className="flex items-center gap-3">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-white border border-border hover:bg-gray-50 rounded-lg transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop
        </Link>
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-inverse bg-interactive hover:bg-interactive-hover rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-interactive/50 focus:ring-offset-2"
        >
          <RotateCcw className="w-4 h-4" />
          Try again
        </button>
      </div>
      {error.digest && (
        <p className="mt-4 text-xs text-text-disabled font-mono">Error ID: {error.digest}</p>
      )}
    </div>
  );
}
