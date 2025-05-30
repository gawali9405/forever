// import React from "react";
// import { ShopContext } from "../context/ShopContext";
// import { useContext } from "react";
// import { useSearchParams } from "react-router-dom";
// import { useEffect } from "react";
// import axios from "axios";
// import { toast } from "react-toastify";

// const Verify = () => {
//   const { navigate, backendUrl, token, setCartItems } = useContext(ShopContext);
//   const [searchParams, setSearchParams] = useSearchParams();

//   const success = searchParams.get("success");
//   const orderId = searchParams.get("orderId");

//   const verifyPayment = async () => {
//     try {
//       if (!token) return;
//       const response = await axios.post(
//         backendUrl + "/api/order/verifyStripe",
//         { success, orderId },
//         { headers: { token } }
//       );
//       if (response.data.success) {
//         console.log("Payment verified successfully");
//         toast.success("Payment verified successfully!");
//         setCartItems({});
//         navigate("/orders");
//       } else {
//         navigate("/cart");
//         console.error("Payment verification failed");
//         toast.error("Payment verification failed. Please try again.");
//         return;
//       }
//     } catch (error) {
//       console.error("Error verifying payment:", error);
//         toast.error("Payment verification failed. Please try again.");
//       navigate("/cart");
//     }
//   };

//   useEffect(() => {
//     verifyPayment();
//   }, [token]);
//   return <div></div>;
// };

// export default Verify;

import React, { useContext, useEffect } from "react";
import { ShopContext } from "../context/ShopContext";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Verify = () => {
  const { backendUrl, token, setCartItems } = useContext(ShopContext);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const success = searchParams.get("success");
  const orderId = searchParams.get("orderId");

  const verifyPayment = async () => {
    try {
      if (!token) {
        console.warn("Token not found, cannot verify payment.");
        return;
      }

      const response = await axios.post(
        `${backendUrl}/api/order/verifyStripe`,
        { success, orderId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        toast.success("Payment verified successfully!");
        setCartItems({});
        navigate("/orders");
      } else {
        toast.error("Payment verification failed. Please try again.");
        navigate("/cart");
      }
    } catch (error) {
      console.error("Error verifying payment:", error);
      toast.error("Payment verification failed. Please try again.");
      navigate("/cart");
    }
  };

  useEffect(() => {
    verifyPayment();
  }, [token]);

  return <div className="text-center mt-10 text-lg">Verifying Payment...</div>;
};

export default Verify;
