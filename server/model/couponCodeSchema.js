import mongoose from "mongoose";

const { Schema } = mongoose;

const couponCodeSchema = new Schema(
  {
    Code: { type: String, required: true, unique: true },
    Discount: { type: Number, required: true },
    Exp_date: { type: Date, required: true },
    IsActive: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Coupons = mongoose.model("coupons", couponCodeSchema);

export default Coupons;
