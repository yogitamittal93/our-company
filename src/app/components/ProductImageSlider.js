"use client";

import { useState } from "react";
import Image from "next/image";

export default function ProductImageSlider({ image, id, name }) {
  const images = image
    ? image.split(",").map((img) => img.trim())
    : [`/images/products/${id}.webp`];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);
  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <div className="relative w-full rounded overflow-hidden shadow-sm hover:shadow-md transition h-40 sm:h-44 md:h-48 lg:h-52">
      <Image
        src={images[currentIndex]}
        alt={name}
        fill
        className="object-cover"
        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        priority={currentIndex === 0} // first image loads faster
      />
      {images.length > 1 && (
        <>
          <button
            onClick={prevImage}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded hover:bg-black/70"
          >
            ‹
          </button>
          <button
            onClick={nextImage}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-2 py-1 rounded hover:bg-black/70"
          >
            ›
          </button>
        </>
      )}
    </div>
  );
}
