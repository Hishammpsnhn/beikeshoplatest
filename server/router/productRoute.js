import express from "express";
import {
  addProduct,
  getAllProducts,
  softDeleteProduct,
  getProduct,
  editProduct,
  addOrUpdateRating,
  addOffer,
  searchProductsByName,
} from "../controller/productControllers.js";

const router = express.Router();

router.get("/search", searchProductsByName);
router.get("/", getAllProducts);
router.get("/:id", getProduct);
router.post("/", addProduct);
router.post("/rating", addOrUpdateRating);
router.post("/:id/offer", addOffer);
router.put("/:id", editProduct);
router.delete("/:id", softDeleteProduct);
export default router;
