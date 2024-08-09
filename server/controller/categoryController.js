import mongoose from "mongoose";
import Category from "../model/categorySchema.js";
import Products from "../model/ProductSchema.js";

// @desc    create a new category
// @route   POST /api/admin/category
// @access  Private
export const createCategory = async (req, res) => {
  try {
    const newCategory = new Category({
      category: req.body.name,
      description: req.body.description,
      subCategory: req.body.subCategory,
    });
    const saved = await newCategory.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("Error saving category:", error.message); // Log the error
    res.status(400).json({ message: error.message });
  }
};

// @desc    get all categories
// @route   GET /api/admin/category
// @access  Public
export const getCategory = async (req, res) => {
  try {
    const categories = await Category.find({ isDeleted: false });
    res.status(200).json(categories);
  } catch (error) {
    console.error("Error getting category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    delete category
// @route   DELETE /api/admin/category
// @access  Public
export const softDeleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    res.status(200).json({ message: "Category soft deleted", category });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    get product by category
// @route   GET /api/admin/category/product
// @access  Public
export const getProductByCategory = async (req, res) => {
  try {
    const { category } = req.query;

    if (!category) {
      return res
        .status(400)
        .json({ message: "Category parameter is required" });
    }

    // const categoryObjectId =  mongoose.Types.ObjectId(category);

    const products = await Products.find({
      category: category,
      isDeleted: false,
    });

    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products by category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
