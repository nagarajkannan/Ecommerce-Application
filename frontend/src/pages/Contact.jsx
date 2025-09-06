import React from "react";
import { assets } from "../assets/assets";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; 

const Contact = () => {
  const sentMessage = (e) => {
    e.preventDefault();
    toast.success("Submitted successfully 🎉"); 
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-10">
      {/* Page Title */}
      <p className="text-center text-xl sm:text-2xl md:text-3xl text-gray-600 mt-7 px-2 sm:px-0">
        We'd love to hear from you! Fill out the form below and we’ll get in touch.
      </p>

      {/* Contact Section */}
      <div className="my-12 md:my-16 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-12">
        {/* Left - Image */}
        <img
          className="w-full md:w-1/2 max-w-md sm:max-w-lg md:max-w-xl rounded-xl shadow-xl object-cover"
          src={assets.contactimg}
          alt="Contact"
        />

        {/* Right - Contact Form */}
        <div className="w-full md:w-1/2 bg-white shadow-lg rounded-xl p-6 sm:p-8">
          <h3 className="text-2xl sm:text-3xl font-semibold mb-6 text-gray-900">Send us a Message</h3>
          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={sentMessage}>
            {/* Name */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Full Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            {/* Message */}
            <div>
              <label className="block text-sm sm:text-base font-medium text-gray-700 mb-1">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message here..."
                className="w-full border border-gray-300 rounded-lg p-3 sm:p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-indigo-600 text-white font-medium py-3 sm:py-4 px-6 sm:px-8 rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>

      {/* Toast Container */}
      <ToastContainer position="top-right" autoClose={3000} />
    </div>
  );
};

export default Contact;
