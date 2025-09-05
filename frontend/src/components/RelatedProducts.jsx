import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import Productitem from "./Productitem";

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
  const [related, setRelated] = useState([]);
  const { products } = useContext(Shopcontext);

  useEffect(() => {
    if (products.length > 0 && category && subCategory) {
      let relatedProducts = products
        .filter((item) => item.category === category && item.subCategory === subCategory)
        .filter((item) => item._id !== currentProductId)
        .slice(0, 5);

      setRelated(relatedProducts);
    }
  }, [products, category, subCategory, currentProductId]);

  return (
    <div className="my-24 px-4 sm:px-0">
      <div className="text-center text-3xl font-semibold py-2">
        <p className="mb-8 md:text-4xl">RELATED PRODUCTS</p>
      </div>

      {related.length > 0 ? (
        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
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
        <div className="text-center text-gray-500 mt-8">No related products found.</div>
      )}
    </div>
  );
};

export default RelatedProducts;
