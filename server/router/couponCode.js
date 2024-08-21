import express from "express";
import { createCoupon,deleteCoupon,getAllCoupons,getCouponByCode} from "../controller/couponController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken)

router.get('/',getAllCoupons)
router.get('/coupon',getCouponByCode)
router.post('/',createCoupon)
router.delete('/:id',deleteCoupon)

export default router;
