import express from "express";
import { addWishlist, getWishlist, removeItemWishlist } from "../controller/wishlistController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();

router.use(verifyToken)

router.get('/',getWishlist)
router.post('/',addWishlist)
router.put('/',removeItemWishlist)

export default router;
