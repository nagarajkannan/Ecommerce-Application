import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import RelatedProducts from "../components/RelatedProducts";

const Product = () => {
  const { productId } = useParams();
  const { products, currency, addToCart } = useContext(Shopcontext);
  const [productdata, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  useEffect(() => {
    const product = products.find(item => item._id === productId);
    if (product) {
      setProductData(product);
      setImage(product.image[0]);
    }
  }, [productId, products]);

  return productdata ? (
    <div className="border-t pt-10 transition-all duration-500 min-h-screen px-4 sm:px-10 mx-20 rounded">
      <div className="flex flex-col sm:flex-row gap-10">
        {/* Images */}
        <div className="flex-1 flex flex-col sm:flex-row gap-4">
          <div className="flex sm:flex-col gap-2 overflow-auto sm:overflow-y-auto max-h-[400px]">
            {productdata.image.map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setImage(img)}
                className={`w-16 h-16 object-cover rounded cursor-pointer border ${
                  img === image ? "border-orange-500" : "border-gray-300"
                } hover:scale-105 transition`}
              />
            ))}
          </div>
          <div className="flex-1 flex justify-center items-center">
            <img
              src={image}
              alt="product"
              className="max-h-[500px] object-contain w-full rounded shadow-sm bg-white p-2"
            />
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1 space-y-5">
          <h1 className="text-4xl font-bold">{productdata.name}</h1>
          <div className="flex items-center gap-1">
            {[...Array(4)].map((_, i) => (
              <img key={i} className="w-5" src={assets.star_icon} alt="star" />
            ))}
            <img className="w-5" src={assets.star_dull_icon} alt="star" />
            <span className="text-base text-gray-600 ml-2">(122 reviews)</span>
          </div>
          <p className="text-4xl font-extrabold text-orange-600">
            {currency}
            {productdata.price}
          </p>
          <p className="text-lg text-gray-700 leading-relaxed">{productdata.description}</p>

          {/* Size Selector */}
          <div className="mt-6">
            <p className="text-lg font-semibold mb-2">Select Size</p>
            <div className="flex gap-3">
              {productdata.sizes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => setSize(s)}
                  className={`border px-4 py-2 rounded-full text-base hover:bg-orange-100 transition ${
                    s === size ? "border-orange-500 bg-orange-50 font-semibold" : "border-gray-300"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={() => addToCart(productdata._id, size)}
            className="mt-6 w-full sm:w-1/2 bg-black hover:bg-orange-600 text-white py-3 rounded-lg text-lg font-semibold text-center transition"
          >
            Add to Cart
          </button>

          {/* Guarantees */}
          <div className="mt-6 text-base text-gray-600 space-y-1 border-t pt-4">
            <p>✅ 100% Original Product</p>
            <p>🚚 Cash on Delivery available</p>
            <p>🔁 Easy return & exchange within 7 days</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-14">
        <div className="flex border-b text-lg font-semibold">
          <button className="px-6 py-3 border-t border-r border-l rounded-t bg-white text-black">
            Description
          </button>
          <button className="px-6 py-3 text-gray-500 hover:text-black transition">
            Reviews (122)
          </button>
        </div>
        <div className="bg-white border px-6 py-6 text-base text-gray-700 leading-relaxed">
          <p>
            An e-commerce website is an online platform that allows businesses or individuals to buy and sell goods or
            services over the internet.
          </p>
          <p className="mt-2">
            It acts as a virtual storefront with features like user accounts, shopping carts, and secure payments.
          </p>
        </div>
      </div>

      {/* Related Products */}
      <RelatedProducts
        category={productdata.category}
        subCategory={productdata.subCategory}
        currentProductId={productdata._id}
      />
    </div>
  ) : (
    <div className="min-h-screen flex justify-center items-center text-gray-500 text-lg">
      Loading product...
    </div>
  );
};

export default Product;

                                                                                                                      