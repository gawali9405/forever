import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";

const List = ({ token }) => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error("Failed to fetch list");
        console.error("Error fetching list:", response.data.message);
      }
    } catch (error) {
      console.error("Error fetching list:", error);
     
    }
  };

  const deleteProduct = async (id) => {
    try {
      const response = await axios.delete(
        `${backendUrl}/api/product/delete/${id}`,
        {
          headers: { token },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error("An error occurred while deleting the product");
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4 text-center md:text-left">
        All Products List
      </h2>

      <div className="flex flex-col gap-3">
        {/* Table header for desktop */}
        <div className="hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-3 border border-gray-300 bg-gray-200 text-sm font-medium rounded">
          <span>Image</span>
          <span>Name</span>
          <span>Category</span>
          <span>Price</span>
          <span className="text-center">Action</span>
        </div>

        {/* Product items */}
        {list.map((item, index) => (
          <div
            key={index}
            className="flex flex-col md:grid md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-3 md:gap-2 py-2 px-3 border border-gray-300 rounded shadow-sm"
          >
            {/* Product image */}
            <div className="flex justify-center w-full md:justify-start">
              <img
                src={item.image[0]}
                alt={`Image of ${item.name}`}
                className="w-20 h-20 object-cover rounded"
              />
            </div>

            <p className="text-center md:text-left w-full">{item.name}</p>

            <p className="text-center md:text-left w-full">{item.category}</p>

            <p className="text-center md:text-left w-full text-green-600 font-medium">
              {currency}
              {item.price}
            </p>

            <p
              onClick={() => deleteProduct(item._id)}
              className="text-center text-red-600 text-xl cursor-pointer hover:text-red-800 w-full"
            >
              X
            </p>
          </div>
        ))}
      </div>

      {list.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No products available.</p>
      )}
    </div>
  );
};

export default List;
