import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import Productitem from "./Productitem";

const Bestseller = () => {
  const { products } = useContext(Shopcontext);
  const [bestseller, setBestseller] = useState([]);

  useEffect(() => {
    const bestproduct = products.filter((item) => item.bestseller);
    setBestseller(bestproduct.slice(0, 5));
  }, [products]);

  return (
    <div className="px-3 sm:px-6 md:px-10 max-w-8xl mx-20">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-4xl md:text-6xl font-bold text-gray-800 mb-3 sm:mb-4 tracking-tight">
          Best Sellers
        </h2>
        <p className="text-gray-600 text-xs sm:text-sm md:text-base max-w-3xl md:max-w-5xl mx-auto leading-relaxed">
          Our top-selling picks, loved by customers for quality, style, and value. 
          Don’t miss out on what everyone’s shopping.
        </p>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
        {bestseller.map((item, index) => (
          <div
            key={index}
            className="transition-transform duration-300 hover:-translate-y-1"
          >
            <Productitem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
              // Pass responsive width/height
              imgClass="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Bestseller;
