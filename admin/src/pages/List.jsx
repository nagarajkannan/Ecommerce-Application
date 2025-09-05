import axios from "axios";
import React, { useEffect, useState } from "react";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products || []);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      toast.error("Failed to fetch products");
    }
  };

  const removeProduct = async (id) => {
    try {
      const response = await axios.post(
        `${backendUrl}/api/product/removeproduct`,
        { id },
        { headers: { token: token } }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="w-full max-w-5xl mx-auto mt-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        🛍️ All Products
      </h2>

      <div className="flex flex-col gap-3">
        {/* Table Header (Desktop) */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-3 px-4 bg-pink-100 text-pink-800 font-semibold rounded-lg shadow-sm">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product List */}
        {list.map((item) => (
          <div
            key={item._id}
            className="grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 p-3 border rounded-lg shadow-sm bg-white hover:shadow-md transition"
          >
            <img
              className="w-14 h-14 object-cover rounded-md border"
              src={item.image?.[0]}
              alt={item.name}
            />
            <p className="font-medium text-gray-700">{item.name}</p>
            <p className="text-gray-600">{item.category}</p>
            <p className="font-semibold text-gray-800">
              {currency}
              {item.price}
            </p>

            <button
              onClick={() => removeProduct(item._id)}
              className="text-red-500 hover:text-white hover:bg-red-500 px-3 py-1 rounded-lg transition text-sm md:text-base"
            >
              ✖
            </button>
          </div>
        ))}

        {/* Empty State */}
        {list.length === 0 && (
          <p className="text-center text-gray-500 py-6">
            No products found. Add some products to see them here!
          </p>
        )}
      </div>
    </div>
  );
};

export default List;
