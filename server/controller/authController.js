import User from "../model/userSchema.js";
import bcrypt from "bcrypt";
import generateToken from "../utils/generateToken.js";
import { generateOtp } from "../utils/otpGenerator.js";
import { sendOtpSms } from "../service/smsService.js";
import { Otp } from "../model/otpSchema.js";
import validator from "validator";
import sentOtpToMail from "../service/mailService.js";
import generateReferralCode from "../utils/referalCode.js";
import Wallet from "../model/walletSchema.js";

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
        const token = generateToken(existingUser);
        res.cookie("token", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Strict",
          maxAge: 86400000,
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
    const otpToMail = await sentOtpToMail(
      "hishammpsnhn@gmail.com",
      "",
      `Your OTP is ${otp}`
    );
    if (!otpToMail) {
      res.status(403).json({ message: "something went wrong!" });
    }
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
  console.log(formData);

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

    const referUser = await User.findOne({
      refferralCode: formData?.referralCode,
    });
    console.log("referUser", referUser);
    if (referUser) {
      const wallet = await Wallet.findOne({ userId: referUser._id });
      if (wallet) {
        wallet.amount += 200;
        wallet.history.push({
          amount: 200,
          transactionType: "credit",
          description: "refferal ",
          date:Date.now(),
        });
        await wallet.save();
      } else {
        const newWallet = await Wallet.create({
          userId: referUser._id,
          amount: 200,
          history: [
            {
              amount: 200,
              transactionType: "credit",
              description: "referal",
              date:Date.now(),
            },
          ],
        });
      }
    }

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
        refferralCode: generateReferralCode(),
        block: false,
        isAdmin: false,
      });

      if (newUser && referUser) {
        const newWallet = await Wallet.create({
          userId: newUser._id,
          amount: 150,
          history: [
            {
              amount: 150,
              transactionType: "credit",
              description: "referal",
              date:Date.now(),
            },
          ],
        });
      }

      const token = generateToken(newUser._id);
      res.cookie("token", token, {
        httpOnly: false,
        secure: false,
        sameSite: "Strict",
        maxAge: 86400000,
      });

      return res
        .status(201)
        .json({ message: "User created successfully", token, user: newUser });
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
        refferralCode: generateReferralCode(),
        isAdmin: false,
      });
    }

    const token = generateToken(user._id);
    res.cookie("token", token, {
      httpOnly: false,
      secure: false,
      sameSite: "Strict",
      maxAge: 86400000,
    });

    res.status(200).json({
      message: user
        ? "User logged in successfully"
        : "User created successfully",
      token,
      user,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

// @desc    Forgot Password
// @route   POST /api/auth/forgot_password
// @access  Public
export const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!validator.isEmail(email)) {
    res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(403).json({ message: "Email not exists" });
      return;
    }

    //Generate and send OTP
    const otp = generateOtp();
    const otpToMail = await sentOtpToMail(
      "hishammpsnhn@gmail.com",
      "",
      `Your OTP is ${otp}`
    );
    if (!otpToMail) {
      res.status(403).json({ message: "something went wrong!" });
    }

    const expiresAt = new Date(Date.now() + 120 * 1000);
    const otpEntry = Otp({
      email,
      otp,
      expiresAt,
    });
    await otpEntry.save();

    return res.status(200).json({ message: "OTP sent, please verify" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc    Forgot Password Verify OTP
// @route   POST /api/auth/forgot_password
// @access  Public
export const forgotPassword_verifyOTP = async (req, res) => {
  const { email } = req.body;
  const { otp } = req.body;

  if (!validator.isEmail(email)) {
    res.status(401).json({ message: "Invalid credentials" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(403).json({ message: "Email not exists" });
      return;
    }

    if (!otp) {
      return res.status(400).json({ message: "Please provide valid OTP" });
    }

    const otpEntry = await Otp.findOne({ email, otp });
    if (!otpEntry) {
      return res.status(401).json({ message: "Invalid OTP" });
    }

    if (otpEntry && otpEntry.expiresAt > Date.now()) {
      const otpEntry = await Otp.deleteOne({ email, otp });
    }

    return res
      .status(200)
      .json({ message: "OTP verify success", user: existingUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Server error" });
  }
};

// @desc    Password update
// @route   POST /api/auth/:id/change_password
// @access  Public
export const change_password = async (req, res) => {
  const { id } = req.params;
  const { password } = req.body;
  console.log(id, password, req.body);

  try {
    const user = await User.findById(id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (!password) return res.status(404).json({ message: "Invalid password" });

    user.password = password;

    await user.save();

    const token = generateToken(user);

    res
      .status(200)
      .json({ message: "Profile updated successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    logout
// @route   get /api/auth/logout
// @access  Public

export const logout = async (req, res) => {
  res.clearCookie("token");
  res.status(200).json({ message: "Logged out successfully" });
};
