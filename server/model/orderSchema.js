import mongoose from "mongoose";

const { Schema } = mongoose;

const ordersSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    product: [
      {
        product: { type: Schema.Types.ObjectId, ref: "Product" },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        size: { type: String, required: true },
        offer: { type: Number },
      },
    ],
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    deliveryCharge: { type: Number, required: true, default: 0 },
    couponId: { type: Schema.Types.ObjectId, ref: "Coupon" },
    address: {
      fullName: { type: "string", required: "true" },
      landmark: { type: "string", required: "true" },
      // city: { type: "string", required: "true" },
      // state: { type: "string", required: "true" },
      location: { type: "string", required: "true" },
      distance: { type: "number", required: "true" },
      pinCode: { type: "number", required: "true" },
      phoneNumber: { type: "number", required: "true" },
    },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["online payment", "cod", "wallet"],
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["pending", "delivered", "cancelled"],
      default: "pending",
    },
    returnReason: { type: "string" },
    orderReturnStatus: {
      type: String,
      enum: ["not requested", "requested", "approved", "rejected", "completed"],
      default: "not requested",
    },
    returnPickupStatus: {
      type: String,
      enum: ["pending", "picked", "not picked"],
      default: "pending",
    },
    paymentStatus: { type: Boolean, required: true },
  },

  {
    timestamps: true,
  }
);

const Orders = mongoose.model("Orders", ordersSchema);
export default Orders;
