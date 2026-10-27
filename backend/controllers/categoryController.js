import Category from "../models/categoryModel.js";
import { v2 as cloudinary } from "cloudinary";

export const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    // Get image uploaded through Multer
    const image = req.file;

    if (!name || !image) {
      return res.status(400).json({
        message: "Name and image are required",
      });
    }

    // Check whether category already exists
    const existingCategory = await Category.findOne({ name });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }
    console.log("Image uploaded to Cloudinary:"); // Log the secure URL of the uploaded image

    // Upload image to Cloudinary
    const imageResult = await cloudinary.uploader.upload(image.path, {
      folder: "category_images",
    });
    // Create category
    const newCategory = new Category({
      name,
      image: imageResult.secure_url,
    });

    await newCategory.save();

    return res.status(201).json({
      message: "Category created successfully",
      category: newCategory,
    });
  } catch (error) {
    console.error("Create Category Error:", error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

export const getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      message: "Get all categories successfully",
      categories,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndDelete(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await Category.findById(id);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    if (req.file) {
      const imageResult = await cloudinary.uploader.upload(req.file.path, {
        folder: "category_images",
      });
      category.image = imageResult.secure_url;
    }
    category.name = name;
    await category.save();
    res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
