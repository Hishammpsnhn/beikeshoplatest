import jwt from 'jsonwebtoken';

const generateToken = (user) => {
  console.log(process.env.SECRET)
  return jwt.sign({ id: user._id, email: user.email }, process.env.SECRET, {
    expiresIn: "1h",
  });
};
export default generateToken;
