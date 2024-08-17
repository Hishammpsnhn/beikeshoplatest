import express from "express";
import { createCart, getCart, updateCart } from "../controller/cartControllers.js";
import checkUserStatus from "../middleware/checkUserStatus.js";

const router = express.Router();
router.use(checkUserStatus);
router.get("/:id", getCart);
router.post("/create", createCart);
router.put("/:id", updateCart);
export default router;
