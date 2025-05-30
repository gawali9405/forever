import React, { useState } from "react";
import { assets } from "../assets/admin_assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState([null, null, null, null]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("A lightweight, usually knitted, pullover shirt, close-fitting and with a round neckline and short sleeves, worn as an undershirt or outer garment.");
  const [category, setCategory] = useState("Men");
  const [subCategory, setSubCategory] = useState("Topwear");
  const [price, setPrice] = useState("");
  const [sizes, setSizes] = useState([]);
  const [isBestseller, setIsBestseller] = useState(false);
 
  

  const handleImageChange = (index, file) => {
    const updatedImages = [...images];
    updatedImages[index] = file;
    setImages(updatedImages);
  };

  const handleSizeToggle = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      images.forEach((img, index) => {
        if (img) {
          formData.append(`image${index + 1}`, img);
        }
      });

      formData.append("name", name);
      formData.append("description", description);
      formData.append("category", category);
      formData.append("subCategory", subCategory);
      formData.append("price", price);
      formData.append("sizes", JSON.stringify(sizes));
      formData.append("bestseller", isBestseller);

      const response = await axios.post(
        backendUrl + "/api/product/add",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            token: token,
          },
        }
      );

      console.log("Product uploaded successfully:", response.data);
      toast.success("Product uploaded successfully!");
      setImages([null, null, null, null]);
      setName("");
      setDescription("");
      setCategory("Men") 
      setSubCategory("Topwear");
      setPrice("");
      setSizes([]);
      setIsBestseller(false);

    } catch (error) {
      console.error("Error uploading product:", error);
      toast.error(
        error.response?.data?.message ||
          "Failed to upload product. Please try again."
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-6 p-6 rounded-xl w-full max-w-3xl mx-auto mt-6"
    >
      <h2 className="text-2xl font-bold text-gray-800">Upload Images</h2>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {images.map((img, index) => (
          <label
            htmlFor={`image${index}`}
            key={index}
            className="cursor-pointer"
          >
            <img
              className="w-24 h-24 object-cover border-2 border-dashed border-gray-300 rounded-lg hover:border-blue-500 transition"
              src={img ? URL.createObjectURL(img) : assets.upload_area}
              alt={`upload image ${index + 1}`}
            />
            <input
              type="file"
              id={`image${index}`}
              hidden
              onChange={(e) => handleImageChange(index, e.target.files[0])}
            />
          </label>
        ))}
      </div>

      <div className="w-full">
        <label className="block mb-1 text-gray-700">Product Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter product name"
          className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="w-full">
        <label className="block mb-1 text-gray-700">Product Description</label>
        <textarea
          rows="4"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter product description"
          className="w-full px-4 py-2 border border-gray-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 w-full">
        <div className="flex-1">
          <label className="block mb-1 text-gray-700">Product Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Men">Men</option>
            <option value="Women">Women</option>
            <option value="Kids">Kids</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-gray-700">
            Product SubCategory
          </label>
          <select
            value={subCategory}
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div>
        <div className="flex-1">
          <label className="block mb-1 text-gray-700">Product Price</label>
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2 text-gray-700">Product Sizes</p>
        <div className="flex gap-3 flex-wrap">
          {["S", "M", "L", "XL", "XXL"].map((size) => (
            <div
              key={size}
              onClick={() => handleSizeToggle(size)}
              className={`px-4 py-2 border rounded-full text-sm cursor-pointer ${
                sizes.includes(size)
                  ? "bg-blue-500 text-white border-blue-500"
                  : "border-gray-300 text-gray-700 hover:bg-blue-100"
              }`}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          id="bestseller"
          checked={isBestseller}
          onChange={(e) => setIsBestseller(e.target.checked)}
          className="accent-blue-500"
        />
        <label htmlFor="bestseller" className="text-gray-700">
          Add to Bestseller
        </label>
      </div>

      <button
        type="submit"
        className=" cursor-pointer self-start bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-800 transition"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
