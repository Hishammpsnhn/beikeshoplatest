import User from "../model/userSchema.js";

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
