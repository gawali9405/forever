import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/admin_assets/assets";

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchOrders = async () => {
    if (!token) return;
    setLoading(true);
    try {
      const response = await axios.get(`${backendUrl}/api/order/list`, {
        headers: {
          token,
        },
      });
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message || "Failed to fetch orders");
      }
    } catch (error) {
      console.error("Error fetching orders:", error);
      toast.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (e, orderId) => {
    try {
      const response = await axios.post(
        backendUrl + "/api/order/status",
        { orderId, status: e.target.value },
        {
          headers: {
            token,
          },
        }
      );

      if (response.data.success) {
        toast.success("Order status updated successfully");
        await fetchOrders();
      } else {
        toast.error(response.data.message || "Failed to update order status");
      }
    } catch (error) {
      console.error("Error updating order status:", error);
      toast.error("Failed to update order status");
    }
  };

  useEffect(() => {
    fetchOrders();
  }, [token]);

  return (
    <div className="p-4 md:p-6">
      <h2 className="text-2xl font-semibold mb-6 text-gray-800">Orders Page</h2>

      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        orders.map((order, index) => (
          <div
            key={index}
            className="grid grid-cols-1 sm:grid-cols-[auto_1fr] lg:grid-cols-[auto_1.5fr_1fr_auto] gap-4 items-start border border-gray-200 rounded-lg shadow-sm p-4 md:p-6 mb-4 bg-white text-sm text-gray-700"
          >
            {/* Parcel Icon */}
            <img
              src={assets.parcel_icon}
              alt="parcel icon"
              className="w-12 h-12 object-contain"
            />

            {/* Order Info */}
            <div className="space-y-2">
              <div className="font-medium">
                {order.items.map((item, i) => (
                  <span key={i}>
                    {item.name} x {item.quantity} <span>({item.size})</span>
                    {i !== order.items.length - 1 && ", "}
                  </span>
                ))}
              </div>

              <p className="font-semibold">
                {order.address.firstName} {order.address.lastName}
              </p>

              <div className="text-gray-600">
                <p>{order.address.street}</p>
                <p>
                  {order.address.city}, {order.address.state},{" "}
                  {order.address.country}, {order.address.zipcode}
                </p>
              </div>

              <p>📞 {order.address.phone}</p>
            </div>

            {/* Payment and Order Info */}
            <div className="space-y-1">
              <p>Items: {order.items.length}</p>
              <p>Payment Method: {order.paymentMethod}</p>
              <p>
                Payment:{" "}
                <span
                  className={order.payment ? "text-green-600" : "text-red-600"}
                >
                  {order.payment ? "Done" : "Pending"}
                </span>
              </p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>

            {/* Price and Status */}
            <div className="space-y-2">
              <p className="font-bold text-lg text-green-600">
                {currency}
                {order.amount}
              </p>
              <select
                onChange={(e) => handleStatusChange(e, order._id)}
                value={order.status}
                className="block w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200 text-sm"
              >
                <option value="Order Placed">Order Placed</option>
                <option value="Packing">Packing</option>
                <option value="Shipped">Shipped</option>
                <option value="Out for delivery">Out for delivery</option>
                <option value="Delivered">Delivered</option>
              </select>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
