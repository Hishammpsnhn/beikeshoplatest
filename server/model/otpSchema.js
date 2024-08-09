import mongoose from "mongoose";

const otpSchema = new mongoose.Schema({
  email: { type: String, required: true },
  otp: { type: String, required: true },
  expiresAt: { type: Date, required: true }
});

// Create TTL index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 120 });

export const Otp = mongoose.model('Otp', otpSchema);