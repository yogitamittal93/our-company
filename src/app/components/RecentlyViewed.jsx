"use client";

import { useEffect, useState, useRef } from "react";

export default function RecentlyViewed({ current }) {
  const [items, setItems] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentProducts") || "[]");

      const updated = [
        current,
        ...stored.filter((p) => p.id !== current.id),
      ].slice(0, 10);

      localStorage.setItem("recentProducts", JSON.stringify(updated));

      setItems(updated.filter((p) => p.id !== current.id));
    } catch (e) {
      console.error("recentProducts localStorage error:", e);
    }
  }, [current?.id]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  if (!items.length) return null;

  return (
    <section className="mt-12 relative">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full p-1 z-10"
        >
          ‹
        </button>

        {/* Scroll Container */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scrollbar-none scroll-smooth pb-4"
        >
          {items.map((p) => (
            <a
              key={p.id}
              href={`/products/${p.url}`}
              className="min-w-[200px] rounded-lg shadow hover:shadow-lg transition bg-white"
            >
              <img
                src={p.image}
                alt={p.name}
                className="w-full h-32 object-cover rounded-t-lg"
              />
              <div className="p-2">
                <h3 className="font-semibold text-sm text-gray-700">{p.name}</h3>
              </div>
            </a>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-full p-1 z-10"
        >
          ›
        </button>
      </div>
    </section>
  );
}
