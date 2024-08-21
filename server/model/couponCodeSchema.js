import mongoose from "mongoose";

const { Schema } = mongoose;

const couponCodeSchema = new Schema(
  {
    code: { type: String, required: true, unique: true },
    discount: { type: Number, required: true },
    expDate: { type: Date, required: true },
  },
  { timestamps: true }
);

const Coupons = mongoose.model("coupons", couponCodeSchema);

export default Coupons;
