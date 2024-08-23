import mongoose from "mongoose";

const { Schema } = mongoose;

const ProductsSchema = new Schema(
  {
    name: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category", required: true }, // Reference to Category
    ratings: [
      {
        commands: { type: String },
        rating: { type: Number, required: true, min: 0, max: 5 },
        userId: { type: Schema.Types.ObjectId },
      },
    ],
    images: [{ type: String, required: true }],
    fabric: { type: String, required: true },
    discount: { type: Number },
    sizes: [
      {
        price: { type: Number },
        size: { type: String },
        stock: { type: Number },
      },
    ],
    isDeleted: { type: Boolean, default: false },
    averageRating: { type: Number, default: 0 },
    ratingsCount: { type: Number, default: 0 },
    offer:{type:Number,required: true,default:0},
  },
  {
    timestamps: true,
  }
);

const Products = mongoose.model("Products", ProductsSchema);

export default Products;
