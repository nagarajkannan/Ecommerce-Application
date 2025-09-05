import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import axios from "axios";

const Orders = () => {
  const { backendUrl, token, currency } = useContext(Shopcontext);
  const [orderData, setOrderData] = useState([]);

  const loadOrderData = async () => {
    try {
      if (!token) return null;

      const response = await axios.post(
        backendUrl + "/api/order/userorders",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        let allOrders = [];
        response.data.orders.map((order) => {
          order.items.map((item) => {
            item["status"] = order.status;
            item["payment"] = order.payment;
            item["paymentMethod"] = order.paymentMethod;
            item["date"] = order.date;
            allOrders.push(item);
          });
        });
        setOrderData(allOrders);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadOrderData();
  }, [token]);

  // Steps flow
  const steps = [
    "Order Placed",
    "Packing",
    "Shipped",
    "Out For Delivery",
    "Delivered",
  ];

  return (
    <div className=" min-h-screen px-10 mx-20 ">
      <div className="text-2xl mt-2 mb-4 text-gray-900 font-semibold tracking-wide">
        <p className="text-4xl">MY ORDERS</p>
      </div>

      <div>
        {orderData.map((item, index) => {
          const currentIndex = steps.indexOf(item.status);

          return (
            <div
              key={index}
              className="py-8 border-t border-b text-gray-700 flex flex-col lg:flex-row gap-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              {/* Left: Product Info */}
              <div className="flex items-start p-9 gap-4 flex-1">
                <img
                  className="w-16 h-20 object-cover rounded-md border border-gray-300 shadow-sm"
                  src={item.image[0]}
                  alt=""
                />
                <div>
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-600">
                    {currency}
                    {item.price} | Qty: {item.quantity} | Size: {item.size}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    {new Date(item.date).toLocaleDateString()}
                  </p>
                  <p className="text-sm text-gray-500 mt-1 font-semibold">
                    Payment: <span className="capitalize">{item.paymentMethod}</span>
                  </p>
                </div>
              </div>

              {/* Right: Vertical Timeline */}
              <div className="relative flex-1 pl-6">
                {steps.map((step, idx) => {
                  const isCompleted = idx < currentIndex;
                  const isActive = idx === currentIndex;

                  return (
                    <div key={idx} className="relative flex items-center mb-6">
                      {/* Circle */}
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center z-10
                          ${
                            isCompleted
                              ? "bg-green-500 text-white"
                              : isActive
                              ? "bg-indigo-600 text-white"
                              : "bg-gray-300 text-gray-500"
                          }
                        `}
                      >
                        {isCompleted ? "✓" : ""}
                      </div>

                      {/* Vertical Line */}
                      {idx !== steps.length - 1 && (
                        <div
                          className={`absolute left-2 top-5 w-1 h-full 
                            ${
                              isCompleted || isActive
                                ? "bg-green-500"
                                : "bg-gray-300"
                            }
                          `}
                        ></div>
                      )}

                      {/* Status Text on Right of line */}
                      <p
                        className={`ml-4 text-sm 
                          ${
                            isActive
                              ? "text-indigo-600 font-semibold"
                              : "text-gray-700"
                          }
                        `}
                      >
                        {step}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className="p-9">
                <button
                  onClick={loadOrderData}
                  className="bg-indigo-600 hover:bg-indigo-700 px-4 py-3 rounded-lg text-white mt-16 shadow-md active:scale-95 transition-transform"
                >
                  Track Order
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
