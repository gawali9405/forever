import React from "react";
import { assets } from "../assets/frontend_assets/assets.js";
import Title from "../components/Title.jsx";
import NewsletterBox from "../components/NewsletterBox.jsx";

const About = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {/* About Us Section */}
      <div className="text-2xl text-center pt-8 border-t border-gray-300">
        <Title text1="ABOUT" text2="US" />
      </div>

      <div className="my-10 flex flex-col md:flex-row items-center gap-10">
        <img
          className="w-full md:max-w-[450px] rounded-lg shadow-md"
          src={assets.about_img}
          alt="About us"
        />

        <div className="flex flex-col justify-center gap-5 text-gray-700 md:w-2/3">
          <p>
            Stonair was born out of a passion for{" "}
            <span className="font-semibold">innovation</span> and a desire to
            revolutionize the way we think about technology and design. With a
            dedicated team of thinkers, creators, and problem-solvers, we strive
            to bring ideas to life that make a difference.
          </p>
          <p>
            From intuitive user interfaces to robust backend solutions, our
            mission is to deliver impactful digital experiences that empower
            individuals and businesses alike. Join us on our journey to innovate
            and inspire.
          </p>

          <b className="text-gray-800 text-lg">Our Mission</b>
          <p className="text-gray-600 leading-relaxed">
            Our mission is to empower individuals and businesses by delivering
            innovative, reliable, and user-centric digital solutions. We are
            committed to pushing boundaries, embracing new technologies, and
            creating products that make a meaningful impact in everyday lives.
            At the core of everything we do is a dedication to quality,
            integrity, and customer success.
          </p>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-4xl py-4 text-center">
        <Title text1="WHY" text2="CHOOSE US?" />
      </div>

      <div className="flex flex-col md:flex-row gap-5 text-sm mb-20">
        <div className="border border-gray-300 px-8 md:px-16 py-10 flex flex-col gap-4">
          <b className="text-base">Quality Assurance</b>
          <p>
            We ensure that every product and service we deliver undergoes strict
            quality checks to meet industry standards and exceed customer
            expectations.
          </p>
        </div>

        <div className="border border-gray-300 px-8 md:px-16 py-10 flex flex-col gap-4">
          <b className="text-base">Convenience</b>
          <p>
            Our solutions are designed with the user in mind, offering seamless
            experiences that save time, reduce complexity, and increase
            productivity.
          </p>
        </div>

        <div className="border border-gray-300 px-8 md:px-16 py-10 flex flex-col gap-4">
          <b className="text-base">Exceptional Customer Service</b>
          <p>
            We pride ourselves on providing responsive, helpful, and
            personalized support to ensure our clients are satisfied and
            successful.
          </p>
        </div>
      </div>
      <NewsletterBox/>
    </div>
  );
};

export default About;
