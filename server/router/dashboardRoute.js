import express from "express";
import { getMonthOrdersData, getTop10Category, getTop10Product, getWeeklyOrdersData, getYearOrdersData } from "../controller/dashboard.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();


router.get('/year',getYearOrdersData)
router.get('/month',getMonthOrdersData)
router.get('/week',getWeeklyOrdersData)
router.get('/getTopCategory',getTop10Category)
router.get('/getTopProducts',getTop10Product)

export default router;
