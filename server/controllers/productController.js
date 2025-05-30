import { v2 as cloudinary } from "cloudinary";
import ProductModel from "../models/productModel.js";

// function for add product
export const addProduct = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      bestseller,
    } = req.body;

    const image0 = req.files.image0 && req.files.image0[0];
    const image1 = req.files.image1 && req.files.image1[0];
    const image2 = req.files.image2 && req.files.image2[0];
    const image3 = req.files.image3 && req.files.image3[0];

    const images = [image0, image1, image2, image3]
      .filter((image) => image !== undefined)
      .map((image) => image.path);

    const imagesUrls = await Promise.all(
      images.map(async (image) => {
        const result = await cloudinary.uploader.upload(image, {
          folder: "products",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: Array.isArray(sizes) ? sizes : JSON.parse(sizes || "[]"),
      bestseller: bestseller === "true",
      image: imagesUrls,
      date: Date.now(),
    };

    const product = new ProductModel(productData);
    await product.save();

    res.status(200).json({
      message: "Product added successfully",
      product,
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error, please try again later to add product",
      error: error.message,
      success: false,
    });
  }
};

// function for get all products
export const getAllProducts = async (req, res) => {
  try {
    const products = await ProductModel.find({});

    // Check if products exist
    if (!products || products.length === 0) {
      return res
        .status(404)
        .json({ message: "No products found", success: false });
    }

    return res.status(200).json({ products, success: true });
  } catch (error) {
    return res.status(500).json({
      message: "Server error, unable to fetch products",
      error: error.message,
      success: false,
    });
  }
};

// function for delete product
export const deleteProduct = async (req, res) => {
  try {
    const deletedProduct = await ProductModel.findByIdAndDelete(req.params.id);

    if (!deletedProduct) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }

    return res.status(200).json({
      message: "Product deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error, unable to delete product",
      error: error.message,
      success: false,
    });
  }
};


// function for single product information
export const getSingleProduct = async (req, res) => {
  try {
    const { productId } = req.body;
    console.log("Fetching product with ID:", productId);

    const product = await ProductModel.findById(productId);
    if (!product) {
      return res.status(404).json({
        message: "Product not found",
        success: false,
      });
    }
    return res.status(200).json({
      product,
      success: true,
      message: "Product fetched successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error, unable to fetch product",
      error: error.message,
      success: false,
    });
  }
};
