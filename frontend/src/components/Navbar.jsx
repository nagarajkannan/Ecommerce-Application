import React, { useContext, useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { Shopcontext } from "../context/Shopcontext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(Shopcontext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <nav className="bg-white shadow-sm py-5 border-b border-gray-200">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo */}
        <NavLink to="/" className="flex items-center">
          <img src={assets.logo} alt="Logo" className="w-40" />
        </NavLink>

        {/* Desktop Nav */}
        <ul className="hidden md:flex items-center gap-8 text-2xl font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }
            >
              Home
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/collections"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }
            >
              Collections
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/about"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }
            >
              About
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/contact"
              className={({ isActive }) =>
                isActive
                  ? "text-blue-600 border-b-2 border-blue-600 pb-1"
                  : "hover:text-blue-600"
              }
            >
              Contact
            </NavLink>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-6">
          {/* Search */}
          <img
            onClick={() => {
              setShowSearch(true);
            }}
            src={assets.search_icon}
            alt="Search"
            className="w-7 h-7 cursor-pointer"
          />

          {/* Profile Dropdown Toggle */}
          <div className="relative">
            <Link to="/login">
              <img
                src={assets.profile_icon}
                alt="Profile"
                className="w-9 h-9 cursor-pointer"
                onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
              />
            </Link>
            {profileDropdownOpen && token && (
              <ul className="absolute right-0 mt-2 w-40 bg-white shadow-md rounded-md z-50">
                <li>
                  <NavLink
                    to="/myprofile"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    My Profile
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/orders"
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Orders
                  </NavLink>
                </li>
                <li>
                  <hr className="border-gray-200 my-1" />
                </li>
                <li>
                  <p
                    onClick={logout}
                    className="block px-4 py-2 hover:bg-gray-100"
                  >
                    Log Out
                  </p>
                </li>
              </ul>
            )}
          </div>

          {/* Cart Icon */}
          <Link to="/cart" className="relative">
            <img src={assets.cart_icon} alt="Cart" className="w-7 h-7" />
            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs px-1 rounded-full">
              {getCartCount()}
            </span>
          </Link>

          {/* Hamburger Toggle */}
          <img
            src={assets.menu_icon}
            alt="Menu"
            className="w-9 h-9 cursor-pointer md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          />
        </div>
      </div>

      {/* Mobile Nav Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden px-4 pt-4 pb-2 space-y-2 text-base font-medium bg-white shadow-md border-t border-gray-200">
          <NavLink
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            Home
          </NavLink>
          <NavLink
            to="/collections"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            Collections
          </NavLink>
          <NavLink
            to="/about"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            About
          </NavLink>
          <NavLink
            to="/contact"
            onClick={() => setMobileMenuOpen(false)}
            className="block hover:text-blue-600"
          >
            Contact
          </NavLink>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
