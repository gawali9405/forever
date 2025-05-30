import React, { use, useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import { useLocation } from "react-router-dom";

const SearchBar = () => {
  const { search, setSearch, showSearch, setShowSearch } =
    useContext(ShopContext);
  const [visible, setVisible] = useState(false);
  const location = useLocation();

  useEffect(() => {
    if (location.pathname.includes("collection")) {
      setVisible(true);
    } else {
      setVisible(false); 
    }
  }, [location]);

  return showSearch && visible ? (
    <div className="bg-gray-50 py-4 text-center">
      <div className="inline-flex items-center justify-center border border-gray-400 px-5 py-2 mx-3 rounded-full sm:w-1/2">
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          type="text"
          className="flex-1 outline-none bg-inherit text-sm"
          placeholder="Enter your name..."
        />
        <img
          src={assets.search_icon}
          alt="search"
          className="w-4 cursor-pointer"
          onClick={() => setShowSearch(false)}
        />
      </div>
      <img
        onClick={() => setShowSearch(false)}
        className="inline w-3 ml-2 cursor-pointer"
        src={assets.cross_icon}
        alt="close"
      />
    </div>
  ) : null;
};

export default SearchBar;
