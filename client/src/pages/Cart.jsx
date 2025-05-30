import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/frontend_assets/assets";
import CartTotal from "../components/CartTotal";
import { toast } from "react-toastify";

const Cart = () => {
  const { products, currency, cartItems, updatedQuantity, navigate,token } =
    useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (!products || products.length === 0) return;

    const tempData = [];
    for (const items in cartItems) {
      for (const item in cartItems[items]) {
        if (cartItems[items][item] > 0) {
          tempData.push({
            id: items,
            size: item,
            quantity: cartItems[items][item],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems, products]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item.id
          );

          return (
            <div
              key={index}
              className="py-4 border-t border-b border-gray-300 text-gray-600 grid grid-cols-[4fr_0.5fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20"
                  src={productData.image[0]}
                  alt="product Image"
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.name}
                  </p>
                  <div className="flex items-center gap-5 mt-2">
                    <p>
                      {currency}
                      {productData.price}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border border-gray-300 bg-slate-50">
                      {item.size}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onClick={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updatedQuantity(
                        item.id,
                        item.size,
                        Number(e.target.value)
                      )
                }
                className="border border-gray-300 max-w-10 sm:max-w-20 px-1 sm:px-1 py-1"
                type="Number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => {
                  updatedQuantity(item.id, item.size, 0);
                  toast.success("Item removed from cart successfully");
                }}
                className="w-4 mr-4 sm:w-5 cursor-pointer"
                src={assets.bin_icon}
                alt="product"
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => {
                if (token) {
                  navigate("/place-order");
                } else {
                  toast.info("Please login to continue");
                  navigate("/login");
                }
              }}
              className="bg-black text-white px-8 py-3 mt-8 cursor-pointer text-sm active:bg-gray-700"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
