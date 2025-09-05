import React, { useContext } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { Link } from "react-router-dom";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // ✅ import missing icons

const Productitem = ({ id, image, name, price, rating = 4.5, reviews = 120 }) => {
  const { currency } = useContext(Shopcontext);

  // ⭐ Dynamic Star Renderer
  const renderStars = () => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-yellow-500" />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-yellow-500" />);
      } else {
        stars.push(<FaRegStar key={i} className="text-yellow-500" />);
      }
    }
    return stars;
  };

  return (
    <Link className="text-gray-700 cursor-pointer" to={`/product/${id}`}>
      <div className="overflow-hidden rounded-lg shadow-md bg-white hover:shadow-lg transition">
        {/* Product Image */}
        <img
          className="hover:scale-110 transition ease-in-out w-full  object-cover"
          src={image[0]}
          alt={name}
        />

        {/* Product Details */}
        <div className="p-3">
          <p className="pt-2 pb-1 text-lg font-semibold truncate">{name}</p>

          {/* Price */}
          <div className="flex items-center gap-3">
            <p className="text-base font-medium">
              {currency} {price}
            </p>
                <div className="flex items-center gap-2 ">
            
            <span className="text-lg gap-2 text-gray-600 items-center"><p className="gap-3 ml-6">Ratings:⭐{rating}</p></span>
            
          </div>
          </div>

          {/* Ratings */}
      
        </div>
      </div>
    </Link>
  );
};

export default Productitem;
