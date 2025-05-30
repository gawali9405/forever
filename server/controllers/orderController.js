import OrderModel from "../models/orderModel.js";
import UserModel from "../models/userModel.js";
import Stripe from "stripe"; 

const currency = "INR";
const deliveryCharge = 10;
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
 

// placing an  oder using cod method
export const placeOrder = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;

    if (!userId || !items || !amount || !address) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields." });
    }

    const data = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "cod",
      status: "pending",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(data);
    const savedOrder = await newOrder.save();

    await UserModel.findByIdAndUpdate(userId, { cartData: {} });

    res.status(201).json({
      message: "Order placed successfully",
      success: true,
      order: savedOrder,
    });
  } catch (error) {
    console.error("Error placing order:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false,
      error: error.message,
    });
  }
};

// placing an orders using stripe payment method
export const placeOrderWithStripe = async (req, res) => {
  try {
    const { userId, items, amount, address } = req.body;
    const { origin } = req.headers;

    if (!userId || !items || !amount || !address || !origin) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const orderData = {
      userId,
      items,
      amount,
      address,
      paymentMethod: "Stripe",
      status: "pending",
      payment: false,
      date: Date.now(),
    };

    const newOrder = new OrderModel(orderData);
    const savedOrder = await newOrder.save();

    const line_items = items.map((item) => ({
      price_data: {
        currency,
        product_data: {
          name: item.name,
        },
        unit_amount: Math.round(item.price * 100),
      },
      quantity: item.quantity,
    }));

    // Add delivery charge as an additional line item
    line_items.push({
      price_data: {
        currency,
        product_data: {
          name: "Delivery Charge",
        },
        unit_amount: Math.round(deliveryCharge * 100),
      },
      quantity: 1,
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items,
      mode: "payment",
      success_url: `${origin}/verify?success=true&orderId=${savedOrder._id}`,
      cancel_url: `${origin}/verify?success=false&orderId=${savedOrder._id}`,
    });

    return res.status(200).json({
      message: "Stripe checkout session created successfully",
      success: true,
      order: savedOrder,
      session_url: session.url,
    });
  } catch (error) {
    console.error("Error placing order with Stripe:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

// verify  stripe payment
export const verifyStripePayment = async (req, res) => {
  const { orderId, success, userId } = req.body;
  try {
    if (success === "true") {
      await OrderModel.findByIdAndUpdate(orderId, {
        status: "completed",
        payment: true,
      });
      await UserModel.findByIdAndUpdate(userId, { cartData: {} });
      return res.status(200).json({
        message: "Payment successful and order updated",
        success: true,
      });
    } else {
      await OrderModel.findByIdAndUpdate(orderId, {
        status: "failed",
        payment: false,
      });
      return res.status(400).json({
        message: "Payment failed",
        success: false,
      });
    }
  } catch (error) {
    console.error("Error verifying Stripe payment:", error);
    return res.status(500).json({
      message: "Internal server error",
      success: false,
    });
  }
};

 

// all orders data using for admin dashboard
export const getAllOrders = async (req, res) => {
  try {
    const orders = await OrderModel.find({});
    return res.status(200).json({
      message: "All orders fetched successfully",
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Error fetching all orders:", error);
    res.status(500).json({
      message: "Internal server error",
      success: false, // corrected the typo here
    });
  }
};

// user orders data for user dashboard
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const orders = await OrderModel.find({ userId });

    return res.status(200).json({
      success: true,
      message: "Orders fetched successfully",
      orders,
    });
  } catch (error) {
    console.error("Error fetching user orders:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update order status for admin dashboard
export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    await OrderModel.findByIdAndUpdate(orderId, { status });
    return res.status(200).json({
      message: "Order status updated successfully",
      success: true,
    });
  } catch (error) {
    console.error("Error updating order status:", error);
    res.status(500).json({
      message: "Internal server error",
      sucess: false,
    });
  }
};
