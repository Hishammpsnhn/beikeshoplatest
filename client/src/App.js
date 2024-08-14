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
  const [serverError, setServerError] = useState(false);

  const dispatch = useDispatch();
  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    const checkServer = async () => {
      try {
        await axios.get("/api/check-server");
      } catch (error) {
        setServerError(true);
      }
    };

    checkServer();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      {/* classname app for admin */}
      <div className={user?.isAdmin ? "app" : ""}>
        {user?.isAdmin && !serverError && <AdminSidebar />}
        <Routes>
          {serverError ? (
            <Route path="*" element={<Error500Page />} />
          ) : (
            <>
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

              {/* Catch-all route to handle undefined paths */}
              <Route path="*" element={<Home />} />
            </>
          )}
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
