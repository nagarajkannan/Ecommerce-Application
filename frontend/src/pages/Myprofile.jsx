import React, { useContext, useEffect, useState } from "react";
import { Shopcontext } from "../context/Shopcontext";
import axios from "axios";
import Cart from "./Cart";
import Orders from "./Orders";

const Myprofile = () => {
  const { backendUrl, token } = useContext(Shopcontext);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedSection, setSelectedSection] = useState("profile");

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [panDetails, setPanDetails] = useState(null);

  const [showAddressForm, setShowAddressForm] = useState(false);
  const [addressForm, setAddressForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });

  // Fake fetch data
  useEffect(() => {
    setTimeout(() => {
      setPaymentMethods([
        { type: "card", last4: "4242", expiry: "12/26" },
        { type: "upi", upiId: "user@upi" },
        { type: "giftcard", code: "ABCD-1234" },
      ]);
      setPanDetails({
        number: "ABCDE1234F",
        name: "Rahul Sharma",
      });
      setLoading(false);
    }, 1000);
  }, []);

  // Fetch profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${backendUrl}/api/profile/myprofile`, {
          headers: { token },
        });
        if (response.data.success) setUser(response.data.user);
      } catch (error) {
        console.error("Error fetching profile:", error);
      } finally {
        setLoading(false);
      }
    };
    if (token) fetchProfile();
    else setLoading(false);
  }, [backendUrl, token]);

  if (loading)
    return <p className="text-center mt-10 text-indigo-600 font-medium">Loading profile...</p>;
  if (!user)
    return <p className="text-center mt-10 text-red-500 font-medium">No user profile found. Please log in.</p>;

  const renderContent = () => {
    switch (selectedSection) {
      case "profile":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-gray-300 pb-3">Personal Information</h2>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-4 border rounded-lg shadow bg-white">
                <p className="text-gray-600 text-sm">User Name</p>
                <p className="text-gray-900 text-xl font-semibold">{user.name}</p>
              </div>
              <div className="p-4 border rounded-lg shadow bg-white">
                <p className="text-gray-600 text-sm">Email Address</p>
                <p className="text-gray-900 font-semibold">{user.email}</p>
              </div>
              <div className="p-4 border rounded-lg shadow bg-white">
                <p className="text-gray-600 text-sm">Mobile Number</p>
                <p className="text-gray-900 font-semibold">{user.phone || "+91 XXXXX XXXXX"}</p>
              </div>
              {panDetails && (
                <div className="p-4 border rounded-lg shadow bg-white">
                  <p className="text-gray-600 text-sm">PAN Card</p>
                  <p className="text-gray-900 font-semibold">{panDetails.number}</p>
                  <p className="text-gray-700 text-sm mt-1">Name: {panDetails.name}</p>
                </div>
              )}
            </div>
          </div>
        );

      case "addresses":
        return (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold border-b border-gray-300 pb-3">Manage Addresses</h2>
            <div className="p-6 bg-gray-50 border rounded-lg shadow">
              {!showAddressForm ? (
                <div className="text-center">
                  <p className="text-gray-700">Your saved addresses will appear here.</p>
                  <button
                    onClick={() => setShowAddressForm(true)}
                    className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 transition"
                  >
                    + Add New Address
                  </button>
                </div>
              ) : (
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    console.log("Address Saved:", addressForm);
                    setShowAddressForm(false);
                  }}
                >
                  <div>
                    <label className="block text-lg text-gray-700">Full Name</label>
                    <input
                      type="text"
                      value={addressForm.name}
                      onChange={(e) => setAddressForm({ ...addressForm, name: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg text-gray-700">Phone</label>
                    <input
                      type="text"
                      value={addressForm.phone}
                      onChange={(e) => setAddressForm({ ...addressForm, phone: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-lg text-gray-700">Address</label>
                    <textarea
                      value={addressForm.address}
                      onChange={(e) => setAddressForm({ ...addressForm, address: e.target.value })}
                      className="w-full p-2 border rounded-md"
                      rows="3"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-lg text-gray-700">City</label>
                      <input
                        type="text"
                        value={addressForm.city}
                        onChange={(e) => setAddressForm({ ...addressForm, city: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-lg text-gray-700">Pincode</label>
                      <input
                        type="text"
                        value={addressForm.pincode}
                        onChange={(e) => setAddressForm({ ...addressForm, pincode: e.target.value })}
                        className="w-full p-2 border rounded-md"
                        required
                      />
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button type="submit" className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition">
                      Update
                    </button>
                    <button type="button" onClick={() => setShowAddressForm(false)} className="px-6 py-3 bg-gray-400 text-white rounded-lg hover:bg-gray-500 transition">
                      Cancel
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        );

      case "payments":
        return (
          <div className="space-y-4">
            <h2 className="text-2xl font-bold border-b border-gray-300 pb-3">Payment Methods</h2>
            {paymentMethods.length === 0 ? (
              <p className="text-gray-700 text-center">No saved payment methods.</p>
            ) : (
              <div className="grid gap-4">
                {paymentMethods.map((method, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg shadow bg-white">
                    <div>
                      <p className="font-medium text-gray-800">
                        {method.type === "card"
                          ? `Card ending in ${method.last4}`
                          : method.type === "upi"
                          ? `UPI: ${method.upiId}`
                          : `Gift Card: ${method.code}`}
                      </p>
                      <p className="text-sm text-gray-600">
                        {method.type === "card"
                          ? `Expires ${method.expiry}`
                          : method.type === "upi"
                          ? "Linked UPI Account"
                          : "Redeemable Balance"}
                      </p>
                    </div>
                    <button className="text-sm text-pink-500 hover:underline">Remove</button>
                  </div>
                ))}
              </div>
            )}
          </div>
        );

      case "wishlist":
        return (
          <div className="p-4 border rounded-lg shadow bg-white">
            <Cart />
          </div>
        );

      case "myorders":
        return (
          <div className="p-4 border rounded-lg shadow bg-white">
            <Orders />
          </div>
        );

      default:
        return <p className="text-gray-600 text-center">Select a section.</p>;
    }
  };

  return (
    <div className="min-h-screen flex flex-col sm:flex-row gap-6 p-4 sm:p-6 bg-gray-50">
      {/* Sidebar */}
      <div className="w-full sm:w-[280px] bg-white border p-4 rounded-md shadow-md flex-shrink-0 space-y-6">
        <p className="text-2xl font-bold mb-4">PROFILE MENU</p>

        {[
          { label: "Profile Information", key: "profile" },
          { label: "Manage Addresses", key: "addresses" },
          { label: "My Orders", key: "myorders" },
          { label: "Saved Cards / UPI / Gift Cards", key: "payments" },
          { label: "My Cart", key: "wishlist" },
        ].map((item) => (
          <button
            key={item.key}
            onClick={() => setSelectedSection(item.key)}
            className={`w-full text-left p-3 rounded-md border transition 
              ${selectedSection === item.key ? "border-indigo-500 bg-indigo-50" : "border-gray-300 hover:border-indigo-400"}`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1">{renderContent()}</div>
    </div>
  );
};

export default Myprofile;
