import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import Adds from "../components/Adds";
import { Shopcontext } from "../context/Shopcontext";

const Hero = () => {
  const { products } = useContext(Shopcontext);
  const ads = products.slice(0, 10);
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!ads.length) return null;
  const product = ads[currentIndex];

  return (
    <div className="flex flex-col mt-2 sm:flex-row items-center rounded-xl overflow-hidden shadow-lg bg-white mx-4 sm:mx-10 lg:mx-20">
      {/* LEFT: Product Info */}
      <div className="w-full sm:w-1/2 flex flex-col justify-center items-start p-6">
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800">
          {product.name}
        </h2>
        <p className="mt-2 text-lg md:text-3xl font-medium text-gray-600">
          ₹{product.price}
        </p>
        <Link
          to={`/product/${product._id}`}
          className="mt-4 px-6 sm:px-8 py-2 sm:py-3 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-white transition"
        >
          Shop Now
        </Link>
      </div>

      {/* RIGHT: Image Section */}
      <div className="w-full sm:w-1/2 h-64 sm:h-80 md:h-[450px] lg:h-[600px]">
        <Adds
          ads={ads}
          currentIndex={currentIndex}
          setCurrentIndex={setCurrentIndex}
        />
      </div>
    </div>
  );
};

export default Hero;
