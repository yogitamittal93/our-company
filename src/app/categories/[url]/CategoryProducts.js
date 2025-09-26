"use client";

import { useState } from "react";
import Image from "next/image";

export default function CategoryProducts({ products, category }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  const breadcrumbs = [
    { label: "Home", href: "/" },
    category ? { label: category.name, href: `/categories/${category.url}` } : null,
  ].filter(Boolean);

  return (
    <div>
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

      <ul className="grid md:grid-cols-3 gap-6">
        {products.map((product) => {
          const firstImage = product.image
            ? product.image.split(",")[0].trim()
            : `/images/${product.id}.webp`;

          return (
            <li
              key={product.id}
              className="relative border border-gray-200 shadow p-4 hover:shadow-lg transition group"
            >
              <a href={`/products/${product.url}`}>
                <div className="relative w-full h-40 mb-2">
                  <Image
                    src={firstImage}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setQuickViewProduct(product);
                    }}
                    className="absolute inset-0 flex items-center justify-center bg-black/50 text-white opacity-0 group-hover:opacity-100 transition"
                  >
                    Quick View
                  </button>
                </div>
                <h3 className="font-bold text-lg mb-1 text-blue-700">
                  {product.name}
                </h3>
              </a>
              <p className="text-blue-600 mb-2 text-sm">
                {product.description
                  ? product.description.length > 90
                    ? product.description.slice(0, 90) + "..."
                    : product.description
                  : "No description available."}
              </p>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{product.brand}</span>
                {product.ISI && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium">
                    ✅ ISI Certified
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Quick View Popup */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-md relative shadow-lg">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <div className="p-4">
              <h2 className="text-2xl font-bold mb-4">{quickViewProduct.name}</h2>
              <div className="relative w-full h-48 mb-4">
                <Image
                  src={
                    quickViewProduct.image
                      ? quickViewProduct.image.split(",")[0].trim()
                      : `/images/${quickViewProduct.id}.webp`
                  }
                  alt={quickViewProduct.name}
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-blue-600 mb-4">
                {quickViewProduct.description || "No description available."}
              </p>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">{quickViewProduct.brand}</span>
                {quickViewProduct.ISI && (
                  <span className="bg-green-100 text-green-800 px-2 py-1 text-xs font-medium">
                    ✅ ISI Certified
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
