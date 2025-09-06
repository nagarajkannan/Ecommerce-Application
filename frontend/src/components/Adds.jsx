import React, { useEffect } from "react";

const Adds = ({ ads, currentIndex, setCurrentIndex }) => {
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % ads.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [ads.length, setCurrentIndex]);

  if (!ads.length) return null;

  return (
    <div className="relative w-full h-64 sm:h-80 md:h-[450px] lg:h-[600px] overflow-hidden">
      {ads.map((product, index) => (
        <div
          key={product._id}
          className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
            index === currentIndex ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
      ))}

      {/* Dots navigation */}
      <div className="absolute bottom-4 w-full flex justify-center space-x-2">
        {ads.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-white" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Adds;
