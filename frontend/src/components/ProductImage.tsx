"use client";

import { useState } from "react";
import Image, { type ImageProps } from "next/image";

/**
 * ProductImage — resilient image wrapper.
 * Shows local images when available, branded placeholder when images are missing.
 */
export function ProductImage({
  fallbackText = "No image",
  ...props
}: ImageProps & { fallbackText?: string }) {
  const [hasError, setHasError] = useState(false);

  // Check if this is a valid image source
  const hasValidSrc = props.src && typeof props.src === "string" && props.src.length > 0;

  if (hasError || !hasValidSrc) {
    return (
      <div className="flex flex-col items-center justify-center w-full h-full gap-2 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900">
        {/* Engine/gear icon */}
        <svg
          className="w-12 h-12 text-gray-300 dark:text-gray-600"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.066 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.573 1.066c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.066-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        <span className="text-[11px] font-medium text-gray-400 dark:text-gray-500 uppercase tracking-wider">
          {fallbackText}
        </span>
      </div>
    );
  }

  return (
    <Image
      {...props}
      onError={() => setHasError(true)}
      unoptimized={typeof props.src === "string" && props.src.startsWith("/images/")}
    />
  );
}
