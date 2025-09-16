"use client";

import { useState } from "react";
import RecentlyViewed from "@/app/components/RecentlyViewed";

export default function ProductContent({ product, related, whatsappLink }) {
  const images = product.image
    ? product.image.split(",").map((img) => img.trim())
    : [`/images/${product.id}.webp`];

  const [currentIndex, setCurrentIndex] = useState(0);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  return (
    <main className="max-w-4xl mx-auto py-12 px-6 bg-gray-100 min-h-screen">
      <div className="bg-gray-50 rounded-2xl shadow-lg p-6">
        <div className="relative w-full h-[500px] overflow-hidden rounded-xl shadow-md">
          <img
            src={images[currentIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70"
              >
                ‹
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70"
              >
                ›
              </button>
            </>
          )}
        </div>

        <h1 className="mt-6 text-3xl font-bold text-gray-800">{product.name}</h1>

        <p className="mt-4 text-gray-700">{product.description}</p>

        <div className="flex flex-col gap-2 mt-4 text-gray-700">
          <span className="font-semibold">
            Brand: {product.brand || "Not specified"}
          </span>

          {product.brands && (
            <a
              href={`/brands/${product.brands.url}`}
              className="text-brand-blue hover:underline"
            >
              More from {product.brands.name} →
            </a>
          )}

          {product.ISI && (
            <span className="bg-green-100 text-green-800 px-2 py-1 rounded w-fit text-sm font-medium">
              ✅ ISI Certified
            </span>
          )}
        </div>

        <div className="mt-6 flex gap-4">
          <a
            href="tel:+917717686970"
            className="bg-red-700 text-white px-4 py-2 rounded-lg hover:bg-red-800/90 transition shadow-md"
          >
            Call Now
          </a>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition shadow-md"
          >
            Order via WhatsApp
          </a>
        </div>
      </div>

     {/* Remove this duplicated section */}
      {related.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            More from this brand
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4">
            {related.map((rp) => (
              <a
                key={rp.id}
                href={`/products/${rp.url}`}
                className="min-w-[200px] border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white"
              >
                <img
                  src={
                    rp.image
                      ? rp.image.split(",")[0].trim()
                      : `/images/${rp.id}.webp`
                  }
                  alt={rp.name}
                  className="w-full h-32 object-cover rounded-t-lg"
                />
                <div className="p-2">
                  <h3 className="font-semibold text-sm text-gray-700">
                    {rp.name}
                  </h3>
                </div>
              </a>
            ))}
          </div>
        </section>
      )}

      <RecentlyViewed
        current={{
          id: product.id,
          name: product.name,
          url: product.url,
          image: product.image
            ? product.image.split(",")[0].trim()
            : `/images/${product.id}.webp`,
        }}
      />
    </main>
  );
}
