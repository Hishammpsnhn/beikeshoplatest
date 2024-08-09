import express from "express";
import { getAllUsers,userStatusUpdate } from "../controller/userController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken,getAllUsers);
router.get("/:id/status",verifyToken, userStatusUpdate);

export default router;
