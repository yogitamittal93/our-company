"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

export default function ReviewSlider() {
  const [reviews, setReviews] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3); // default desktop

  // Responsive visibleCount
  useEffect(() => {
    const updateVisibleCount = () => {
      if (window.innerWidth < 640) {
        setVisibleCount(1); // mobile
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2); // tablet
      } else {
        setVisibleCount(3); // desktop
      }
    };

    updateVisibleCount();
    window.addEventListener("resize", updateVisibleCount);
    return () => window.removeEventListener("resize", updateVisibleCount);
  }, []);

  // Fetch reviews from API route
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch("/api/reviews");
        const data = await res.json();
        setReviews(data);
      } catch (err) {
        console.error("Failed to fetch reviews:", err);
      }
    };
    fetchReviews();
  }, []);

  const nextSlide = () => {
    setCurrentIndex((prev) =>
      prev + visibleCount >= reviews.length ? 0 : prev + visibleCount
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) =>
      prev - visibleCount < 0
        ? Math.max(0, reviews.length - visibleCount)
        : prev - visibleCount
    );
  };

  // Auto-slide every 5s
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, [reviews, visibleCount]);

  if (!reviews.length) return null;

  return (
    <section className="max-w-6xl mx-auto px-6 py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-800 mb-8">
        What Our Customers Say
      </h2>

      <div className="relative flex items-center">
        {/* Previous Button */}
        <button
          onClick={prevSlide}
          className="absolute left-0 z-10 bg-gray-200 hover:bg-gray-300 p-2 rounded-full"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Reviews Container */}
        <div className="flex overflow-hidden w-full space-x-6">
          {reviews
            .slice(currentIndex, currentIndex + visibleCount)
            .map((review) => (
              <div
                key={review.id}
                className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 bg-white shadow-lg p-6 rounded-md text-center"
              >
                {/* Rating */}
                <div className="flex justify-center mb-3">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={`${
                        i < review.rating ? "text-yellow-500" : "text-gray-300"
                      }`}
                      fill={i < review.rating ? "currentColor" : "none"}
                    />
                  ))}
                </div>

                {/* Review Text */}
                <p className="text-gray-700 italic mb-4">“{review.text}”</p>

                {/* Author */}
                <p className="font-semibold text-gray-900">
                  — {review.author_name}
                </p>
              </div>
            ))}
        </div>

        {/* Next Button */}
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
