import Cart from "../model/cartSchema.js";
import Products from "../model/ProductSchema.js";
import User from "../model/userSchema.js";
import Orders from "../model/orderSchema.js";

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

    const orders = await Orders.find({ userId:id }).populate({
      path:'product.product',
      model: Products,
      select:"name images"
    })
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
  console.log(id,req.body)

  if (orderStatus === undefined && paymentStatus === undefined) {
    return res.status(400).json({ message: "field is required" });
  }

  try {
    const order = await Orders.findById(id).populate({
      path:'product.product',
      model: Products,
      select:"name images"
    })

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

    res.status(200).json({ message: "Order updated successfully", updatedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error updating order", error: error.message });
  }
};