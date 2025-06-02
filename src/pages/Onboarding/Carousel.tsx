import React, { useState, useEffect, ReactNode, useRef } from "react";
type CarouselProps = {
  children: ReactNode[];
  interval?: number; // Optional: interval in ms
};

const Carousel: React.FC<CarouselProps> = ({ children, interval = 5000 }) => {
  const [current, setCurrent] = useState(0);
  const slidesCount = children.length;
  const containerRef = useRef<HTMLDivElement>(null);

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slidesCount - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slidesCount - 1 ? 0 : prev + 1));
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, interval);
    return () => clearInterval(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [current, interval, slidesCount]);

  return (
    <div className="relative overflow-hidden">
      <div
        ref={containerRef}
        className="flex transition-all transform duration-700 ease-in-out"
        style={{
          width: `${slidesCount * 100}%`,
          transform: `translateX(-${current * (100 / slidesCount)}%)`,
          willChange: "transform",
        }}
      >
        {children.map((child, idx) => (
          <div
            key={idx}
            className="flex-shrink-0 w-full"
            style={{ width: `${100 / slidesCount}%` }}
          >
            <div className="py-4 flex items-center justify-center h-full">
              {child}
            </div>
          </div>
        ))}
      </div>
      <button
        className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full"
        onClick={prevSlide}
      >
        ←
      </button>
      <button
        className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 p-2 rounded-full"
        onClick={nextSlide}
      >
        →
      </button>
      <div className="text-center mt-2">
        {children.map((_, idx) => (
          <span
            key={idx}
            className={`inline-block w-2 h-2 rounded-full mx-1 ${
              idx === current ? "bg-gray-800" : "bg-gray-300"
            }`}
            onClick={() => setCurrent(idx)}
            style={{ cursor: "pointer" }}
          />
        ))}
      </div>
    </div>
  );
};

export default Carousel;
