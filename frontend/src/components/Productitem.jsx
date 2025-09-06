import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";

const Productitem = ({ id, image, name, price, rating = 4.5, reviews = 120 }) => {
  const { currency } = useContext(Shopcontext);

  // ⭐ Dynamic Star Renderer
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500 text-xs sm:text-sm md:text-base" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500 text-xs sm:text-sm md:text-base" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500 text-xs sm:text-sm md:text-base" />);
      }
    }
    return stars;
  };

  return (
    <Link to={`/product/${id}`} className="text-gray-700 cursor-pointer h-full">
      <div className="overflow-hidden rounded-xl shadow-md bg-white hover:shadow-lg transition flex flex-col h-full">
        {/* Product Image */}
        <div className="w-full h-44 xs:h-52 sm:h-60 md:h-72 lg:h-80 overflow-hidden">
          <img
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
            src={image[0]}
            alt={name}
          />
        </div>

        {/* Product Details */}
        <div className="p-3 sm:p-4 flex flex-col flex-grow">
          {/* Product Name */}
          <p className="text-sm sm:text-base md:text-lg font-semibold text-gray-800 line-clamp-2 min-h-[40px] sm:min-h-[48px] md:min-h-[56px]">
            {name}
          </p>

          {/* Price + Ratings */}
          <div className="mt-auto flex items-center justify-between">
            <p className="text-xs sm:text-sm md:text-base font-medium text-gray-700">
              {currency} {price}
            </p>
            <div className="flex items-center gap-1">{renderStars()}</div>
          </div>

          {/* Review Count (Optional) */}
          <p className="text-[10px] sm:text-xs text-gray-500 mt-1">({reviews} reviews)</p>
        </div>
      </div>
    </Link>
  );
};

export default Productitem;
