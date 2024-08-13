import express from "express";
import { createCart, getCart } from "../controller/cartControllers.js";

const router = express.Router();
router.get("/:id", getCart);
router.post("/create", createCart);
export default router;
