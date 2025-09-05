import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const location = useLocation();
  const [active, setActive] = useState("add");

  useEffect(() => {
    if (location.pathname === "/") setActive("add");
    else if (location.pathname === "/list") setActive("list");
    else if (location.pathname === "/orders") setActive("orders");
  }, [location.pathname]);

  return (
    <div className="w-[18%] min-h-screen bg-white border-r shadow-xl">
      <div className="flex flex-col gap-4 pt-6 pl-5 text-[15px]">

        {/* Add Items */}
       {/* Add Items */}
<label className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
  <input type="checkbox" checked={active === "add"} readOnly className="w-4 h-4" />
  <NavLink to="/" className="flex items-center gap-3">
    <img className="w-5 h-5 ml-2" src={assets.add_icon} alt="" />
    <p className="hidden md:block font-medium text-gray-700">Add Items</p>
  </NavLink>
</label>

{/* List Items */}
<label className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
  <input type="checkbox" checked={active === "list"} readOnly className="w-4 h-4" />
  <NavLink to="/list" className="flex items-center gap-3">
    <img className="w-5 h-5 ml-2" src={assets.order_icon} alt="" />
    <p className="hidden md:block font-medium text-gray-700">List Items</p>
  </NavLink>
</label>

{/* Orders */}
<label className="flex items-center gap-3 px-4 py-2 rounded-xl cursor-pointer bg-white shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
  <input type="checkbox" checked={active === "orders"} readOnly className="w-4 h-4" />
  <NavLink to="/orders" className="flex items-center gap-3">
    <img className="w-5 h-5 ml-2" src={assets.order_icon} alt="" />
    <p className="hidden md:block font-medium text-gray-700">Orders</p>
  </NavLink>
</label>


      </div>
    </div>
  );
};

export default Sidebar;
