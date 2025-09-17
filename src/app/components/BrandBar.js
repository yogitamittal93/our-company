"use client";  // Important — this makes it a Client Component

export default function BrandBar({ brands }) {
  return (
    <section className="py-2 bg-[#030a1c] border-t border-gray-700">
      <div className="overflow-hidden relative max-w-6xl mx-auto">
        <div className="flex animate-scroll space-x-8 whitespace-nowrap">
          {brands && brands.length > 0 ? (
            brands.map((brand) => (
              <a
                key={brand.id}
                href={`/brands/${brand.url}`}
                className="flex items-center px-4 hover:scale-105 transform transition"
              >
                <img
                  src={brand.logo || `/images/brands/${brand.url}.png`}
                  alt={brand.name}
                  className="h-12 object-contain"
                />
              </a>
            ))
          ) : (
            <p className="text-white">No brands available</p>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
      `}</style>
    </section>
  );
}
