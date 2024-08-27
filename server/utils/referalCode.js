import crypto from "crypto";

function generateReferralCode() {
  const randomString = crypto.randomBytes(4).toString("hex");
  return randomString;
}
export default generateReferralCode