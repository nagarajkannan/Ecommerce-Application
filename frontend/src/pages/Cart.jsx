import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { currency, products, cartitems, updateQuantity, navigate } = useContext(Shopcontext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const productId in cartitems) {
        for (const size in cartitems[productId]) {
          const quantity = cartitems[productId][size];
          if (quantity > 0) {
            tempData.push({ _id: productId, size, quantity });
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartitems, products]);

  return (
    <div className="min-h-screen px-4 sm:px-6 lg:px-20 py-8">
      <h1 className="text-3xl font-semibold mb-6 text-center sm:text-left">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] gap-8 lg:gap-10">
        {/* Cart Items */}
        <div className="space-y-6">
          {cartData.length === 0 ? (
            <div className="text-center text-gray-500 py-20">Your cart is empty.</div>
          ) : (
            cartData.map((item, index) => {
              const productData = products.find((p) => p._id === item._id);
              if (!productData) return null;

              return (
                <div
                  key={index}
                  className="bg-white rounded-lg shadow p-4 sm:p-6 flex flex-col sm:flex-row items-center gap-4 sm:gap-6"
                >
                  <img
                    src={productData.image[0]}
                    alt={productData.name}
                    className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded"
                  />

                  <div className="flex-1 w-full space-y-2">
                    <p className="text-lg font-medium truncate">{productData.name}</p>

                    <div className="flex flex-wrap items-center gap-2 text-sm text-gray-600">
                      <span className="bg-gray-100 px-3 py-1 rounded">{item.size}</span>
                      <span>
                        {currency} {productData.price}
                      </span>
                    </div>

                    <div className="flex flex-wrap items-center gap-3 mt-2">
                      <input
                        type="number"
                        min={1}
                        defaultValue={item.quantity}
                        onChange={(e) => {
                          const value = Number(e.target.value);
                          if (value >= 1) updateQuantity(item._id, item.size, value);
                        }}
                        className="w-16 sm:w-20 border rounded px-2 py-1 text-center focus:outline-none focus:ring-2 focus:ring-orange-400"
                      />

                      <button
                        onClick={() => updateQuantity(item._id, item.size, 0)}
                        className="text-red-500 hover:text-red-700 transition flex items-center justify-center"
                        title="Remove"
                      >
                        <img src={assets.bin_icon} alt="Remove" className="w-5 sm:w-6 h-auto" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Checkout Sidebar */}
        <div className="w-full bg-white shadow rounded-lg p-4 sm:p-6 h-fit">
          <CartTotal />

          <button
            onClick={() => navigate("/place-order")}
            className="w-full mt-6 bg-black hover:bg-orange-600 transition text-white py-3 rounded-lg text-sm sm:text-base font-medium"
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
