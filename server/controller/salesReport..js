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
    console.log(orders);

    const overallAmount = orders.reduce(
      (acc, order) => acc + order.totalAmount,
      0
    );
    const overallDisAmount = orders.reduce(
      (acc, order) => acc + order.finalAmount,
      0
    );

    const numberOfOrders = orders.length;

    const report = {
      overallAmount,
      overallDiscount: overallAmount - overallDisAmount,
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
