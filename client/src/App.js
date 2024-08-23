import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import Home from "./pages/user/Home";
import SignupPage from "./pages/auth/SignupPage";
import Login from "./pages/auth/LoginPage";
import OtpPage from "./pages/auth/OtpPage";
import ChangePassword from "./pages/auth/ChangePassword";
import Products from "./pages/user/Products";
import ProductDetails from "./pages/user/ProductDetails";
import Dashboard from "./pages/admin/Dashbord";
import AdminSidebar from "./components/admin/constant/sidebar/AdminSidebar";
import ProductList from "./pages/admin/ProductList";
import ProductManagement from "./pages/admin/ProductManagement";
import UsersManagement from "./pages/admin/UsersManagement";
import Error500Page from "./pages/Error500"; 
import { useDispatch, useSelector } from "react-redux";
import { createMuiTheme, ThemeProvider } from "@mui/material";
import PlaceOrder from "./pages/user/PlaceOrder";
import Cart from "./pages/user/Cart";
import Profile from "./pages/user/Profile";
import ShippingAddress from "./pages/user/ShippingAddress";
import OrdersManagement from "./pages/admin/OrdersManagement";
import Success from "./pages/user/Success";
import { ToastContainer } from "react-toastify";
import PlaceOrderDetails from "./pages/user/PlaceOrderDetails.jsx";
import Wishlist from "./pages/user/Wishlist.jsx";
import PromoCode from "./pages/admin/PromoCode.jsx";
import Wallet from "./pages/user/Wallet.jsx";
import Offer from "./pages/admin/Offer.jsx";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#461246",
    },
    secondary: {
      main: "#D4499F",
    },
    third: {
      main: "#FDF2FC",
    },
  },
});

function App() {
  const [ForgotPassword, setForgotPassword] = useState(false);
  

  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );



  return (
    <ThemeProvider theme={theme}>
      {/* classname app for admin */}
      <div className={user?.isAdmin ? "app" : ""}>
        {user?.isAdmin && <AdminSidebar />}
        <Routes>
          
        
              {/* Authentication Routes */}
              <Route path="/signup" element={<SignupPage />} />
              <Route
                path="/login"
                element={
                  <Login
                    forgotPassword={ForgotPassword}
                    setForgotPassword={setForgotPassword}
                  />
                }
              />
              <Route path="/otp" element={<OtpPage />} />
              <Route path="/changePassword" element={<ChangePassword />} />

              {/* User Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/productDetails/:id" element={<ProductDetails />} />
              <Route path="/place_order" element={<PlaceOrder />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/shipping_address" element={<ShippingAddress />} />
              <Route path="/success" element={<Success />} />
              <Route path="/orderDetails/:id" element={<PlaceOrderDetails />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/wallet" element={<Wallet />} />

              {/* Admin Routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/admin/productlist" element={<ProductList />} />
              <Route
                path="/admin/users_management"
                element={<UsersManagement />}
              />
              <Route
                path="/admin/product_management"
                element={<ProductManagement />}
              />
              <Route
                path="/admin/orders_management"
                element={<OrdersManagement />}
              />
              <Route
                path="/admin/promocode"
                element={<PromoCode />}
              />
              <Route
                path="/admin/offer_management"
                element={<Offer />}
              />

              {/* Catch-all route to handle undefined paths */}
              <Route path="*" element={<Home />} />
          
      
        </Routes>
        <ToastContainer/>
      </div>
    </ThemeProvider>
  );
}

export default App;
