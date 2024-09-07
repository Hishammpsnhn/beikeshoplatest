import jwt from "jsonwebtoken";
import User from "../model/userSchema.js";

function verifyToken(req, res, next) {
  const token = req.cookies.token;
  console.log(token,process.env.SECRET)
  if (token) {
    jwt.verify(token, process.env.SECRET, async (err, decoded) => {
      if (err) return res.status(401).send("Invalid Token");
      req.user = await User.findById(decoded.id).select("-password -address");
      if (req.user.block) {
        return res.status(403).json({ message: "User is blocked" });
      }
      next();
    });
  } else {
    return res.status(403).send("Token required");
  }
}

export default verifyToken;
