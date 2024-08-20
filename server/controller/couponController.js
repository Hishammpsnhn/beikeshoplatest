import Coupons from "../model/couponCodeSchema.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discount, expDate, isActive } = req.body;

    const existingCoupon = await Coupons.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const newCoupon = new Coupons({
      code,
      discount,
      expDate,
      isActive,
    });

    const savedCoupon = await newCoupon.save();
    res.status(201).json(savedCoupon);
  } catch (error) {
    res.status(500).json({ message: "Error creating coupon", error });
  }
};

// Get all coupons
export const getAllCoupons = async (req, res) => {
  try {
    const coupons = await Coupons.find();
    res.status(200).json(coupons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupons", error });
  }
};

// Get a single coupon by Code
export const getCouponById = async (req, res) => {
    const {code} = req.query
  try {
    const coupon = await Coupons.findOne({code});
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }
    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupon", error });
  }
};

// Update a coupon by ID
export const updateCoupon = async (req, res) => {
  try {
    const { code, discount, expDate, isActive } = req.body;
    const updatedCoupon = await Coupons.findByIdAndUpdate(
      req.params.id,
      { code, discount, expDate, isActive },
      { new: true, runValidators: true }
    );

    if (!updatedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json(updatedCoupon);
  } catch (error) {
    res.status(500).json({ message: "Error updating coupon", error });
  }
};

// Delete a coupon by ID
export const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupons.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json({ message: "Coupon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error });
  }
};
