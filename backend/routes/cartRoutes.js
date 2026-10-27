import express from "express";
import { protect } from "../middlewares/authMiddleware.js";
import {
  addToCart,
  getCart,
  removeFromCart,
} from "../controllers/cartController.js";
const router = express.Router();
router.post("/add-to-cart", protect, addToCart);
router.get("/cart", protect, getCart);
router.delete("/remove", protect, removeFromCart);
export default router;
