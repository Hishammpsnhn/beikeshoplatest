import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';

const checkUserStatus = async (req, res, next) => {
  try {
    
    const token = req.cookies.token;
    console.log("--",token)
    const decoded = jwt.verify(token, process.env.SECRET);

    
    const user = await User.findById(decoded.id);
    console.log(user)
    if (user.block ) {
        console.log("blcokd")
      return res.status(403).json({ message: "User is blocked. Logging out..." });
    }

    // req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Authentication failed." });
  }
};

export default checkUserStatus;
