import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets.js";
import NewsletterBox from "../components/NewsletterBox";

const Contact = () => {
  return (
    <div className="max-w-screen-xl mx-auto px-4">
      {/* Title Section */}
      <div className="text-center text-2xl pt-10 border-t border-gray-300">
        <Title text1="CONTACT" text2="US" />
      </div>

      {/* Contact Info Section */}
      <div className="flex flex-col md:flex-row justify-center gap-10 my-10">
        <img
          className="w-full md:max-w-[480px] rounded-lg shadow-md"
          src={assets.contact_img}
          alt="Contact"
        />

        <div className="flex flex-col justify-center items-start gap-6">
          <p className="text-gray-600 font-semibold text-xl">Our Store</p>
          <p className="text-gray-500 leading-relaxed">
            64531 Nagpur Station <br />
            SitaBardi 240, Maharashtra, India
          </p>

          <p className="text-gray-500">
            Tel: +91 9405-9898-15 <br />
            Email: gawalisandip150@gmail.com
          </p>

          <p className="text-gray-600 text-xl font-semibold">Careers at Stonair</p>
          <p className="text-gray-500">Learn more about our teams and job openings.</p>

          <button className="border border-black px-6 py-2 hover:bg-black hover:text-white transition-all duration-300">
            Explore Jobs
          </button>
        </div>
      </div>

      {/* Newsletter Box */}
      <NewsletterBox />
    </div>
  );
};

export default Contact;
