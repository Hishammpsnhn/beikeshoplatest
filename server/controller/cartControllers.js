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
        items: [{ productId, quantity: 1, productSizeDetails: productSize }],
        totalAmount: size.price,
      });
      productSize.stock--;

      await product.save();
      cart = await newCart.save();
    } else {
      await cart.populate({
        path: "items.productId",
        model: Products,
        select: "name images sizes",
      });
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId._id == productId &&
          item.productSizeDetails.size == productSize.size
      );
      console.log(itemIndex);
      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
        cart.totalAmount += size.price;
      } else {
        cart.items.push({
          productId,
          quantity: 1,
          productSizeDetails: productSize,
        });
        cart.totalAmount += size.price;
      }

      productSize.stock--;
      await product.save();
      cart = await cart.save();
    }
    await cart.populate({
      path: "items.productId",
      model: Products,
      select: "name images",
    });
    // console.log(product);
    // console.log(cart);
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
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { productId, action, size } = req.body;
  console.log(action, productId, id);

  try {
    const cart = await Cart.findOne({ userId: id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) => item.productId.toString() === productId
    );
    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const productSizeIndex = product.sizes.findIndex(
      (sizee) => sizee._id.toString() == size._id.toString()
    );
    console.log(product.sizes[productSizeIndex].stock);

    if (productSizeIndex === -1)
      return res.status(404).json({ message: "Size not found" });
    switch (action) {
      case "inc":
        if (product.sizes[productSizeIndex].stock <= 0) {
          return res.status(400).json({ message: "Product out of stock" });
        }
        console.log(cart);
        cart.items[productSizeIndex].quantity += 1;
        console.log(cart);
        cart.totalAmount += product.sizes[productSizeIndex].price;
        product.sizes[productSizeIndex].stock--;
        break;

      case "dec":
        cart.items[productSizeIndex].quantity -= 1;
        cart.totalAmount -= product.sizes[productSizeIndex].price;
        product.sizes[productSizeIndex].stock++;
        if (cart.items[itemIndex].quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
        break;

      case "remove":
        cart.totalAmount -=
          product.sizes[productSizeIndex].price *
          cart.items[productSizeIndex].quantity;
        product.sizes[productSizeIndex].stock += cart.items[itemIndex].quantity;
        cart.items.splice(itemIndex, 1);
        break;

      default:
        return res.status(400).json({ message: "Invalid action" });
    }
    await cart.populate({
      path: "items.productId",
      model: Products,
      select: "name images ",
    });
    await product.save();
    await cart.save();

    res.json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
