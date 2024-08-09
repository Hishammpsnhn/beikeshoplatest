import express from 'express';
import dotenv from 'dotenv';
import authRoute from './router/authRoute.js';
import bodyParser from 'body-parser';
import session from 'express-session';
import nocache from 'nocache';
import notFound from './middleware/notFound.js';
// import adminRoute from './router/adminRoute.js'
import productRoute from './router/productRoute.js'
import categoryRoute from './router/categoryRoute.js'
import connectDB from './utils/db.js';
import path from 'path'
import { fileURLToPath } from 'url';
import cors from 'cors';
import uploadRoute from './router/uploadRoute.js';
import userRoute from './router/userRoute.js';

const __filename = fileURLToPath(import.meta.url); 
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

// Session 
app.use(session({
    secret: 'your-secret-key',
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // Set to true if using HTTPS
      sameSite: 'None' // Set to 'None' to allow cross-origin cookies if needed
    }
  }));

// Apply CORS middleware
app.use(cors({
    origin: 'http://localhost:3000', // Replace with your React app's origin
    credentials: true // Allow cookies to be sent
  }));


// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// DB connection
connectDB();



// Static Files
 app.use(express.static(path.join(__dirname, 'public')));
 app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
 //app.use(express.static("public"));

// No-cache Middleware
app.use(nocache());

// Routes
app.use('/api/auth', authRoute);
app.use('/api/admin/product',productRoute)
app.use('/api/admin/category',categoryRoute)
app.use('/api/admin/user',userRoute)
app.use('/api/upload',uploadRoute);
// app.use('/admin',adminRoute)


//not found
app.use(notFound)

const port = process.env.PORT || 4000;

// listen Server
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});