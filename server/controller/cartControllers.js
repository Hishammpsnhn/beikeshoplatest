import Cart from "../model/cartSchema.js";
import Products from "../model/ProductSchema.js";
import User from "../model/userSchema.js";

export const createCart = async (req, res) => {
  const { userId, productId, size } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const productSize = product.sizes.find((item) => item._id == size._id);
    if (!productSize)
      return res.status(404).json({ message: "Size not found" });

    if (productSize.stock <= 0) {
      return res.status(400).json({ message: "Product out of stock" });
    }

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [{ productId, quantity: 1, price: productSize.price }],
        totalAmount: size.price,
      });
      productSize.stock--;
      await product.save();
      cart = await newCart.save();
    } else {
      const itemIndex = cart.items.findIndex(
        (item) => item.productId.toString() === productId
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
        cart.totalAmount += size.price;
      } else {
        cart.items.push({ productId, quantity: 1, price: productSize.price });
        cart.totalAmount += size.price;
      }

      productSize.stock--;
      await product.save();
      cart = await cart.save();
    }

    console.log(product);
    console.log(cart);
    return res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ userId: id }).populate({
      path: "items.productId",
      model: Products,
      select: "name images",
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {}
};
