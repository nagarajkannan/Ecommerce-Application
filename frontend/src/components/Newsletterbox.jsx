import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Newsletterbox = () => {
  const [email, setEmail] = useState('');

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() !== '') {
      toast.success('🎉 You’ve successfully subscribed!');
      setEmail('');
    } else {
      toast.error('Please enter a valid email.');
    }
  };

  return (  
    
    <div className="bg-gray-100 mb-10  py-16 px-4 p-9 sm:px-6 lg:px-8 max-w-9xl text-center rounded-xl shadow-inner">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      
      <h2 className="text-3xl md:text-4xl font-bold text-gray-800">
        Subscribe & Get <span className="text-indigo-600">20% Off</span>
      </h2>

      <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm sm:text-base">
        Join our newsletter to stay updated with the latest deals, offers, and product launches.
      </p>

      <form
        onSubmit={onSubmitHandler}
        className="mt-8 max-w-xl mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-2 px-4"
      >
        <input
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          type="email"
          placeholder="Enter your email address"
          className="w-full flex-1 px-5 py-3 rounded-md border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          required
        />

        <button
          type="submit"
          className="bg-indigo-600 hover:bg-indigo-700 transition text-white font-semibold px-6 py-3 rounded-md text-sm"
        >
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default Newsletterbox;
