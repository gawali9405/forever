import React, { useContext, useState, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Orders = () => {
  const { backendUrl, token, userId, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const navigate = useNavigate();

  const fetchOrders = async () => {
    try {
      if (!token) {
        console.error("No token provided");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/user-orders`,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("Orders fetched successfully:", response.data.orders);
      setOrderData(response.data.orders);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  useEffect(() => {
    if (token) {
      fetchOrders();
    }
  }, [token]);
 

  return (
    <div className="border-t border-gray-300 pt-16">
      <div className="text-2xl">
        <Title text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {orderData.map((order, index) => (
          <div
            key={index}
            className="py-4 border-t border-gray-300 text-gray-700 flex flex-col gap-4"
          >
            {order.items.map((item, itemIndex) => (
              <div
                key={itemIndex}
                className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 "
              >
                {/* Product Info */}
                <div className="flex  items-start gap-6 text-sm md:text-center md:w-2/3">
                  <img
                    className="w-16 sm:w-20 object-cover rounded"
                    src={item.image?.[0] || "/default-image.png"}
                    alt={item.name}
                  />
                  <div className="pl-5">
                    <p className="sm:text-base font-medium">{item.name}</p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-base text-gray-700">
                      <p className="text-lg">
                        {currency}
                        {item.price}
                      </p>
                      <p className="text-lg">Quantity: {item.quantity || 1}</p>
                      <p>Size: {item.size || "M"}</p>
                    </div>
                    <p className="mt-2 text-sm  float-left">
                      Date :
                      <span className="text-gray-400">
                        {new Date(order.date).toDateString() || "N/A"}
                      </span>
                    </p>
                    <br />
                    <p className="mt-2 text-sm  float-left">
                      PaymentMethod :
                      <span className="text-gray-500">
                        {order.paymentMethod || "N/A"}
                      </span>
                    </p>
                  </div>
                </div>

                {/* Order Status */}
                <div className="md:w-1/3  flex justify-between md:justify-end lg:justify-between items-center gap-5 ">
                  <div className="flex items-center gap-3  ">
                    <span
                      className={`min-w-2 h-2 rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-500"
                          : "bg-green-500"
                      }`}
                    ></span>
                    <span className="capitalize text-sm">
                      {order.status}
                    </span>
                  </div>
                  <button
                    onClick={() => fetchOrders()}
                    className="border border-gray-300 px-4 py-2 text-sm rounded cursor-pointer hover:bg-gray-100 active:bg-gray-200"
                  >
                    Track Order
                  </button>
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
