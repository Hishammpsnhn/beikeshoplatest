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
      },
    ],
    totalAmount: { type: Number, required: true },
    discount: { type: Number, default: 0 },
    finalAmount: { type: Number, required: true },
    couponId: { type: Schema.Types.ObjectId, ref: "Coupon" },
    addressId: { type: Schema.Types.ObjectId, ref: "Address", required: true },
    paymentMethod: {
      type: String,
      required: true,
      enum: ["online payment", "cod"],
    },
    orderStatus: {
      type: String,
      required: true,
      enum: ["pending", "delivered", "cancelled"],
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

