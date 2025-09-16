"use client";

import { useState } from "react";

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
    <div className="relative w-full h-40 rounded overflow-hidden shadow-sm hover:shadow-md transition">
      <img
        src={images[currentIndex]}
        alt={name}
        className="w-full h-40 object-cover"
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
