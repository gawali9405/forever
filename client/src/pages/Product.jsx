import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/frontend_assets/assets";
import RelatedProduct from "../components/RelatedProduct";
 

const Product = () => {
  const { productId } = useParams();
  const { products, currency,addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [size, setSize] = useState("");

  const getProductData = () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);  
        return null;
      }
    });
  };

  useEffect(() => {
    getProductData();
  }, [productId]);

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      {/* productData  */}
      <div className="flex gap-12 sm-gap-12 flex-row sm-flex-col">
        {/* product image  */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justity-between sm:justify-normal sm:w-[18.7%] w-full">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                key={index}
                src={item}
                alt="product"
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            {<img src={image} alt="product" className="w-full h-auto" />}
          </div>
        </div>
        {/* product details  */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="star-icon" className="w-3" />
            <img src={assets.star_icon} alt="star-icon" className="w-3" />
            <img src={assets.star_icon} alt="star-icon" className="w-3" />
            <img src={assets.star_icon} alt="star-icon" className="w-3" />
            <img src={assets.star_dull_icon} alt="star-icon" className="w-3" />
            <p className="pl-2">(122)</p>
          </div>
          <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}{" "}
          </p>
          <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}{" "}
          </p>
          <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  key={index}
                  className={`border border-gray-300 px-4 py-2 rounded  cursor-pointer ${
                    item === size ? "bg-orange-200" : ""
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
          <button
          onClick={() => addToCart(productData._id, size)}
          className="bg-black text-white px-8 py-3 cursor-pointer text-sm active:bg-gray-700">
            ADD TO CART
          </button>
          <hr className="mt-8 sm:w-4/5" />
          <div
            className="text-sm text-gray-500 mt-5
           flex flex-col gap-1"
          >
            <p>100% Original Product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchanage policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* description and reviews  */}
      <div className="mt-20">
        <div className="flex ">
          <b className="border border-gray-300 px-5 py-3 text-sm">
            Description
          </b>
          <p className="border border-gray-300  px-5 py-3 text-sm">
            Reviews (122)
          </p>
        </div>
        <div className="flex flex-col gap-4 border border-gray-300  px-6 py-6 text-sm text-gray-600">
          <p>
            From the latest trends to timeless essentials, we bring you a
            curated selection designed to elevate your lifestyle. Whether you're
            upgrading your wardrobe, revamping your home, or searching for the
            perfect gift — we've got you covered. Discover top-quality products
            crafted to meet your everyday needs. Shop with confidence and enjoy
            seamless browsing, secure checkout, and fast delivery — all in one
            place.
          </p>
          <p>
            Our mission is to deliver unbeatable value, exceptional service, and
            a shopping experience you’ll love. Join thousands of happy customers
            and make your next purchase with us today. Enjoy exclusive deals,
            new arrivals every week, and personalized recommendations tailored
            just for you. We're here to make online shopping simple, enjoyable,
            and rewarding — every step of the way.
          </p>
        </div>
      </div>
      {/* text  display related products  */}
      <RelatedProduct
        category={productData.category}
        subCategory={productData.subCategory}
      />
    </div>
  ) : (
    <div className="opacity-0"></div>
  );
};

export default Product;
