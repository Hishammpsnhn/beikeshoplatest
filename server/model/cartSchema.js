import mongoose from "mongoose";


const { Schema } = mongoose;

const CartSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    items: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" }, 
        quantity: { type: Number, required: true },
        productSizeDetails:{type: Object, required: true},
        availability:{type:Boolean,required:true},
        price: { type: Number, required: true},
        offer:{type:Number}
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Cart = mongoose.model("Cart", CartSchema);

export default Cart;
