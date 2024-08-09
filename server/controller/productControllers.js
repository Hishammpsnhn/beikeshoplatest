import mongoose from "mongoose";
import Products from "../model/ProductSchema.js";


// @desc    gel all product 
// @route   GET /api/admin/product
// @access  Public
export const getAllProducts = async (req, res) => {
  try {
    const product = await Products.find({ isDeleted: false });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};


// @desc    create a  product 
// @route   POST /api/admin/product
// @access  Public
export const addProduct = async (req, res) => {
  const product = req.body.formdata;  
  try {
    const newProduct = new Products({
      name: product.name,
      description: product.description,
      price: product.sizes[0].price,
      category: product.categoryId,
      rating: product.rating,
      images: product.images,
      fabric: product.fabric,
      discount: product.discount,
      sizes: product.sizes,
      type: product.type,
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      message: "Product added successfully!",
      product: savedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error adding product",
      error: error.message,
    });
  }
};

// @desc    edit a  product 
// @route   PUT /api/admin/product/:id
// @access  Public
export const editProduct = async (req, res) => {
  const { id } = req.params; 
  const updatedData = req.body.formdata;  
  console.log(id,updatedData)
  
  try {
    const updatedProduct = await Products.findByIdAndUpdate(
      id,
      {
        name: updatedData.name,
        description: updatedData.description,
        price: updatedData.sizes[0].price,
        category: updatedData.categoryId,
        rating: updatedData.rating,
        images: updatedData.images,
        fabric: updatedData.fabric,
        discount: updatedData.discount,
        sizes: updatedData.sizes,
        type: updatedData.type,
      },
      { new: true }  
    );

    if (!updatedProduct) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product updated successfully!",
      product: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating product",
      error: error.message,
    });
  }
};

// @desc    soft delete a  product 
// @route   DELETE /api/admin/product/:id
// @access  Public
export const softDeleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Products.findByIdAndUpdate(
      id,
      { isDeleted: true },
      { new: true }
    );
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "product soft deleted", product });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};




// @desc   get one product
// @route   GET /api/admin/product/:id
// @access  Public
export const getProduct = async (req, res) => {
  try {
    const product = await Products.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(req.params.id) } },
      {
        $addFields: {
          averageRating: {
            $cond: {
              if: { $gt: [{ $size: "$rating" }, 0] },
              then: { $avg: "$rating.rating" },
              else: 0
            }
          }
        }
      }
    ]);

    res.status(200).json(product[0]);
  } catch (error) {
    console.error("Error getting Product:", error.message);
    res.status(500).json({ message: "Server error" });
  }
};