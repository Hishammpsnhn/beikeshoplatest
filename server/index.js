import express from "express";
import dotenv from "dotenv";
import authRoute from "./router/authRoute.js";
import bodyParser from "body-parser";
import session from "express-session";
import nocache from "nocache";
import notFound from "./middleware/notFound.js";
// import adminRoute from './router/adminRoute.js'
import productRoute from "./router/productRoute.js";
import categoryRoute from "./router/categoryRoute.js";
import connectDB from "./utils/db.js";
import path from "path";
import { fileURLToPath } from "url";
import cors from "cors";
import uploadRoute from "./router/uploadRoute.js";
import userRoute from "./router/userRoute.js";
import cartRoute from "./router/cartRoute.js";
import orderRoute from "./router/orderRoute.js";
import cookieParser from "cookie-parser";
import wishlistRoute from "./router/wishlistRoute.js";
import couponCode from './router/couponCode.js';
import walletRoute from "./router/walletRoute.js";
import salesRoute from "./router/saleReportRoute.js";
import dashboardRoute from "./router/dashboardRoute.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();
app.use(cookieParser());

// Apply CORS middleware
const cors = require('cors');

const allowedOrigins = [
  "https://beikeshop.shop/",
  "https://beikeshop.netlify.app/",
];

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// DB connection
connectDB();

// Static Files
app.use(express.static(path.join(__dirname, "public")));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
//app.use(express.static("public"));

// No-cache Middleware
app.use(nocache());

// Routes
app.use("/api/auth", authRoute);
app.use("/api/admin/product", productRoute);
app.use("/api/admin/category", categoryRoute);
app.use("/api/admin/user", userRoute);
app.use('/api/admin/salesReport',salesRoute)
app.use("/api/cart", cartRoute);
app.use("/api/upload", uploadRoute);
app.use("/api/order", orderRoute);
app.use("/api/wishlist", wishlistRoute);
app.use("/api/coupon_code", couponCode);
app.use('/api/wallet',walletRoute)
app.use("/api/dashboard",dashboardRoute)

app.get('/',(req, res) => {
  res.send("welcome to the service v 1.4")
})
app.get("/api/check-server", (req, res) => {
  res.status(200).send({ message: "Server is running " });
});
// app.use('/admin',adminRoute)

//not found
app.use(notFound);

const port = process.env.PORT || 4000;

// listen Server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
