import React from "react";
import { assets } from "../assets/admin_assets/assets.js";

const Navbar = ({ setToken }) => {
  return (
    <div className="flex items-center py-2 px-[4%] justify-between">
      <img className="w-16 sm:w-24 md:w-32" src={assets.logo} alt="Logo" />
      <button
        onClick={() => setToken("")}
        className="bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full cursor-pointer active:bg-gray-700"
      >
        Logout
      </button>
    </div>
  );
};

export default Navbar;
