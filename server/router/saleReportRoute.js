import express from "express";
import checkUserStatus from "../middleware/checkUserStatus.js";
import { getSalesReport } from "../controller/salesReport..js";

const router = express.Router();
router.use(checkUserStatus);
router.get("/", getSalesReport);

export default router;
