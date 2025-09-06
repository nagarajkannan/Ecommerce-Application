import React, { useContext, useEffect, useState } from 'react';
import { Shopcontext } from '../context/Shopcontext';
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

const Search = () => {
  const { search, setSearch, showsearch, setShowSearch } = useContext(Shopcontext);
  const location = useLocation();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(location.pathname.includes('collections'));
  }, [location]);

  if (!showsearch || !visible) return null;

  return (
    <div className="border-t border-b bg-gray-50 py-4 px-4 sm:px-6 relative flex justify-center">
      {/* Search Box */}
      <div className="relative w-full sm:w-1/2">
        <input
          type="text"
          value={search}
          placeholder="Search"
          onChange={(e) => setSearch(e.target.value)}
          className="w-full py-2 pl-4 pr-10 sm:py-3 sm:pl-4 sm:pr-12 text-sm sm:text-base rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
        />

        {/* Search Icon */}
        <img
          src={assets.search_icon}
          alt="search"
          className="absolute right-10 top-1/2 transform -translate-y-1/2 w-5 h-5 sm:w-6 sm:h-6 pointer-events-none"
        />

        {/* Close Button */}
        <button
          onClick={() => setShowSearch(false)}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 sm:w-7 sm:h-7 flex items-center justify-center rounded-full hover:bg-gray-200 transition"
        >
          <img src={assets.cross_icon} alt="close" className="w-4 h-4 sm:w-5 sm:h-5 object-contain" />
        </button>
      </div>
    </div>
  );
};

export default Search;
