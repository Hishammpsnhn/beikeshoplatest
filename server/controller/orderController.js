import Cart from "../model/cartSchema.js";
import Products from "../model/ProductSchema.js";
import User from "../model/userSchema.js";
import Orders from "../model/orderSchema.js";
import Razorpay from "razorpay";
import { createHmac } from "crypto";

// @desc    create a order
// @route   POST /api/order
// @access  Private
export const createOrder = async (req, res) => {
  const {
    userId,
    addressId,
    totalAmount,
    items,
    paymentMethod,
    discount = 0,
    CartId,
  } = req.body;

  if (!userId || !addressId || !items || !paymentMethod) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: "User not found" });

  if (!user.address || user.address.length === 0) {
    return res
      .status(404)
      .json({ message: "No addresses found for this user" });
  }

  const cart = await Cart.findById(CartId);
  if (!cart) return res.status(404).json({ message: "Cart not found" });

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

        product.sizes.forEach((size) => {
          if (size.size === item.productSizeDetails.size) {
            if (size.stock >= item.quantity) {
              size.stock -= item.quantity;
              product.save();
            } else {
              throw new Error(`Not enough stock for product`);
            }
          }
        });
        const paymentStatus = paymentMethod === "COD" ? false : true;
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
          paymentStatus,
        });

        console.log(newOrder);
        return newOrder.save();
      })
    );
    if (orders) {
      await Cart.findByIdAndDelete(CartId);
    }

    res.status(201).json({ message: "Orders created successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating orders", error: error.message });
  }
};

// @desc    get Ordes for Users
// @route   GET /api/order/:id
// @access  Private
export const getUserOrders = async (req, res) => {
  const { id } = req.params;
  console.log(req.params);
  try {
    const orders = await Orders.find({ userId: id }).populate({
      path: "product.product",
      model: Products,
      select: "name images ratings",
    });
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// @desc    get All orders
// @route   GET /api/order
// @access  Private
export const getOrdersList = async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.status(200).json({ message: "Orders fetched successfully", orders });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

// @desc    Update order status and payment status
// @route   PUT /api/order/:id
// @access  Private
export const updateOrder = async (req, res) => {
  const { id } = req.params;
  const { orderStatus, paymentStatus } = req.body.obj;
  console.log(id, req.body);

  if (orderStatus === undefined && paymentStatus === undefined) {
    return res.status(400).json({ message: "field is required" });
  }

  try {
    const order = await Orders.findById(id).populate({
      path: "product.product",
      model: Products,
      select: "name images",
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    if (orderStatus !== undefined) {
      order.orderStatus = orderStatus;
    }
    if (paymentStatus !== undefined) {
      order.paymentStatus = paymentStatus;
    }

    const updatedOrder = await order.save();

    res
      .status(200)
      .json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating order", error: error.message });
  }
};

// @desc    get Ordes for Users
// @route   GET /api/order/:id/order_details
// @access  Private
export const orderDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const order = await Orders.findById(id).populate({
      path: "product.product",
      model: Products,
      select: "name price images sizes ratings",
    });
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    }

    const user = await User.findById(order.userId);
    console.log(order.addressId);
    const address = user.address.find((address) => {
      return address._id.toString() === order.addressId.toString();
    });
    res
      .status(200)
      .json({ message: "Orders fetched successfully", order, address });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching orders", error: error.message });
  }
};

export const onlinePaymentOrder = async (req, res) => {
  try {
    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAPY_KEY_ID,
      key_secret: process.env.RAZORPAPY_KEY_SECRET,
    });
    const options = {
      amount: req.body.totalAmount,
      currency: "INR",
      receipt: "rqwol",
    };
    const order = await razorpay.orders.create(options);
    if (!order) {
      return res.status(500).json({ message: "Error creating order" });
    }
    res.json(order);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payment", error: error.message });
  }
};

export const onlinePaymentOrderVerify = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      req.body.body;

    const sha = createHmac("sha256", process.env.RAZORPAPY_KEY_SECRET);
    sha.update(`${razorpay_order_id}|${razorpay_payment_id}`);

    const digest = sha.digest("hex");

    if (digest !== razorpay_signature) {
      return res.status(400).json({ message: "Invalid signature" });
    }

    res.status(200).json({
      message: "Payment verification successful",
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error processing payment", error: error.message });
  }
};
