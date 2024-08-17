import express from "express";
import {
  getAllUsers,
  profileUpdate,
  userStatusUpdate,
  addAddress,
  deleteAddress,
  EditAddress,
} from "../controller/userController.js";
import checkUserStatus from "../middleware/checkUserStatus.js";

const router = express.Router();
router.use(checkUserStatus);
router.get("/", getAllUsers);
router.get("/:id/status", userStatusUpdate);

router.post("/:id/address", addAddress);
router.delete("/:id/address/:addressId", deleteAddress);
router.put("/:id/address/:addressId", EditAddress);

router.put("/:id/profile", profileUpdate);

export default router;
