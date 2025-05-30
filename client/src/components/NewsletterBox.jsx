import React from "react";

const NewsletterBox = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };
  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-400 mt-3">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor, tempora!
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full
       sm:w-1/2 flex items-center border pl-3 gap-3 mx-auto my-6"
      >
        <input
          type="email"
          className="w-full sm:flex-1 outline-none"
          placeholder="Enter your Email"
          required
        />
        <button className="bg-black text-white text-sm px-10 py-3">
          SUBSCRIBE
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
