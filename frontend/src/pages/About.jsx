import React from "react";
import { assets } from "../assets/assets";
import Newsletterbox from "../components/Newsletterbox";
import "typeface-electrolize";

const About = () => {
  return (
    <div className="max-w-8xl px-4 mx-20">
      <div className="text-center text-4xl font-semibold mt-10 py-3 text-gray-900"></div>

      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-md md:ml-32" 
          src={assets.about_img}
          alt="About Us"
        />

        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-700 leading-relaxed">
          <p className="font-crimson text-lg md:text-2xl">
          Welcome to <span className="font-semibold text-indigo-600">ForEver</span>, 
          your trusted online shopping destination. We are passionate about 
          bringing you a seamless and enjoyable shopping experience with a wide 
          variety of products at the best prices.
          </p>
          <p className="font-crimson text-lg md:text-2xl">
            Beyond coding, I am driven by curiosity and continuous learning,
            always exploring new tools and technologies to stay updated in the
            ever-evolving tech world. My goal is to create solutions that solve
            real problems and add value to people’s lives. Whether it’s a
            personal project or a collaborative effort, I bring creativity,
            dedication, and attention to detail to every line of code I write.
          </p>
        </div>
      </div>

      <div className="text-4xl text-center font-semibold text-gray-900 mb-8">
        <p className="font-orbitron">Why Choose Us</p>
      </div>

      <div className="flex flex-col md:flex-row text-base md:text-lg mb-16 gap-8">
        <div className="border border-gray-300 rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
          <b className="text-xl text-indigo-700">Quality Assurance</b>
          <p className="text-gray-600 font-electrolize leading-relaxed">
            I am a dedicated Quality Assurance professional with a strong focus
            on ensuring that software products meet the highest standards of
            functionality, performance, and reliability. With experience in
            manual and automated testing, I specialize in identifying bugs,
            improving processes, and validating that applications deliver the
            intended user experience. My attention to detail and problem-solving
            mindset help me uncover hidden issues and ensure smooth, error-free
            releases. Beyond testing, I believe quality assurance is about
            building confidence and trust in a product. I enjoy collaborating
            closely with developers, designers, and stakeholders to align on
            requirements and deliver solutions that not only work but also
            exceed expectations.{" "}
          </p>
        </div>

        <div className="border border-gray-300 rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
          <b className="text-xl text-indigo-700">Convenience</b>
          <p className="text-gray-600 font-electrolize leading-relaxed">
            I am passionate about creating convenience in every interaction by
            focusing on efficiency, accessibility, and user satisfaction. With a
            customer-first approach, I strive to simplify processes, remove
            unnecessary barriers, and make solutions that save people time and
            effort. My strength lies in understanding user needs and turning
            them into smooth, practical experiences that feel effortless. For
            me, convenience is not just about speed—it’s about reliability,
            clarity, and comfort. I enjoy collaborating with teams to design
            systems and services that are easy to use while maintaining high
            standards of quality.
          </p>
        </div>

        <div className="border border-gray-300 rounded-lg px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 shadow-sm hover:shadow-md transition-shadow duration-300 bg-white">
          <b className="text-xl text-indigo-700">
            Exceptional Customer Service
          </b>
          <p className="text-gray-600 font-electrolize leading-relaxed">
            I am committed to delivering exceptional customer service by
            ensuring every interaction is handled with professionalism, empathy,
            and care. With strong communication skills and a customer-first
            mindset, I focus on understanding individual needs and providing
            timely, effective solutions that build trust and satisfaction. My
            goal is to not only resolve issues but also create a positive
            experience that leaves a lasting impression. I believe exceptional
            customer service goes beyond solving problems—it’s about building
            relationships, anticipating needs, and exceeding expectations. I
            take pride in being approachable, reliable, and resourceful, whether
            assisting customers directly or supporting a team to achieve service
            excellence.{" "}
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
