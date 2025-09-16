"use client";

import { useState } from "react";

export default function CategoryProducts({ products }) {
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  return (
    <div>
      <ul className="grid md:grid-cols-3 gap-6">
        {products.map((product) => {
          const firstImage = product.image
            ? product.image.split(",")[0].trim()
            : `/images/${product.id}.webp`;

          return (
            <li
              key={product.id}
              className="relative border-blue-400 rounded-lg shadow p-4 hover:shadow-lg transition group"
            >
              <a href={`/products/${product.url}`}>
                <div className="relative">
                  <img
                    src={firstImage}
                    alt={product.name}
                    className="w-full h-40 object-cover rounded mb-2"
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
                <h3 className="font-bold text-xl mb-1 text-blue-700">{product.name}</h3>
              </a>
              <p className="text-blue-600 mb-2">{product.description}</p>
              <div className="flex justify-between text-sm">
                <span className="font-semibold">{product.brand}</span>
                {product.ISI && (
                  <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                    ISI Certified
                  </span>
                )}
              </div>
            </li>
          );
        })}
      </ul>

      {/* Quick View Popup */}
      {quickViewProduct && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full relative shadow-lg">
            <button
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-800"
            >
              ✕
            </button>
            <h2 className="text-2xl font-bold mb-4">{quickViewProduct.name}</h2>
            <img
              src={
                quickViewProduct.image
                  ? quickViewProduct.image.split(",")[0].trim()
                  : `/images/${quickViewProduct.id}.webp`
              }
              alt={quickViewProduct.name}
              className="w-full h-48 object-cover mb-4 rounded"
            />
            <p className="text-blue-600 mb-4">{quickViewProduct.description}</p>
            <div className="flex justify-between items-center text-sm">
              <span className="font-semibold">{quickViewProduct.brand}</span>
              {quickViewProduct.ISI && (
                <span className="bg-green-200 text-green-800 px-2 py-1 rounded">
                  ISI Certified
                </span>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
