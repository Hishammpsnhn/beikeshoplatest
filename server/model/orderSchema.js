import mongoose from "mongoose";

const { Schema } = mongoose;

const OrdersSchema = new Schema({
  User_id: { type: Schema.Types.ObjectId, ref: "User", required: true },
  Products: [
    {
      Product_id: { type: Schema.Types.ObjectId, ref: "Product" },
      Quantity: { type: Number, required: true },
    },
  ],
  TotalAmount: { type: Number, required: true },
  Discount: { type: Number, default: 0 },
  FinalAmount: { type: Number, required: true },
  Coupon_id: { type: Schema.Types.ObjectId, ref: "Coupon" },
  Address_id: { type: Schema.Types.ObjectId, ref: "Address", required: true },
  PaymentMethod: {
    type: String,
    required: true,
    enum: ["online_payment", "cod"],
  },
  OrderStatus: {
    type: String,
    required: true,
    enum: ["pending", "delivered", "cancelled"],
    default: "pending",
  },
  PaymentStatus: { type: Boolean, required: true },
  CreatedAt: { type: Date, default: Date.now },
  UpdatedAt: { type: Date, default: Date.now },
});

OrdersSchema.pre("save", function (next) {
  this.UpdatedAt = Date.now();
  next();
});

const Orders = mongoose.model("Orders", OrdersSchema);
export default OrderSchema;
