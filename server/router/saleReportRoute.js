import express from "express";
import {checkUserStatus} from "../middleware/checkUserStatus.js";
import { getSalesReport } from "../controller/salesReport..js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(verifyToken)
router.get("/", getSalesReport);

export default router;
