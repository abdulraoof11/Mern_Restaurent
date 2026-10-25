import { v2 as cloudinary } from "cloudinary";
import Menu from "../models/menuModel.js";

export const addMenuController = async (req, res) => {
  try {
    const { name, description, price, category } = req.body;
    if (!name || !description || !price || !category) {
      res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "menu_images",
    });
    const newMenuItem = await Menu.create({
      name,
      description,
      price,
      image: result.secure_url,
      category,
    });
    res.status(200).json({
      message: "Add Menu SuccessFully",
      success: true,
      newMenuItem,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllMenuController = async (req, res) => {
  try {
    const menuItems = await Menu.find()
      .populate("category", "name")
      .sort({ createdAt: -1 });
    res.status(200).json({
      message: "Get All Menu SuccessFully",
      success: true,
      menuItems,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMenuController = async (req, res) => {
  try {
    const id = req.params;
    const { name, description, price, category, isAvailable } = req.body;
    if (!name || !description || !price || !category) {
      res
        .status(400)
        .json({ message: "All fields are required", success: false });
    }
    const menuItem = await Menu.findById(id);
    if (!menuItem) {
      res.status(404).json({ message: "Menu item Not found", success: false });
    }
    if (req.file) {
      const result = await cloudinary.uploader.upload(
        req.file.path,
        {
          folder: "menu_images",
        },
        (menuItem.image = result.secure_url),
      );
    }
    if (name) menuItem.name = name;
    if (description) menuItem.description = description;
    if (price) menuItem.price = price;
    if (category) menuItem.category = category;
    if (isAvailable !== undefined) menuItem.isAvailable = isAvailable;
    await menuItem.save();
    res.status(200).json({
      message: "Menu item updated successfully",
      success: true,
      menuItem,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deletMenuController = async (req, res) => {
  try {
    const id = req.params;
    if (!id) {
      res.status(404).json({
        success: false,
        message: "item not found",
      });
    }
    const deletMenu = await Menu.findByIdAndDelete(id);
    res.status(200).json({
      message: "Menu item delete successfully",
      success: true,
      deletMenu,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getSingleMenuController = async (req, res) => {
  try {
    const id = req.params;
    const singleMenu = await Menu.findById(id).populate("category", "name");
    if (!singleMenu) {
      res.status(404).json({
        success: false,
        message: "item not found",
      });
    }
    res.status(200).json({
      message: "Get Single Menu item successfully",
      success: true,
      singleMenu,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
