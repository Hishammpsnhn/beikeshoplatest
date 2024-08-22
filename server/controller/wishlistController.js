import User from "../model/userSchema.js";
import Wishlist from "../model/whishlist.js";

// @desc    get wishlist
// @route   GET /api/wishlist
// @access  public
export const getWishlist = async (req, res) => {
  const id = req.user.id;
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const wishlist = await Wishlist.findOne({ userId: id }).populate({
      path: "items",
      model: "Products",
      select: "name images price",
    })
    if(!wishlist){
      return res.status(404).json({ message: "Wishlist not found" });
    }
    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    Add wishlist
// @route   POST /api/wishlist
// @access  Public
export const addWishlist = async (req, res) => {
  const id = req.user.id; 
  const { productId } = req.body;

  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let wishlist = await Wishlist.findOne({ userId: id });

    if (!wishlist) {
      wishlist = new Wishlist({
        userId: id,
        items: [productId],
      });
    } else {
      if (!wishlist.items.includes(productId)) {
        wishlist.items.push(productId);
      } else {
        return res.status(400).json({ message: "Product already in wishlist" });
      }
    }

    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

// @desc    remove item from wishlist
// @route   PUT /api/wishlist
// @access  public
export const removeItemWishlist = async (req, res) => {
  const id = req.user.id; 
  const { productId } = req.body;
  console.log(id, productId);
  try {
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    let wishlist = await Wishlist.findOne({ userId: id });
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }
    console.log(wishlist);

    const index = wishlist.items.indexOf(productId);
    if (index === -1) {
      return res.status(404).json({ message: "Product not found in wishlist" });
    }
    console.log(index);
    
    wishlist.items.splice(index, 1);
    await wishlist.save();

    res.status(200).json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
