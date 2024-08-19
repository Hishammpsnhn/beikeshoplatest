import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET, {
    expiresIn: "1d",
  });
};
export default generateToken;
