import express from "express";

const router = express.Router();

// Import your authentication controller functions here
import {
  registerController,
  loginController,
  logoutController,
  adminController,
} from "../controllers/authController.js";
// Define your routes here
router.post("/register", registerController);
router.post("/login", loginController);
router.post("/logout", logoutController);
router.post("/admin", adminController);

export default router;
