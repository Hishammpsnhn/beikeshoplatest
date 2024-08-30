import Category from "../model/categorySchema.js";
import Orders from "../model/orderSchema.js";
import Products from "../model/ProductSchema.js";
import { getStartAndEndOfWeek } from "../utils/weekDataCalc.js";

// @desc    get this week order report
// @route   GET /api/dashboard/week
// @access  Private
export const getWeeklyOrdersData = async (req, res) => {
  try {
    const { startOfWeek, endOfWeek } = getStartAndEndOfWeek();
    console.log(startOfWeek, endOfWeek);
    const orders = await Orders.aggregate([
      {
        $match: {
          orderStatus: "delivered",
          createdAt: {
            $gte: startOfWeek,
            $lte: endOfWeek,
          },
        },
      },
      {
        $group: {
          _id: { dayOfWeek: { $dayOfWeek: "$createdAt" } },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.dayOfWeek": 1 },
      },
      {
        $addFields: {
          dayName: {
            $arrayElemAt: [
              [
                "Sunday",
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              { $subtract: ["$_id.dayOfWeek", 1] },
            ],
          },
        },
      },
    ]);
    console.log(orders);
    const weeklyOrdersData = [
      {
        id: "Orders",
        data: orders.map((order) => ({
          x: order.dayName,
          y: order.totalOrders,
        })),
      },
    ];

    res.status(200).json({
      success: true,
      data: weeklyOrdersData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    get this month order report
// @route   GET /api/dashboard/month
// @access  Private
export const getMonthOrdersData = async (req, res) => {
  try {
    const year = new Date().getFullYear();

    const orders = await Orders.aggregate([
      {
        $match: {
          orderStatus: "delivered",
          createdAt: {
            $gte: new Date(`${year}-01-01`),
            $lte: new Date(`${year}-12-31`),
          },
        },
      },
      {
        $group: {
          _id: { month: { $month: "$createdAt" } },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.month": 1 },
      },
      {
        $addFields: {
          monthName: {
            $arrayElemAt: [
              [
                "January",
                "February",
                "March",
                "April",
                "May",
                "June",
                "July",
                "August",
                "September",
                "October",
                "November",
                "December",
              ],
              { $subtract: ["$_id.month", 1] },
            ],
          },
        },
      },
    ]);
    console.log(orders);
    const monthlyOrdersData = [
      {
        id: "Orders",
        data: orders.map((order) => ({
          x: order.monthName,
          y: order.totalOrders,
        })),
      },
    ];

    res.status(200).json({
      success: true,
      data: monthlyOrdersData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    get this year order report
// @route   GET /api/dashboard/year
// @access  Private
export const getYearOrdersData = async (req, res) => {
  try {
    const orders = await Orders.aggregate([
      {
        $match: {
          orderStatus: "delivered",
        },
      },
      {
        $group: {
          _id: { year: { $year: "$createdAt" } },
          totalOrders: { $sum: 1 },
        },
      },
      {
        $sort: { "_id.year": 1 },
      },
    ]);
    console.log(orders);
    const yearlyOrdersData = [
      {
        id: "Orders",
        data: orders.map((order) => ({
          x: order._id.year.toString(),
          y: order.totalOrders,
        })),
      },
    ];

    res.status(200).json({
      success: true,
      data: yearlyOrdersData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

// @desc    Get Top 10 products
// @route   GET /api/dashboard/getTopProducts
// @access  Private
export const getTop10Product = async (req, res) => {
  try {
    // Get top products with their counts
    const topproducts = await Orders.aggregate([
      {
        $match: {
          orderStatus: "delivered",
        },
      },
      {
        $unwind: "$product",
      },
      {
        $group: {
          _id: "$product.product", 
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);

    const productIds = topproducts.map((item) => item._id);
    const counts = topproducts.reduce((acc, item) => {
      acc[item._id] = item.count;
      return acc;
    }, {});


    const products = await Products.find(
      { _id: { $in: productIds } },
      { name: 1, price: 1, averageRating: 1 }
    );

    // Merge product details with counts
    const productsWithCount = products.map((product) => ({
      ...product.toObject(),
      count: counts[product._id] || 0,
    }));

    res.status(200).json({
      data: productsWithCount,
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

// @desc    get Top 10 Categories
// @route   GET /api/dashboard/getTopCategory
// @access  Private
export const getTop10Category = async (req, res) => {
  try {
    const topproducts = await Orders.aggregate([
      {
        $match: {
          orderStatus: "delivered",
        },
      },
      
      {
        $group: {
          _id: "$product.product",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 10,
      },
    ]);
    const populatedProducts = await Products.populate(topproducts, {
      path: "_id",
      select: "category",
    });
    console.log("pop",populatedProducts);
    // Extract categories from the populated products
    const categories = populatedProducts.map((item) => item._id.category);
    const uniqueCategoryIds = [...new Set(categories)];
    console.log(uniqueCategoryIds);
    const category = await Category.find(
      { _id: { $in: uniqueCategoryIds } },
      { category: 1 }
    );


    return res.json(category);
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};
