import { useContext, useState, useEffect } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import Productitem from './Productitem';

const LatestCollection = () => {
  const { products } = useContext(Shopcontext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 5));
  }, [products]);

  return (
    <div className="my-5 px-4  md:px-10 max-w-8xl  mx-auto">
      {/* Section Header */}
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-6xl font-bold text-gray-800 mb-4">
          Latest Collections
        </h2>
        <p className="text-gray-600 text-sm md:text-base max-w-5xl mx-auto leading-relaxed">
          Discover our latest arrivals that blend timeless design with modern flair. Perfect for elevating your style or gifting something special.
        </p>
      </div>

      {/* Products Grid */}
   <div className="grid grid-cols-2 mx-20 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {latestProducts.map((item, index) => (
          <div
            key={index}
            className="transition-transform duration-300 hover:-translate-y-1"
          >
            <Productitem
              id={item._id}
              image={item.image}
              name={item.name}
              price={item.price}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LatestCollection;
