"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function ShopError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Shop error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-red-500" />
      </div>
      <h2 className="text-lg font-semibold text-text-primary mb-1">Unable to load products</h2>
      <p className="text-sm text-text-secondary mb-6 max-w-md">
        {error.message || "Something went wrong while loading the shop. Please try again."}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-inverse bg-interactive hover:bg-interactive-hover rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-interactive/50 focus:ring-offset-2"
      >
        <RotateCcw className="w-4 h-4" />
        Try again
      </button>
      {error.digest && (
        <p className="mt-4 text-xs text-text-disabled font-mono">Error ID: {error.digest}</p>
      )}
    </div>
  );
}
