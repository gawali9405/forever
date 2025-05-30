import express from "express";
import {
  placeOrder,
  placeOrderWithStripe, 
  getAllOrders,
  getUserOrders,
  updateOrderStatus,
  verifyStripePayment,
} from "../controllers/orderController.js";
import adminAuth from "../middlewares/adminAuth.js";
import authUser from "../middlewares/auth.js";

const orderRouter = express.Router();

// admin feactures
orderRouter.get("/list", adminAuth, getAllOrders);
orderRouter.post("/status", adminAuth, updateOrderStatus);

// user features
orderRouter.post("/place", placeOrder);
orderRouter.post("/stripe", authUser, placeOrderWithStripe); 

orderRouter.post("/user-orders", authUser, getUserOrders);

orderRouter.post("/verifyStripe", authUser, verifyStripePayment);

export default orderRouter;
