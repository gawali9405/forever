import UserModel from "../models/userModel.js";

// add product to cart
export const addToCart = async (req, res) => {
  try {
    const userId = req.user?.id; // get from auth middleware
    const { itemId, size} = req.body; 

    if (!userId || !itemId || !size) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: userId, itemId, or size.",
      });
    }

    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let cartData = userData.cartData || {};

    if (cartData[itemId]) {
      if (cartData[itemId][size]) {
        cartData[itemId][size] += 1;
      } else {
        cartData[itemId][size] = 1;
      }
    } else {
      cartData[itemId] = { [size]: 1 };
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully.",
      data: updatedUser.cartData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// update product to cart
export const updateCart = async (req, res) => {
  try {
    const userId = req.user?.id; // get user ID from token
    const { itemId, size, quantity } = req.body;

    if (!userId || !itemId || !size || quantity == null) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields.",
      });
    }

    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    let cartData = userData.cartData || {};

    if (!cartData[itemId]) {
      return res.status(400).json({
        success: false,
        message: "Item not found in cart.",
      });
    }

    // Update quantity or remove size if quantity <= 0
    if (quantity > 0) {
      cartData[itemId][size] = quantity;
    } else {
      // Remove the size
      delete cartData[itemId][size];

      // If no sizes left for item, remove item completely
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    }

    const updatedUser = await UserModel.findByIdAndUpdate(
      userId,
      { cartData },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Cart updated successfully",
      data: updatedUser.cartData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// getusercart product to cart
export const getUserCart = async (req, res) => {
  try {
    const userId = req.user.id; 
    const userData = await UserModel.findById(userId);
    if (!userData) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const cartData = userData.cartData 
 
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      data: cartData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

// delete product from cart
export const deleteFromCart = async (req, res) => {
  try {
    const { id, itemId, size } = req.body;

    const userData = await UserModel.findById({ _id: id });
    const cartData = await userData.cartData;
    if (cartData[itemId] && cartData[itemId][size]) {
      delete cartData[itemId][size];
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      return res.status(404).json({
        success: false,
        message: "Item not found in cart",
      });
    }
    await UserModel.findByIdAndUpdate(
      { _id: id },
      { cartData: cartData },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Item deleted from cart successfully",
      data: cartData,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};
