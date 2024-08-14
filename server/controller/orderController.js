import Cart from "../model/cartSchema.js";
import Products from "../model/ProductSchema.js";
import User from "../model/userSchema.js";
import Orders from "../model/orderSchema.js";

export const createOrder = async (req, res) => {
  const {
    userId,
    addressId,
    totalAmount,
    items,
    paymentMethod,
    discount = 0,
  } = req.body;

  // Check for required fields
  if (!userId || !addressId || !items || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  // Find the user by ID
  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  // Check if the user has addresses
  if (!user.address || user.address.length === 0) {
    return res
      .status(404)
      .json({ message: "No addresses found for this user" });
  }

  // Find the specific address by ID
  const address = user.address.id(addressId);
  if (!address) {
    return res.status(404).json({ message: "Address not found" });
  }

  try {
    const orders = await Promise.all(
      items.map(async (item) => {
        const product = await Products.findById(item.productId);
        if (!product) {
          throw new Error(`Product with ID ${item.productId} not found`);
        }

        const newOrder = new Orders({
          userId: userId,
          addressId: addressId,
          totalAmount: item.quantity * product.price,
          finalAmount: item.quantity * product.price - discount,
          product: [
            {
              product: item.productId._id,
              quantity: item.quantity,
              price: product.price,
              size: item.productSizeDetails.size,
            },
          ],
          paymentMethod: paymentMethod,
          orderStatus: "pending",
          paymentStatus: false,
        });

        console.log(newOrder);
        return newOrder.save();
      })
    );

    res.status(201).json({ message: "Orders created successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating orders", error: error.message });
  }
};
