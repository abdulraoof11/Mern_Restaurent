import express from "express";
import upload from "./../middlewares/multer.js";
import { adminOnly, protect } from "../middlewares/authMiddleware.js";
import {
  createCategory,
  getAllCategories,
  deleteCategory,
  updateCategory,
} from "../controllers/categoryController.js";

const router = express.Router();
router.post(
  "/createCategory",
  protect,
  adminOnly,
  upload.single("image"),
  createCategory,
);
router.get("/getAllCategories", getAllCategories);
router.delete("/deleteCategory/:id", protect, adminOnly, deleteCategory);
router.put(
  "/updateCategory/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateCategory,
);
export default router;
