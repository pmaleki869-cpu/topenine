"use client";

import { useState } from "react";
import { ProductImage } from "@/components/ProductImage";

interface GalleryImage {
  id?: number;
  src: string;
  alt?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  productName: string;
  primaryImageUrl: string | null;
  showSaleBadge?: boolean;
}

/**
 * ImageGallery — client component for PDP image section.
 * Clicking a thumbnail swaps the main displayed image.
 */
export function ImageGallery({
  images,
  productName,
  primaryImageUrl,
  showSaleBadge,
}: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState(0);

  /* Build ordered image list: primary first, then gallery images */
  const allImages: GalleryImage[] = primaryImageUrl
    ? [{ src: primaryImageUrl, alt: productName }, ...images.filter((img) => img.src !== primaryImageUrl)]
    : images;

  const mainImage = allImages[selectedIndex] ?? allImages[0];

  return (
    <div>
      {/* Main image */}
      <div className="relative aspect-square bg-surface-secondary rounded-md overflow-hidden mb-3">
        {mainImage ? (
          <ProductImage
            key={mainImage.src}
            src={mainImage.src}
            alt={mainImage.alt || productName}
            fill
            priority={selectedIndex === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
            className="object-contain p-6"
            fallbackText="No image available"
          />
        ) : (
          <div className="flex items-center justify-center h-full text-text-disabled">
            No image available
          </div>
        )}
        {showSaleBadge && (
          <div className="absolute top-3 left-3 badge badge-sale">Sale</div>
        )}
      </div>

      {/* Thumbnails */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide" role="listbox" aria-label="Product images">
          {allImages.slice(0, 6).map((img, i) => (
            <button
              key={img.id ?? i}
              onClick={() => setSelectedIndex(i)}
              className={`w-16 h-16 shrink-0 rounded-md overflow-hidden border-2 transition-colors ${
                i === selectedIndex ? "border-interactive" : "border-border hover:border-text-disabled"
              } bg-surface-secondary cursor-pointer`}
              role="option"
              aria-selected={i === selectedIndex}
              aria-label={`View image ${i + 1} of ${Math.min(allImages.length, 6)}`}
            >
              <ProductImage
                src={img.src}
                alt={img.alt || productName}
                width={64}
                height={64}
                className="object-contain w-full h-full p-1"
                fallbackText=""
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
