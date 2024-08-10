import express from "express";
import { getAllUsers,userStatusUpdate } from "../controller/userController.js";
import verifyToken from "../middleware/authMiddleware.js";

const router = express.Router();
router.get("/",getAllUsers);
router.get("/:id/status", userStatusUpdate);

export default router;
