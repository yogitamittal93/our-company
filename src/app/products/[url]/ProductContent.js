"use client";

import { useState, useRef } from "react";
import RecentlyViewed from "@/app/components/RecentlyViewed";

export default function ProductContent({ product, related, whatsappLink }) {
  const images = product.image
    ? product.image.split(",").map((img) => img.trim())
    : [`/images/${product.id}.webp`];

  const breadcrumbs = [
    { label: "Home", href: "/" },
    product.categories
      ? { label: product.categories.name, href: `/categories/${product.categories.url}` }
      : null,
    { label: product.name, href: `/products/${product.url}` },
  ].filter(Boolean);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const nextImage = () =>
    setCurrentIndex((prev) => (prev + 1) % images.length);

  const prevImage = () =>
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  return (
    <main className="max-w-7xl mx-auto py-6 px-4 bg-gray-100 min-h-screen relative">
      {/* Breadcrumbs */}
      <div className="text-sm text-gray-600 mb-4">
        {breadcrumbs.map((crumb, index) => (
          <span key={index}>
            <a href={crumb.href} className="hover:text-gray-800 transition">
              {crumb.label}
            </a>
            {index < breadcrumbs.length - 1 && <span className="mx-2">/</span>}
          </span>
        ))}
      </div>

      {/* Main Content */}
      <div className="bg-gray-50 rounded-2xl shadow-lg p-6 lg:flex lg:gap-8">
        {/* Image Section */}
        <div className="lg:w-1/2 relative h-[400px] sm:h-[500px] rounded-xl overflow-hidden shadow-md cursor-pointer" onClick={openModal}>
          <img
            src={images[currentIndex]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prevImage(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70"
              >
                ‹
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); nextImage(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/50 text-white px-3 py-1 rounded-full hover:bg-black/70"
              >
                ›
              </button>
            </>
          )}
        </div>

        {/* Product Info */}
        <div className="lg:w-1/2 mt-6 lg:mt-0">
          <h1 className="text-3xl font-bold text-gray-800">{product.name}</h1>
          <p className="mt-4 text-gray-700">{product.description}</p>

          <div className="mt-4 text-gray-700 space-y-2">
            <div>
              <span className="font-semibold">Brand:</span> {product.brand || "Not specified"}
            </div>
            {product.brands && (
              <div>
                <a
                  href={`/brands/${product.brands.url}`}
                  className="text-blue-600 hover:underline"
                >
                  More from {product.brands.name} →
                </a>
              </div>
            )}
            {product.ISI && (
              <div className="bg-green-100 text-green-800 px-2 py-1 rounded w-fit text-sm font-medium">
                ✅ ISI Certified
              </div>
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
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-12 relative">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            More from this brand
          </h2>
          <div className="relative">
            <button
              onClick={() => scroll("left")}
              className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full p-1 z-10"
            >
              ‹
            </button>

            <div
              ref={scrollRef}
              className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4"
            >
              {related.map((rp) => (
                <a
                  key={rp.id}
                  href={`/products/${rp.url}`}
                  className="min-w-[200px] border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition bg-white"
                >
                  <img
                    src={rp.image ? rp.image.split(",")[0].trim() : `/images/${rp.id}.webp`}
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

            <button
              onClick={() => scroll("right")}
              className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full p-1 z-10"
            >
              ›
            </button>
          </div>
        </section>
      )}

      {/* Recently Viewed */}
      <RecentlyViewed
        current={{
          id: product.id,
          name: product.name,
          url: product.url,
          image: product.image ? product.image.split(",")[0].trim() : `/images/${product.id}.webp`,
        }}
      />

      {/* Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/70 flex justify-center items-center z-50"
          onClick={closeModal}
        >
          <div className="relative w-full h-full max-w-5xl p-4">
            <img
              src={images[currentIndex]}
              alt={product.name}
              className="w-full h-full object-contain mx-auto"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 bg-white text-black rounded-full p-2 hover:bg-gray-200 transition"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
