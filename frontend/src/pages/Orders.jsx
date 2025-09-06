import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(Shopcontext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return;
      const response = await axios.post(
        `${backendUrl}/api/order/userorders`,
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrders = [];
        response.data.orders.forEach((order) => {
          order.items.forEach((item) => {
            allOrders.push({
              ...item,
              status: order.status,
              payment: order.payment,
              paymentMethod: order.paymentMethod,
              date: order.date,
            });
          });
        });
        setOrderData(allOrders);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  const steps = ["Order Placed", "Packing", "Shipped", "Out For Delivery", "Delivered"];

  if (orderData.length === 0) {
    return (
      <div className="text-center py-20 text-gray-500 font-medium">
        You have no orders yet.
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 sm:px-10 lg:px-20 py-8 space-y-6">
      <h1 className="text-4xl font-bold text-gray-900 mb-6">My Orders</h1>

      {orderData.map((item, index) => {
        const currentIndex = steps.indexOf(item.status);

        return (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow flex flex-col lg:flex-row gap-6 p-6"
          >
            {/* Left: Product Info */}
            <div className="flex flex-1 items-start gap-4">
              <img
                src={item.image[0]}
                alt={item.name}
                className="w-20 h-24 object-cover rounded-md border border-gray-300 shadow-sm"
              />
              <div className="flex-1 space-y-1">
                <p className="font-semibold text-gray-900">{item.name}</p>
                <p className="text-gray-600 text-sm">
                  {currency}
                  {item.price} | Qty: {item.quantity} | Size: {item.size}
                </p>
                <p className="text-gray-500 text-sm">{new Date(item.date).toLocaleDateString()}</p>
                <p className="text-gray-500 text-sm font-semibold">
                  Payment: <span className="capitalize">{item.paymentMethod}</span>
                </p>
              </div>
            </div>

            {/* Right: Vertical Timeline */}
            <div className="flex-1 relative pl-6">
              {steps.map((step, idx) => {
                const isCompleted = idx < currentIndex;
                const isActive = idx === currentIndex;

                return (
                  <div key={idx} className="relative flex items-center mb-6 last:mb-0">
                    {/* Circle */}
                    <div
                      className={`w-5 h-5 rounded-full flex items-center justify-center z-10
                        ${isCompleted ? "bg-green-500 text-white" : isActive ? "bg-indigo-600 text-white" : "bg-gray-300 text-gray-500"}
                      `}
                    >
                      {isCompleted ? "✓" : ""}
                    </div>

                    {/* Vertical Line */}
                    {idx !== steps.length - 1 && (
                      <div
                        className={`absolute left-2 top-5 w-1 h-full ${
                          isCompleted || isActive ? "bg-green-500" : "bg-gray-300"
                        }`}
                      />
                    )}

                    {/* Step Text */}
                    <p className={`ml-4 text-sm ${isActive ? "text-indigo-600 font-semibold" : "text-gray-700"}`}>
                      {step}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Action Button */}
            <div className="flex lg:flex-col items-center justify-start lg:justify-end">
              <button
                onClick={loadOrderData}
                className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2 rounded-lg text-white shadow-md active:scale-95 transition-transform mt-4 lg:mt-16"
              >
                Track Order
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Orders;
