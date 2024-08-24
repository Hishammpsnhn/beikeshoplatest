import Wallet from "../model/walletSchema.js";
import mongoose from "mongoose";

export const getWalletInfo = async (req, res) => {
  const userId = req.user;
  
  if (!userId) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  if (!mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID" });
  }

  try {
    const wallet = await Wallet.findOne({ userId: new mongoose.Types.ObjectId(userId) });
    wallet.history.sort((a, b) => b.date - a.date);
    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found" });
    }

    res.status(200).json(wallet);
  } catch (error) {
    console.error("Error fetching wallet info:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
