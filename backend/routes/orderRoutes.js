import express from "express";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  getAllOrders,
  getUserOrders,
  placeOrder,
  updateOrderStatus,
} from "../controllers/orderController.js";
const router = express.Router();

router.post("/placeOrder", protect, placeOrder);
router.get("/my-orders", protect, getUserOrders);
router.get("/orders", protect, getAllOrders);
router.put("/update-status/:id", adminOnly, updateOrderStatus);
export default router;
