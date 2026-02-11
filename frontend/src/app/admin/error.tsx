"use client";

import { useEffect } from "react";
import { AlertTriangle, RotateCcw } from "lucide-react";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Admin error:", error);
  }, [error]);

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] text-center px-4">
      <div className="w-14 h-14 rounded-2xl bg-red-50 flex items-center justify-center mb-4">
        <AlertTriangle className="w-7 h-7 text-red-500" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900 mb-1">Something went wrong</h2>
      <p className="text-sm text-gray-500 mb-6 max-w-md">
        {error.message || "An unexpected error occurred while loading this page."}
      </p>
      <button
        onClick={reset}
        className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-2"
      >
        <RotateCcw className="w-4 h-4" />
        Try again
      </button>
      {error.digest && (
        <p className="mt-4 text-xs text-gray-400 font-mono">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  );
}
