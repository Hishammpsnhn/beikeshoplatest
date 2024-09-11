import Order from "../model/orderSchema.js";
import Products from "../model/ProductSchema.js";
import getDateRange from "../utils/dateCalc.js";

export const getSalesReport = async (req, res) => {
  const { startDate, endDate, sort } = req.query;

  try {
    const { start, end } = getDateRange(sort, startDate, endDate);

    const orders = await Order.find({
      createdAt: {
        $gte: start,
        $lt: end,
      },
      orderStatus: "delivered",
    }).populate({
      path: "product.product",
      model: Products,
      select: "name images ratings",
    });

    const totalPrice = orders.reduce((acc, order) => {
      return (
        acc +
        order.product.reduce((sum, item) => {
          return sum + item.price * item.quantity;
        }, 0)
      );
    }, 0);

    const overallAmount = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );

    const numberOfOrders = orders.length;

    const report = {
      overallAmount:totalPrice,
      overallDiscount: totalPrice - overallAmount,
      numberOfOrders,
      startDate: start.toISOString(),
      endDate: end.toISOString(),
      orders,
    };

    res.status(200).json(report);
  } catch (error) {
    console.error("Error generating sales report:", error.message);
    res.status(500).json({ message: "Something went wrong" });
  }
};
