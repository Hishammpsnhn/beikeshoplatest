import express from "express";
import { createCart, getCart, updateCart } from "../controller/cartControllers.js";

const router = express.Router();
router.get("/:id", getCart);
router.post("/create", createCart);
router.put("/:id", updateCart);
export default router;
