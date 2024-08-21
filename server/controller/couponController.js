import Coupons from "../model/couponCodeSchema.js";

// Create a new coupon
export const createCoupon = async (req, res) => {
  try {
    const { code, discount, expDate } = req.body;
    console.log(code, discount, expDate);
    const existingCoupon = await Coupons.findOne({ code });
    if (existingCoupon) {
      return res.status(400).json({ message: "Coupon code already exists" });
    }

    const newCoupon = new Coupons({
      code,
      discount,
      expDate,
    });

    await newCoupon.save();
    res.status(201).json(newCoupon);
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
export const getCouponByCode = async (req, res) => {
  const { code } = req.query;
  try {
    const coupon = await Coupons.findOne({ code });
    if (!coupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    const expDate = new Date(coupon.expDate);
    const today = new Date();
    const timeDiff = expDate.getTime() - today.getTime();
    const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

    if (daysLeft < 0) {
      return res.status(404).json({ message: "Coupon expired" });
    }

    res.status(200).json(coupon);
  } catch (error) {
    res.status(500).json({ message: "Error fetching coupon", error });
  }
};

// Update a coupon by ID
// export const updateCoupon = async (req, res) => {
//   try {
//     const { code, discount, expDate, isActive } = req.body;
//     const updatedCoupon = await Coupons.findByIdAndUpdate(
//       req.params.id,
//       { code, discount, expDate, isActive },
//       { new: true, runValidators: true }
//     );

//     if (!updatedCoupon) {
//       return res.status(404).json({ message: "Coupon not found" });
//     }

//     res.status(200).json(updatedCoupon);
//   } catch (error) {
//     res.status(500).json({ message: "Error updating coupon", error });
//   }
// };

// Delete a coupon by ID
export const deleteCoupon = async (req, res) => {
  try {
    const deletedCoupon = await Coupons.findByIdAndDelete(req.params.id);
    if (!deletedCoupon) {
      return res.status(404).json({ message: "Coupon not found" });
    }

    res.status(200).json(deletedCoupon);
  } catch (error) {
    res.status(500).json({ message: "Error deleting coupon", error });
  }
};
