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
    <div className="flex flex-col mt-2  sm:flex-row items-center rounded-xl overflow-hidden shadow-lg bg-white mx-20">
      {/* LEFT: Product Info */}
      <div className="ml-10 w-full sm:w-1/2 flex flex-col justify-center items-start p-6">
        <h2 className="ml-10 text-2xl md:text-4xl font-bold text-gray-800">
          {product.name}
        </h2>
        <p className="mt-2 ml-10 text-lg md:text-3xl font-medium text-gray-600">
          ₹{product.price}
        </p>
        <Link
          to={`/product/${product._id}`}
          className="mt-4 px-8 py-3 ml-10 bg-orange-500 hover:bg-orange-600 rounded-lg font-semibold text-white transition"
        >
          Shop Now
        </Link>
      </div>

      {/* RIGHT: Image Section */}
      <div className="w-full sm:w-1/2 h-[500px]"> 
        <Adds ads={ads} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} />
      </div>
    </div>
  );
};

export default Hero;
