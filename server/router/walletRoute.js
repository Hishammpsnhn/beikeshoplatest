import express from "express";
import verifyToken from "../middleware/authMiddleware.js";
import { getWalletInfo } from "../controller/walletController.js";

const router = express.Router();

router.use(verifyToken)

router.get('/',getWalletInfo);


export default router;
