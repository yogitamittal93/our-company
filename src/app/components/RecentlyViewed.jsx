"use client";

import { useEffect, useState } from "react";

export default function RecentlyViewed({ current }) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    try {
      const stored = JSON.parse(localStorage.getItem("recentProducts") || "[]");

      // add current at top, dedupe, cap 10
      const updated = [
        current,
        ...stored.filter((p) => p.id !== current.id),
      ].slice(0, 10);

      localStorage.setItem("recentProducts", JSON.stringify(updated));

      // show all except current
      setItems(updated.filter((p) => p.id !== current.id));
    } catch (e) {
      console.error("recentProducts localStorage error:", e);
    }
  }, [current?.id]);

  if (!items.length) return null;

  return (
    <section className="mt-12">
      <h2 className="text-2xl font-bold mb-4">Recently Viewed</h2>
      <div className="flex gap-4 overflow-x-auto pb-4">
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
    </section>
  );
}
