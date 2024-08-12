import mongoose from "mongoose";
import bcrypt from "bcrypt";

const addressSchema = mongoose.Schema({
  fullName:{type:"string",required:"true",},
  landmark: {type:"string",required:"true",},
  city: {type:"string",required:"true",},
  state: {type:"string",required:"true",},
  pinCode: {type:"number",required:"true",},
  phoneNumber: {type:"number",required:"true",},
});

const userSchema = new mongoose.Schema(
  {
    userName: { type: String, required: true},
    email: { type: String, required: true,unique: true},
    password: { type: String, },
    dob: { type: Date,  },
    phoneNumber: { type: String,},
    profile: { type: String },
    address:[addressSchema],
    block: { type: Boolean, required: true,default: false },
    isAdmin: { type: Boolean, required: true, default: false },
  },
  {
    timestamps: true,
  }
);


userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (err) {
    next(err);
  }
});

const User = mongoose.model("User", userSchema);
export default User;
