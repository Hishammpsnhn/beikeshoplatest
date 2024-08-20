import User from "../model/userSchema.js";
import sentOtpToMail from "../service/mailService.js";
import generateToken from "../utils/generateToken.js";
import nodemailer from "nodemailer";
import { generateOtp } from "../utils/otpGenerator.js";


// @desc    get all users
// @route   PUT /api/admin/user/
// @access  Private
export const getAllUsers = async (req, res) => {
  console.log("getAllUsers");
  try {
    const users = await User.find({ isAdmin: false });
    res.status(200).json({ msg: "sucessfully get all users", users });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    edit user status
// @route   get /api/admin/user/:id/status
// @access  Private
export const userStatusUpdate = async (req, res) => {
  const { id } = req.params;
  console.log(id);
  try {
    const user = await User.findById(id);
    console.log(user);
    if (!user) return res.status(404).json({ msg: "user not found" });
    user.block = !user.block;
    await user.save();
    res.status(200).json({ msg: "updated", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Edit user profile
// @route   PUT /api/admin/user/:id/profile
// @access  Public

export const profileUpdate = async (req, res) => {
  const { id } = req.params;
  const { userName, email, password, phoneNumber } = req.body.profile;
  console.log(userName, email, password, phoneNumber);

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (email) {
      const existingUser = await User.findOne({ email });
      if (existingUser)
        return res.status(400).json({ message: "Email already exists" });

      // const otp = generateOtp();
      // const sucess = sentOtpToMail(email, "Beikeshop", `your OTP : ${otp}`);
      // const expiresAt = new Date(Date.now() + 120 * 1000);
      // const otpEntry = Otp({
      //   email,
      //   otp,
      //   expiresAt,
      // });
      // await otpEntry.save();

      user.email = email;
    }
    if (password) user.password = password;
    if (userName) user.userName = userName;
    if (phoneNumber) user.phoneNumber = phoneNumber;

    await user.save();

    const token = generateToken(user);

    res
      .status(200)
      .json({ message: "Profile updated successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add address
// @route   POST /api/admin/user/:id/address
// @access  Public
export const addAddress = async (req, res) => {
  const { id } = req.params;
  const { fullName, city, state, landmark, pinCode, phoneNumber } = req.body;
  const user = await User.findById(id);
  if (!user) res.status(404).json({ message: "User not Found" });
  if (user.address.length > 2) {
    return res
      .status(400)
      .json({ message: "Cannot add more than 3 addresses" });
  }
  user.address.push({
    fullName,
    city,
    state,
    landmark,
    pinCode,
    phoneNumber,
  });
  await user.save();
  res.status(200).json({ message: "Address added successfully", user });
};

// @desc    delete address
// @route   DELETE /api/admin/user/:id/address/:addressId
// @access  Public
export const deleteAddress = async (req, res) => {
  const { id, addressId } = req.params;

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const addressIndex = user.address.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

    user.address.splice(addressIndex, 1);
    await user.save();

    res.status(200).json({ message: "Address deleted successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Edit address
// @route   PUT /api/admin/user/:id/address/:addressId
// @access  Public
export const EditAddress = async (req, res) => {
  const { id, addressId } = req.params;
  const { fullName, city, state, landmark, pinCode, phoneNumber } =
    req.body.formData;
  console.log(req.body);

  try {

    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const addressIndex = user.address.findIndex(
      (address) => address._id.toString() === addressId
    );

    if (addressIndex === -1) {
      return res.status(404).json({ message: "Address not found" });
    }

   
    if (fullName) user.address[addressIndex].fullName = fullName;
    if (city) user.address[addressIndex].city = city;
    if (state) user.address[addressIndex].state = state;
    if (landmark) user.address[addressIndex].landmark = landmark;
    if (pinCode) user.address[addressIndex].pinCode = pinCode;
    if (phoneNumber) user.address[addressIndex].phoneNumber = phoneNumber;

    await user.save();

    res.status(200).json({ message: "Address updated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
