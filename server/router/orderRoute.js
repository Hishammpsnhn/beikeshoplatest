import express from "express";
import { createOrder, getOrdersList, getUserOrders, onlinePaymentOrder, onlinePaymentOrderVerify, orderDetails, returnUpdate, updateOrder } from "../controller/orderController.js";
import {checkUserStatus} from "../middleware/checkUserStatus.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(verifyToken)
router.get("/:id", getUserOrders);
router.get("/:id/order_details", orderDetails);
router.get("/", getOrdersList);
router.post("/", createOrder);
router.post("/online_payment_order", onlinePaymentOrder);
router.post("/online_payment_order/validate", onlinePaymentOrderVerify);
router.put('/:id/return',returnUpdate)
router.put("/:id", updateOrder);   

export default router;
