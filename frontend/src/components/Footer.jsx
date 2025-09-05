import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-900 via-black to-gray-900 text-gray-300 pt-12">
      <div className="max-w-8xl mx-auto px-6 grid sm:grid-cols-[3fr,2fr,1fr] gap-14 text-sm">

        {/* Logo + About */}
        <div>
          <img src={assets.logo} className="bg-white rounded-lg w-36 mb-5 p-2 shadow-md" alt="Forever Logo" />
          <p className="w-full md:w-3/4 leading-relaxed">
            <span className="text-indigo-400 text-2xl font-semibold">Forever</span> is a creative platform dedicated to building modern, 
            user-friendly, and scalable digital solutions. We focus on clean design, 
            seamless performance, and meaningful user experiences. With passion 
            for technology and innovation, Forever delivers solutions that inspire 
            and empower people.
          </p>
        </div>

        {/* Company Links */}
        <div>
          <p className="text-2xl font-semibold text-white mb-5">Company</p>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-indigo-400 cursor-pointer transition">Home</li>
            <li className="hover:text-indigo-400 cursor-pointer transition">About</li>
            <li className="hover:text-indigo-400 cursor-pointer transition">Delivery</li>
            <li className="hover:text-indigo-400 cursor-pointer transition">Privacy Policy</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <p className="text-2xl font-semibold text-white mb-5">Get in Touch</p>
          <ul className="flex flex-col gap-2">
            <li className="hover:text-indigo-400 transition">📞 +91 8523987682</li>
            <li className="hover:text-indigo-400 transition">📧 contact@foreveryou.com</li>
          </ul>
          {/* Social Icons */}
          <div className="flex gap-4 mt-5 text-xl">
            <a href="#" className="hover:text-indigo-400 transition">🌐</a>
            <a href="#" className="hover:text-indigo-400 transition">📘</a>
            <a href="#" className="hover:text-indigo-400 transition">📷</a>
            <a href="#" className="hover:text-indigo-400 transition">💼</a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-none mt-12 py-4">
        <p className="text-center text-gray-400 text-sm">
          © {new Date().getFullYear()} <span className="text-indigo-400 font-semibold">Forever</span>. All Rights Reserved.
        </p>
      </div>
    </footer>
  )
}

export default Footer
