import express from "express";
import { adminOnly, protect } from "./../middlewares/authMiddleware.js";
import {
  addMenuController,
  deletMenuController,
  getAllMenuController,
  getSingleMenuController,
  updateMenuController,
} from "../controllers/menuController.js";
import upload from "../middlewares/multer.js";
const router = express.Router();
router.post(
  "/addMenu",
  protect,
  adminOnly,
  upload.single("image"),
  addMenuController,
);
router.get("/getAllMenu", getAllMenuController);
router.put(
  "/updateMenu/:id",
  protect,
  adminOnly,
  upload.single("image"),
  updateMenuController,
);
router.delete("/deleteMenu/:id", protect, adminOnly, deletMenuController);
router.post("/getSingleMenu/:id", getSingleMenuController);
export default router;
