import express from "express";
import { createOrder, getOrdersList, getUserOrders, orderDetails, updateOrder } from "../controller/orderController.js";
import checkUserStatus from "../middleware/checkUserStatus.js";

const router = express.Router();
router.use(checkUserStatus);

router.get("/:id", getUserOrders);
router.get("/:id/order_details", orderDetails);
router.get("/", getOrdersList);
router.post("/", createOrder);
router.put("/:id", updateOrder);   

export default router;
