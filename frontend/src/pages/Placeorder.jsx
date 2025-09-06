import React, { useContext, useState } from "react";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { Shopcontext } from "../context/Shopcontext";
import axios from "axios";
import { toast } from "react-toastify";

const Placeorder = () => {
  const [method, setMethod] = useState("cod");
  const {
    navigate,
    backendUrl,
    token,
    cartitems,
    getTotalCartAmount,
    setCartItems,
    delivery_fee,
    products,
  } = useContext(Shopcontext);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    state: "",
    street: "",
    city: "",
    zipcode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setFormData((data) => ({ ...data, [name]: value }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      let orderItems = [];
      for (const productId in cartitems) {
        for (const size in cartitems[productId]) {
          if (cartitems[productId][size] > 0) {
            const itemInfo = JSON.parse(
              JSON.stringify(products.find((p) => p._id === productId))
            );
            if (itemInfo) {
              itemInfo.size = size;
              itemInfo.quantity = cartitems[productId][size];
              orderItems.push(itemInfo);
            }
          }
        }
      }

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getTotalCartAmount() + delivery_fee,
        paymentMethod: method,
      };

      switch (method) {
        case "cod":
          {
            const response = await axios.post(
              backendUrl + "/api/order/place",
              orderData,
              { headers: { token } }
            );
            if (response.data.success) {
              setCartItems({});
              navigate("/orders");
              toast.success("Order placed successfully!");
            } else {
              toast.error(response.data.message);
            }
          }
          break;

        case "upi":
          {
            const responseUpi = await axios.post(
              backendUrl + "/api/order/upi",
              orderData,
              { headers: { token } }
            );
            if (responseUpi.data.success) {
              const { session_url } = responseUpi.data;
              window.location.replace(session_url);
            } else {
              toast.error(responseUpi.data.message);
            }
          }
          break;

        case "netBanking":
          toast.info("Net Banking payment is not implemented yet.");
          break;

        default:
          break;
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <form
      onSubmit={onSubmitHandler}
      className="flex flex-col lg:flex-row justify-center gap-8 lg:gap-12 pt-10 px-4 sm:px-10 min-h-[80vh] bg-gray-50 border-t"
    >
      {/* Left Side - Delivery Info */}
      <div className="flex flex-col gap-6 w-full lg:max-w-lg bg-white p-6 sm:p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl sm:text-3xl font-semibold mb-4 text-gray-800">
          Delivery Information
        </h2>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <input
            onChange={onChangeHandler}
            name="firstName"
            value={formData.firstName}
            type="text"
            placeholder="First Name"
            required
            className="flex-1 border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
          <input
            onChange={onChangeHandler}
            name="lastName"
            value={formData.lastName}
            type="text"
            placeholder="Last Name"
            required
            className="flex-1 border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="email"
          value={formData.email}
          type="email"
          placeholder="Email"
          required
          className="border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
        />
        <input
          onChange={onChangeHandler}
          name="street"
          value={formData.street}
          type="text"
          placeholder="Address"
          required
          className="border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
        />

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <input
            onChange={onChangeHandler}
            name="city"
            value={formData.city}
            type="text"
            placeholder="City"
            required
            className="flex-1 border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
          <input
            onChange={onChangeHandler}
            name="state"
            value={formData.state}
            type="text"
            placeholder="State"
            required
            className="flex-1 border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
          <input
            onChange={onChangeHandler}
            name="zipcode"
            value={formData.zipcode}
            type="text"
            placeholder="Zip Code"
            required
            className="flex-1 border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
          <input
            onChange={onChangeHandler}
            name="country"
            value={formData.country}
            type="text"
            placeholder="Country"
            required
            className="flex-1 border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
          />
        </div>

        <input
          onChange={onChangeHandler}
          name="phone"
          value={formData.phone}
          type="tel"
          placeholder="Phone Number"
          required
          className="border border-gray-300 rounded-md p-3 outline-none focus:ring-2 focus:ring-orange-400 focus:border-transparent transition"
        />
      </div>

      {/* Right Side - Payment and Summary */}
      <div className="w-full lg:max-w-md bg-white p-6 sm:p-8 rounded-lg shadow-lg flex flex-col justify-between">
        <div>
          <h2 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-800">
            Payment Method
          </h2>
          <div className="flex flex-col gap-4 sm:flex-row sm:gap-4">
            {/* UPI */}
            <button
              type="button"
              onClick={() => setMethod("upi")}
              className={`flex-1 flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out ${
                method === "upi"
                  ? "border-orange-500 shadow-lg bg-orange-50"
                  : "border-gray-300 hover:shadow-md hover:bg-orange-50"
              }`}
            >
              <img src={assets.upilogo} alt="UPI" className="w-20 h-auto" />
              <span className="text-gray-700 font-medium">UPI</span>
            </button>

            {/* Net Banking */}
            <button
              type="button"
              onClick={() => setMethod("netBanking")}
              className={`flex-1 flex flex-col items-center gap-3 p-4 border rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out ${
                method === "netBanking"
                  ? "border-orange-500 shadow-lg bg-orange-50"
                  : "border-gray-300 hover:shadow-md hover:bg-orange-50"
              }`}
            >
              <img src={assets.netbankinglogo} alt="Net Banking" className="w-20 h-auto" />
              <span className="text-gray-700 font-medium">Net Banking</span>
            </button>

            {/* COD */}
            <button
              type="button"
              onClick={() => setMethod("cod")}
              className={`flex-1 flex flex-col items-center justify-center gap-3 p-4 border rounded-lg cursor-pointer transition-shadow duration-300 ease-in-out ${
                method === "cod"
                  ? "border-orange-500 shadow-lg bg-orange-50"
                  : "border-gray-300 hover:shadow-md hover:bg-orange-50"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 1.343-3 3v1h6v-1c0-1.657-1.343-3-3-3z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 14h6m-6 4h6" />
              </svg>
              <span className="text-gray-700 font-medium">Cash On Delivery</span>
            </button>
          </div>
        </div>

        <div className="mt-8">
          <CartTotal />
          <button
            type="submit"
            className="w-full mt-6 bg-black hover:bg-orange-600 transition-colors text-white py-3 rounded-lg text-lg font-semibold shadow-md"
          >
            Place Order
          </button>
        </div>
      </div>
    </form>
  );
};

export default Placeorder;
