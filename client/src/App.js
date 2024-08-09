import react, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import Home from "./pages/user/Home";
import SignupPage from "./pages/auth/SignupPage";
import Login from "./pages/auth/LoginPage";
import OtpPage from "./pages/auth/OtpPage";
import ChangePassword from "./pages/auth/ChangePassword";
import Products from "./pages/user/Products";
import { useDispatch, useSelector } from "react-redux";
import PrivateRoute from "./pages/PrivateRoute";
import ProductDetails from "./pages/user/ProductDetails";
import { createMuiTheme, ThemeProvider } from "@mui/material";
import Dashboard from "./pages/admin/Dashbord";
import AdminSidebar from "./components/admin/constant/sidebar/AdminSidebar";
import "./index.css";
import ProductList from "./pages/admin/ProductList";
import ProductManagement from "./pages/admin/ProductManagement";
import { getCategories } from "./actions/categoryActions";
import UsersManagement from "./pages/admin/UsersManagement";
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
  const dispatch = useDispatch()

  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  return (
    <ThemeProvider theme={theme}>
      {/* classname app for admin */}
      <div className={user?.isAdmin ? "app" : ""}>
        {user?.isAdmin && <AdminSidebar />}
        <Routes>
          {/* Authenication */}
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

          {/* user */}
       
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/productDetails/:id" element={<ProductDetails />} />

          {/* admin */}
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin/productlist" element={<ProductList />} />
          <Route path="/admin/users_management" element={<UsersManagement />} />
          <Route
            path="/admin/product_management"
            element={<ProductManagement />}
          />
        </Routes>
      </div>
    </ThemeProvider>
  );
}

export default App;
