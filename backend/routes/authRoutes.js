import express from "express";

const router = express.Router();

// Import your authentication controller functions here
import {
  registerController,
  loginController,
  logoutController,
  adminController,
  getUserController,
} from "../controllers/authController.js";
import { protect } from "../middlewares/authMiddleware.js";
// Define your routes here
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/admin", adminController);
router.post("/profile/:id", protect, getUserController);

export default router;
