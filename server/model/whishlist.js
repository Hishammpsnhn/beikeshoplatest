import mongoose from "mongoose";

const { Schema } = mongoose;

const WishlistSchema = new Schema(
  {
    userId: { type: Schema.Types.ObjectId, required: true },
    items: [{ type: String}],
  },
  { timestamps: true }
);

const Wishlists = mongoose.model("wishlist", WishlistSchema);

export default Wishlists;
