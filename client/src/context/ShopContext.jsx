import React from "react";
import { createContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

export const ShopContext = createContext();

const ShopContextProvider = (props) => {
  const currency = "$";
  const delivery_fee = 10;
  const backendUrl =
    import.meta.env.VITE_BACKEND_URL || "http://localhost:8000";
  const [search, setSearch] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  const [cartItems, setCartItems] = useState({});
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [userData, setUserData] = useState(null);
  const navigate = useNavigate();

  const addToCart = async (itemId, size) => {
    if (!size) {
      toast.error("Please select a size for the item.");
      return;
    }

    const updatedCart = structuredClone(cartItems);

    if (updatedCart[itemId]) {
      updatedCart[itemId][size] = (updatedCart[itemId][size] || 0) + 1;
    } else {
      updatedCart[itemId] = { [size]: 1 };
    }

    setCartItems(updatedCart);

    toast.success("Item added to cart successfully.");
    if (token) {
      try {
        const response = await axios.post(
          backendUrl + "/api/cart/add",
          { itemId, size },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.success) {
          setCartItems(response.data.data);
        } else {
          toast.error(response.data.message || "Failed to update cart.");
        }
      } catch (error) {
        console.error("Error adding to cart:", error);
        toast.error("Failed to sync with server.");
      }
    }
  };

  const getCartCount = () => {
    let totalCount = 0;
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        try {
          if (cartItems[items][item] > 0) {
            totalCount += cartItems[items][item];
          }
        } catch (error) {
          console.log(
            `Error in getting cart count for item ${items} with size ${item}:`,
            error
          );
        }
      }
    }
    return totalCount;
  };

  const updatedQuantity = async (itemId, size, quantity) => {
    let cartData = structuredClone(cartItems);

    cartData[itemId][size] = quantity;
    setCartItems(cartData);

    if (token) {
      try {
        await axios.post(
          backendUrl + "/api/cart/update",
          { itemId, size, quantity },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.error("Error updating cart quantity:", error);
        toast.error("Failed to update cart quantity.");
      }
    }
  };

  const getCartAmount = () => {
    if (!products || products.length === 0) return 0;

    let totalAmount = 0;

    for (const itemId in cartItems) {
      const itemInfo = products.find(
        (p) => p._id.toString() === itemId.toString()
      );

      if (!itemInfo) {
        console.warn(`Product with ID ${itemId} not found in products list.`);
        continue;
      }

      const sizes = cartItems[itemId];
      for (const size in sizes) {
        const quantity = sizes[size];
        if (quantity > 0) {
          totalAmount += itemInfo.price * quantity;
        }
      }
    }

    return totalAmount;
  };

  const getProductsData = async () => {
    try {
      const response = await axios.get(backendUrl + "/api/product/list");

      if (response.data.products) {
        setProducts(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getUserCart = async (authToken) => {
    if (!authToken) {
      toast.error("User not authenticated, token missing.");
      return;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/cart/get",
        {},
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      );

      if (response.data.success) {
        setCartItems(response.data.data);
      } else {
        toast.error(response.data.message || "Failed to fetch cart data.");
      }
    } catch (error) {
      console.error("Error fetching user cart:", error);
      toast.error("Failed to fetch cart data.");
    }
  };

  useEffect(() => {
    getProductsData();
  }, []);

  useEffect(() => {
    if (!token) {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        getUserCart(storedToken);

        try {
          const decoded = jwtDecode(storedToken);
          const uid = decoded.id || decoded._id || decoded.userId;
          setUserId(uid);
        } catch (err) {
          console.error("Invalid token:", err);
        }
      }
    }
  }, []);

  const value = {
    products,
    currency,
    delivery_fee,
    search,
    setSearch,
    showSearch,
    setShowSearch,
    cartItems,
    setCartItems,
    addToCart,
    getCartCount,
    updatedQuantity,
    getCartAmount,
    navigate,
    backendUrl,
    token,
    setToken,
    userId,
    setUserData,
    userData,
  };

  return (
    <ShopContext.Provider value={value}>{props.children}</ShopContext.Provider>
  );
};

export default ShopContextProvider;
