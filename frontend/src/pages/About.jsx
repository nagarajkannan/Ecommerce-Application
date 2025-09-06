import React from "react";
import { assets } from "../assets/assets";
import Newsletterbox from "../components/Newsletterbox";
import "typeface-electrolize";

const About = () => {
  return (
    <div className="max-w-7xl px-4 sm:px-6 lg:px-10 mx-auto">
      {/* Header */}
      <div className="text-center text-3xl sm:text-4xl md:text-5xl font-semibold mt-10 py-3 text-gray-900">
        About Us
      </div>

      {/* Image + Text */}
      <div className="my-10 flex flex-col md:flex-row gap-8 md:gap-16 items-center">
        <img
          className="w-full max-w-sm sm:max-w-md md:max-w-lg rounded-lg shadow-md"
          src={assets.about_img}
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-4 md:w-2/3 text-gray-700 leading-relaxed">
          <p className="text-base sm:text-lg md:text-xl">
            Welcome to <span className="font-semibold text-indigo-600">ForEver</span>, 
            your trusted online shopping destination. We are passionate about 
            bringing you a seamless and enjoyable shopping experience with a wide 
            variety of products at the best prices.
          </p>
          <p className="text-base sm:text-lg md:text-xl">
            Beyond coding, I am driven by curiosity and continuous learning,
            always exploring new tools and technologies to stay updated in the
            ever-evolving tech world. My goal is to create solutions that solve
            real problems and add value to people’s lives. Whether it’s a
            personal project or a collaborative effort, I bring creativity,
            dedication, and attention to detail to every line of code I write.
          </p>
        </div>
      </div>

      {/* Why Choose Us Header */}
      <div className="text-3xl sm:text-4xl md:text-5xl text-center font-semibold text-gray-900 mb-8">
        <p className="font-orbitron">Why Choose Us</p>
      </div>

      {/* Features */}
      <div className="flex flex-col md:flex-row flex-wrap gap-6 md:gap-8">
        <div className="border border-gray-300 rounded-lg px-6 sm:px-10 py-6 sm:py-12 flex-1 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
          <b className="text-lg sm:text-xl text-indigo-700">Quality Assurance</b>
          <p className="text-gray-600 font-electrolize text-sm sm:text-base md:text-base leading-relaxed">
            I am a dedicated Quality Assurance professional with a strong focus
            on ensuring that software products meet the highest standards of
            functionality, performance, and reliability. With experience in
            manual and automated testing, I specialize in identifying bugs,
            improving processes, and validating that applications deliver the
            intended user experience. My attention to detail and problem-solving
            mindset help me uncover hidden issues and ensure smooth, error-free
            releases.
          </p>
        </div>

        <div className="border border-gray-300 rounded-lg px-6 sm:px-10 py-6 sm:py-12 flex-1 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
          <b className="text-lg sm:text-xl text-indigo-700">Convenience</b>
          <p className="text-gray-600 font-electrolize text-sm sm:text-base md:text-base leading-relaxed">
            I am passionate about creating convenience in every interaction by
            focusing on efficiency, accessibility, and user satisfaction. With a
            customer-first approach, I strive to simplify processes, remove
            unnecessary barriers, and make solutions that save people time and
            effort. My strength lies in understanding user needs and turning
            them into smooth, practical experiences that feel effortless.
          </p>
        </div>

        <div className="border border-gray-300 rounded-lg px-6 sm:px-10 py-6 sm:py-12 flex-1 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
          <b className="text-lg sm:text-xl text-indigo-700">Exceptional Customer Service</b>
          <p className="text-gray-600 font-electrolize text-sm sm:text-base md:text-base leading-relaxed">
            I am committed to delivering exceptional customer service by
            ensuring every interaction is handled with professionalism, empathy,
            and care. My goal is to not only resolve issues but also create a
            positive experience that leaves a lasting impression.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
