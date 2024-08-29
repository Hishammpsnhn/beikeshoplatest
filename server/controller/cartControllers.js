import Cart from "../model/cartSchema.js";
import Products from "../model/ProductSchema.js";
import User from "../model/userSchema.js";

// @desc    Create Cart
// @route   POST /api/cart/create
// @access  Public
export const createCart = async (req, res) => {
  const { userId, productId, size } = req.body;

  try {
    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const productSize = product.sizes.find(
      (item) => item._id.toString() === size._id.toString()
    );
    if (!productSize)
      return res.status(404).json({ message: "Size not found" });

    if (productSize.stock <= 0) {
      return res.status(400).json({ message: "Product out of stock" });
    }
    const discountedPrice = Math.floor(
      productSize.price * (1 - (product.offer || 0) / 100)
    );
    console.log("discountedPrice: " + discountedPrice);

    let cart = await Cart.findOne({ userId });

    if (!cart) {
      const newCart = new Cart({
        userId,
        items: [
          {
            productId,
            quantity: 1,
            productSizeDetails: productSize,
            availability: true,
            price: discountedPrice,
            offer: product.offer,
          },
        ],
        totalAmount: discountedPrice,
      });
      //productSize.stock--;

      await product.save();
      cart = await newCart.save();
    } else {
      await cart.populate({
        path: "items.productId",
        model: Products,
        select: "name images sizes offer",
      });

      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId._id.toString() === productId &&
          item.productSizeDetails._id.toString() === productSize._id.toString()
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += 1;
        cart.totalAmount += Math.floor(discountedPrice);
      } else {
        cart.items.push({
          productId,
          quantity: 1,
          productSizeDetails: productSize,
          availability: true,
          price: discountedPrice,
          offer: product.offer,
        });
        cart.totalAmount += Math.floor(discountedPrice);
      }

      // productSize.stock--;
      await product.save();
      cart = await cart.save();
    }

    await cart.populate({
      path: "items.productId",
      model: Products,
      select: "name images offer",
    });
    return res.status(201).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    Get Cart
// @route   GET /api/cart/:id
// @access  Public
export const getCart = async (req, res) => {
  const { id } = req.params;
  try {
    const cart = await Cart.findOne({ userId: id }).populate({
      path: "items.productId",
      model: Products,
      select: "name images sizes offer",
    });

    if (!cart) return res.status(404).json({ message: "Cart not found" });
    let totalAmount = 0;
    cart.items.forEach((item) => {
      const product = item.productId;

      const size = product.sizes.find(
        (s) => s.size === item.productSizeDetails.size
      );
      item.productSizeDetails = size;

      if (size && size.stock < item.quantity) {
        item.availability = false;
      } else {
        item.availability = true;
      }
      console.log(item.productId?.offer, size.price);
      const disPrice =
        item.productId?.offer === 0
          ? 0
          : size.price * (item.productId?.offer / 100);
      console.log("disprice",Math.round(disPrice));
      item.offer = item.productId?.offer;
      item.price = size.price - Math.round(disPrice);
      console.log("item.price",item.price)
      totalAmount += item.price * item.quantity;
    });
    cart.totalAmount = totalAmount;
    await cart.save();
    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).send("Server Error");
  }
};

// @desc    Update Cart
// @route   PUT /api/cart/:id
// @access  Public
export const updateCart = async (req, res) => {
  const { id } = req.params;
  const { productId, action, size, qty } = req.body;

  try {
    const cart = await Cart.findOne({ userId: id });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const itemIndex = cart.items.findIndex(
      (item) =>
        item.productId.toString() === productId &&
        item.productSizeDetails._id.toString() === size._id.toString()
    );

    if (itemIndex === -1)
      return res.status(404).json({ message: "Item not found in cart" });

    const product = await Products.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const productSizeIndex = product.sizes.findIndex(
      (sizee) => sizee._id.toString() === size._id.toString()
    );

    if (productSizeIndex === -1)
      return res.status(404).json({ message: "Size not found" });

    const productSize = product.sizes[productSizeIndex];

    // Calculate the price after applying the offer
    const discountedPrice = Math.floor(
      productSize.price * (1 - (product.offer || 0) / 100)
    );

    switch (action) {
      case "inc":
        if (productSize.stock <= qty) {
          return res.status(400).json({ message: "Product out of stock" });
        }
        cart.items[itemIndex].quantity += 1;
        cart.totalAmount += discountedPrice;
        break;

      case "dec":
        if (cart.items[itemIndex].quantity <= 0) {
          return res
            .status(400)
            .json({ message: "Quantity cannot be less than 0" });
        }

        cart.items[itemIndex].quantity -= 1;
        cart.totalAmount -= discountedPrice;
        if (cart.items[itemIndex].quantity <= 0) {
          cart.items.splice(itemIndex, 1);
        }
        if (cart.items[itemIndex].quantity <= productSize.stock) {
          cart.items[itemIndex].availability = true;
        }
        break;

      case "remove":
        cart.totalAmount -= discountedPrice * cart.items[itemIndex].quantity;
        console.log(discountedPrice, cart.totalAmount);
        cart.items.splice(itemIndex, 1);
        break;

      default:
        return res.status(400).json({ message: "Invalid action" });
    }

    await product.save();
    await cart.save();

    await cart.populate({
      path: "items.productId",
      model: Products,
      select: "name images offer",
    });

    return res.status(200).json(cart);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
