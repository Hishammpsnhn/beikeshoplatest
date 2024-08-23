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
    const { category, sort } = req.query;

    if (!category) {
      return res
        .status(400)
        .json({ message: "Category parameter is required" });
    }

    // Validate and convert category to ObjectId
    const categoryId = mongoose.Types.ObjectId.isValid(category)
      ? new mongoose.Types.ObjectId(category)
      : null;

    if (!categoryId) {
      return res.status(400).json({ message: "Invalid category ID" });
    }

    let sortOption = {};
    switch (sort) {
      case "lowToHigh":
        sortOption = { price: 1 };
        break;
      case "highToLow":
        sortOption = { price: -1 };
        break;
      case "aToZ":
        sortOption = { name: 1 };
        break;
      case "zToA":
        sortOption = { name: -1 };
        break;
      default:
        sortOption = {};
    }

    const products = await Products.find({
      category: categoryId,
      isDeleted: false,
    }).sort(sortOption);

    res.status(200).json(products);
  } catch (error) {
    console.error("Error getting products by category:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc   apply offer
// @route   GET /api/admin/category/:id/offer
// @access  Public
export const addOffer = async (req, res) => {
  const { discount } = req.body;
  const categoryId = req.params.id;

  try {
    const category = await Category.findById(categoryId);
    if (!category)
      return res.status(404).json({ message: "Category not found" });
    if (discount) {
      category.offer = discount;
    }

    const product = await Products.find({ category: categoryId });
    if (!product) return res.status(404).json({ message: "Product not found" });

    if (discount) {
      const updatedProducts = await Products.updateMany(
        { category: categoryId },
        { $set: { offer: discount } }
      );
    }

    await category.save();

    res.status(200).json(category);
  } catch (error) {
    console.error("Error getting Product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};
