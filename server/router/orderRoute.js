import express from "express";
import { createOrder, getOrdersList, getUserOrders, onlinePaymentOrder, onlinePaymentOrderVerify, orderDetails, returnUpdate, updateOrder } from "../controller/orderController.js";
import checkUserStatus from "../middleware/checkUserStatus.js";

const router = express.Router();
router.use(checkUserStatus);

router.get("/:id", getUserOrders);
router.get("/:id/order_details", orderDetails);
router.get("/", getOrdersList);
router.post("/", createOrder);
router.post("/online_payment_order", onlinePaymentOrder);
router.post("/online_payment_order/validate", onlinePaymentOrderVerify);
router.put('/:id/return',returnUpdate)
router.put("/:id", updateOrder);   

export default router;
