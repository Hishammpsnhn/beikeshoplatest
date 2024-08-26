import jwt from 'jsonwebtoken';
import User from '../model/userSchema.js';

const checkUserStatus = async (req, res, next) => {
  try {
    
    const token = req.cookies.token;
    const decoded = jwt.verify(token, process.env.SECRET);

    
    const user = await User.findById(decoded.id);
    if (user.block ) {
      return res.status(403).json({ message: "User is blocked" });
    }
    req.user = decoded.id;
    next();
  } catch (error) {
    res.status(500).json({ message: "Authentication failed." });
  }
};

export {checkUserStatus} ;
