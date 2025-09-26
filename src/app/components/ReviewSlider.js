"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function ReviewSlider({ reviews = [] }) { // default to empty array
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);

  // Responsive visibleCount
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    };
    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  const nextSlide = () => {
    if (!reviews.length) return; // ✅ guard
    setCurrentIndex((prev) =>
      prev + visibleCount >= reviews.length ? 0 : prev + visibleCount
    );
  };

  const prevSlide = () => {
    if (!reviews.length) return; // ✅ guard
    setCurrentIndex((prev) =>
      prev - visibleCount < 0
        ? Math.max(0, reviews.length - visibleCount)
        : prev - visibleCount
    );
  };

  // Auto-slide every 5s
  useEffect(() => {
    if (!reviews.length) return; // ✅ guard
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [reviews, visibleCount]);

  if (!reviews.length) return null; // ✅ safe check

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        What Our Customers Say
      </h2>

      <div className="relative flex items-center">
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>

       <div className="flex overflow-hidden w-full gap-6">
            {reviews.slice(currentIndex, currentIndex + visibleCount).map((review) => (
            <div
                key={review.id}
                className="flex-shrink-0 bg-white shadow-lg p-6 rounded-md text-center"
                style={{
                flex: `0 0 calc(${100 / visibleCount}% - ${6 * (visibleCount - 1)}px)`,
                }}
                >
                <div className="flex justify-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${i < review.rating ? "text-yellow-500" : "text-gray-300"}`}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>
                <p className="text-gray-700 italic mb-4">“{review.text}”</p>
                <p className="font-semibold text-gray-900">— {review.author_name}</p>
              </div>
            ))}
        </div>

        <button
          onClick={nextSlide}
          className="absolute right-0 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
        >
          <ChevronRight size={24} />
        </button>
      </div>
    </section>
  );
}
