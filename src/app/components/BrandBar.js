"use client"; // Important — this makes it a Client Component
import Image from "next/image";
export default function BrandBar({ brands }) {
  // Duplicate the list for seamless scrolling
  const brandList = [...brands, ...brands];

  return (
    <section className="py-0 bg-[#fff] border-t border-gray-700">
      <div className="overflow-hidden relative max-w-6xl mx-auto">
        <div className="flex animate-scroll space-x-5 whitespace-nowrap hover:pause-animation">
          {brandList && brandList.length > 0 ? (
            brandList.map((brand, index) => (
             <a
              key={`${brand.id}-${index}`}
              href={`/brands/${brand.url}`}
              className="flex items-center justify-center w-[80px] px-1 hover:scale-105 transform transition duration-200"
              aria-label={brand.name}
            >
              <Image
                src={brand.logo || `/images/logos/${brand.id}.png`}
                alt={brand.name}
                width={80}         // sets intrinsic width
                height={80}        // sets intrinsic height (doesn’t force aspect ratio)
                className="w-full h-auto object-contain"
                priority= {index < 5}
              />
            </a>
            ))
          ) : (
            <p className="text-gray-700">No brands available</p>
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
          display: inline-flex;
          animation: scroll 20s linear infinite;
        }
        .hover\\:pause-animation:hover {
          animation-play-state: paused;
        }
      `}</style>
    </section>
  );
}
