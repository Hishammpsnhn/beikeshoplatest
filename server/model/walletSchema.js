import mongoose from "mongoose";
const transactionSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    transactionType: {
      type: String,
      required: true,
      enum: ["credit", "debit"],
    },
    date: { type: Date, default: Date.now },
    description: { type: String },
  },
  { _id: false }
);

const walletSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    amount: { type: Number, required: true, default: 0 },
    history: [transactionSchema],
  },
  { timestamps: true }
);

const Wallet = mongoose.model("Wallet", walletSchema);
export default Wallet;
