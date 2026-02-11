"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * ProductImage — resilient image wrapper.
 * Shows a clean placeholder when remote images fail to load (404, network error, etc.)
 */
export function ProductImage({
  fallbackText = "No image",
  ...props
}: ImageProps & { fallbackText?: string }) {
  const [hasError, setHasError] = useState(false);

  if (hasError || !props.src) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full text-text-disabled gap-1.5 bg-surface-secondary">
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-[11px]">{fallbackText}</span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={() => setHasError(true)}
    />
  );
}
