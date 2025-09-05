import React from 'react';
import { assets } from '../assets/assets';

const Ourpolicy = () => {
  return (
    <div className="py-20 mt-1 px-4 md:px-10 py-10 max-w-7xl mb-3 mx-auto">
      <div className="grid grid-cols-1  sm:grid-cols-3 gap-8 text-center">
        {/* Policy Card */}
        <div className="p-6 border py-16 rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <img src={assets.exchange_icon} className="w-14 mx-auto mb-4" alt="Exchange Icon" />
          <h3 className="font-semibold text-lg mb-1">Easy Exchange Policy</h3>
          <p className="text-gray-500 text-sm">We offer a hassle-free exchange policy for all products.</p>
        </div>

        {/* Policy Card */}
        <div className="p-6  py-16 border rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <img src={assets.quality_icon} className="w-14 mx-auto mb-4" alt="Return Icon" />
          <h3 className="font-semibold text-lg mb-1">7-Day Return Policy</h3>
          <p className="text-gray-500 text-sm">Return your purchase within 7 days—no questions asked.</p>
        </div>

        {/* Policy Card */}
        <div className="p-6  py-16 border rounded-xl shadow-md hover:shadow-lg transition duration-300">
          <img src={assets.support_img} className="w-14 mx-auto mb-4" alt="Support Icon" />
          <h3 className="font-semibold text-lg mb-1">24/7 Customer Support</h3>
          <p className="text-gray-500 text-sm">We’re always here to help, day or night.</p>
        </div>
      </div>
    </div>
  );
};

export default Ourpolicy;
