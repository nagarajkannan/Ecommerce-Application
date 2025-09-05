import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets.js";
import { backendUrl, currency } from "../App";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const statusHandler = async (event, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: event.target.value },
        { headers: { token } }
      );
      if (response.data.success) {
        await fetchAllOrders();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update status");
    }
  };

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div className="w-full max-w-6xl mx-auto mt-6 px-4">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">
         Orders Management
      </h3>

      {orders.length === 0 && (
        <p className="text-center text-gray-500 py-6">
          No orders available right now.
        </p>
      )}

      {orders.map((order, orderIndex) => (
        <div
          key={order._id || orderIndex}
          className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-5 items-start border border-gray-200 rounded-xl p-5 my-4 shadow-sm hover:shadow-md transition bg-white"
        >
          {/* Icon */}
          <img
            className="w-14 h-14 object-contain"
            src={assets.parcel_icon}
            alt="parcel icon"
          />

          {/* Order Details */}
          <div>
            <div className="mb-2">
              {order.items.map((item, index) => (
                <p key={index} className="text-sm text-gray-700">
                  {item.name} x {item.quantity}{" "}
                  <span className="text-gray-500 text-xs">({item.size})</span>
                </p>
              ))}
            </div>

            <p className="mt-3 mb-1 font-semibold text-gray-800">
              {order.address.firstName + " " + order.address.lastName}
            </p>
            <div className="text-sm text-gray-600 leading-tight">
              <p>{order.address.street + ", " + order.address.state}</p>
              <p>{order.address.country + " ," + order.address.zipcode}</p>
            </div>
            <p className="mt-1 text-sm text-gray-700">
              📞 {order.address.phone}
            </p>
          </div>

     
          <div className="text-sm space-y-1 text-gray-700">
            <p>
              <span className="font-medium">Items:</span>{" "}
              {order.items.length}
            </p>
            <p>
              <span className="font-medium">Method:</span>{" "}
              {order.paymentMethod}
            </p>
            <p>
              <span className="font-medium">Payment:</span>{" "}
              {order.payment ? (
                <span className="text-green-600 font-semibold">Done</span>
              ) : (
                <span className="text-red-500 font-semibold">Pending</span>
              )}
            </p>
            <p>
              <span className="font-medium">Date:</span>{" "}
              {new Date(order.date).toLocaleDateString()}
            </p>
          </div>

         
          <p className="text-lg font-bold text-gray-800">
            {currency} {order.amount}
          </p>

          
          <select
            onChange={(event) => statusHandler(event, order._id)}
            value={order.status}
            className="border border-gray-300 rounded-lg px-3 py-2 text-sm cursor-pointer focus:ring-2 focus:ring-pink-400 outline-none"
          >
            <option value="Order Placed">Order Placed</option>
            <option value="Packing">Packing</option>
            <option value="Shipped">Shipped</option>
            <option value="Out For Delivery">Out For Delivery</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}

      <ToastContainer />
    </div>
  );
};

export default Orders;
