import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { generateOtp } from "../utils/otpGenerator.js";
import { sendOtpSms } from "../service/smsService.js";
import { Otp } from "../model/otpSchema.js";
import validator from "validator";

const options = {
  minLength: 6,
  minLowercase: 1,
  minUppercase: 1,
  minNumbers: 1,
  minSymbols: 1,
};

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (
      !validator.isEmail(email) ||
      !validator.isStrongPassword(password, options)
    ) {
      res.status(401).json({ message: "Invalid credentials" });
    }

    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(401).json({ message: "Invalid credentials" });
      return;
    }

    if (existingUser.block) {
      res.status(401).json({ message: "Blocked" });
      return;
    }

    bcrypt.compare(password, existingUser.password, function (err, result) {
      if (err) res.status(500).json({ message: "invalid crediantial!" });
      if (result) {
        const token = generateToken(result);
        res.cookie("token", token, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: 3600000, // 1 hor
        });

        res.status(200).json({
          message: "User Login successfully",
          token,
          user: existingUser,
        });
      } else {
        res.status(400).json({ message: "0invalid  credentials" });
      }
    });
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
};

// @desc    register user
// @route   POST /api/auth/signup
// @access  Public
export const signUp = async (req, res) => {
  const { userName, email, password, dob, phoneNumber, confirmPassword } =
    req.body;

  if (
    !validator.isEmail(email) ||
    !validator.isStrongPassword(password, options)
  ) {
    res.status(401).json({ message: "Invalid credentials" });
  }
  if (
    !email ||
    !password ||
    !userName ||
    !confirmPassword ||
    !dob ||
    !phoneNumber
  ) {
    return res.status(403).json({ message: "Fill all credentials" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(403).json({ message: "Email already exists" });
      return;
    }

    //Generate and send OTP
    const otp = generateOtp();
    await sendOtpSms("+91 " + phoneNumber, otp);
    // const otp = 1234;
    const expiresAt = new Date(Date.now() + 120 * 1000);
    const otpEntry = Otp({
      email,
      otp,
      expiresAt,
    });
    await otpEntry.save();

    return res
      .status(200)
      .json({ message: "OTP sent, please verify", session: req.session });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc    verify otp and generate token
// @route   POST /api/auth/verify-otp
// @access  Public
export const verifyOtp = async (req, res) => {
  const { otp } = req.body;
  const { formData } = req.body;

  if (!otp) {
    return res.status(400).json({ message: "Please provide valid OTP" });
  }

  const otpEntry = await Otp.findOne({ email: formData.email, otp });
  if (!otpEntry) {
    return res.status(401).json({ message: "Invalid OTP" });
  }
  if (otpEntry && otpEntry.expiresAt > Date.now()) {
    // OTP is valid
    const otpEntry = await Otp.deleteOne({ email: formData.email, otp });

    try {
      // const { userName, email, password, dob, phoneNumber } =
      //   req.session.userDetails;
      if (
        !validator.isEmail(formData.email) ||
        !validator.isStrongPassword(formData.password, options)
      ) {
        res.status(401).json({ message: "Invalid credentials" });
      }

      const newUser = await User.create({
        userName: formData.userName,
        email: formData.email,
        password: formData.password,
        dob: formData.dob,
        phoneNumber: formData.phoneNumber,
        block: false,
        isAdmin: false,
      });

      const token = generateToken(newUser._id);
      res.cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "Strict",
        maxAge: 3600000, // 1 hour
      });

      return res
        .status(201)
        .json({ message: "User created successfully", token });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Server error" });
    }
  } else {
    // OTP is invalid or expired
    return res.status(401).json({ message: "Invalid Expired" });
  }
};

// @desc    Google login
// @route   POST /api/auth/google_verify
// @access  Public

export const googleLogin = async (req, res) => {
  console.log(req.body);
  const { email, name } = req.body;

  try {
    let user = await User.findOne({ email });
    
    if (!user) {
      user = await User.create({
        userName: name,
        email,
        block: false,
        isAdmin: false,
      });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 3600000, // 1 hour
    });

    res.status(200).json({
      message: user ? "User logged in successfully" : "User created successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};
