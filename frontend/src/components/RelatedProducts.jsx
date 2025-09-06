import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import Productitem from "./Productitem";

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const [related, setRelated] = useState([]);
  const { products } = useContext(Shopcontext);

  useEffect(() => {
    if (products.length > 0 && category && subCategory) {
      let relatedProducts = products
        .filter(
          (item) =>
            item.category === category &&
            item.subCategory === subCategory &&
            item._id !== currentProductId
        )
        .slice(0, 5);

      setRelated(relatedProducts);
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="my-16 sm:my-20 md:my-24 px-3 sm:px-6 md:px-10 max-w-8xl mx-auto">
      {/* Header */}
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 tracking-tight">
          Related Products
        </h2>
      </div>

      {/* Product Grid */}
      {related.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
          {related.map((item) => (
            <Productitem
              key={item._id}
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500 mt-8 text-sm sm:text-base">
          No related products found.
        </div>
      )}
    </div>
  );
};

export default RelatedProducts;
