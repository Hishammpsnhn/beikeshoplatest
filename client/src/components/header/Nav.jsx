import React, { useEffect } from "react";
import {
  AppBar,
  Avatar,
  Box,
  Button,
  Container,
  IconButton,
  ListItemIcon,
  Menu,
  MenuItem,
  Toolbar,
  Tooltip,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import LogoutIcon from "@mui/icons-material/Logout";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import {
  getCategories,
  getProductByCategory,
} from "../../actions/categoryActions";
import { googleLogout } from "@react-oauth/google";
import { setSelectedCategory } from "../../reducers/productReducers";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { logoutCookie } from "../../actions/authActions";
import { logout } from "../../reducers/authReducers";
import WalletIcon from "@mui/icons-material/Wallet";
import { getProductsList } from "../../actions/productActions";

const pages = ["About Us", "Latest Product", "Contact Us"];
const settings = ["Profile", "Cart", "Wishlist", "Wallet", "Logout"];

function Nav() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorElProducts, setAnchorElProducts] = React.useState(null);
  const { user } = useSelector((state) => state.auth);

  const { categories } = useSelector((state) => state.category);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleOpenProductsMenu = (event) => {
    setAnchorElProducts(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (setting) => {
    setAnchorElUser(null);
    if (setting === "Logout") {
      googleLogout();
      dispatch(logout());
      logoutCookie();
      localStorage.removeItem("userInfo");
      navigate("/login");
    } else if (setting === "Profile") {
      navigate("/profile");
    } else if (setting === "Cart") {
      navigate("/cart");
    } else if (setting === "Wishlist") {
      navigate("/wishlist");
    } else if (setting === "Wallet") {
      navigate("/wallet");
    }
  };

  const handleCloseProductsMenu = (id) => {
    setAnchorElProducts(null);
    dispatch(setSelectedCategory(id));
    dispatch(getProductByCategory(id));
    navigate("/products");
  };
  useEffect(() => {
    // Ensure categories are fetched only once when the component mounts
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories.length]);

  return (
    <AppBar position="static" sx={{ background: "#E4D5E4", color: "black" }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "#4A1837",
              textDecoration: "none",
            }}
          >
            BEIKESHOP
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {pages.map((page) => (
                <MenuItem key={page} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    {page}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "monospace",
              fontWeight: 700,
              letterSpacing: ".3rem",
              color: "inherit",
              textDecoration: "none",
            }}
          >
            BEIKESHOP
          </Typography>
          <Box
            sx={{
              flexGrow: 1,
              display: { xs: "none", md: "flex" },
              justifyContent: "center",
            }}
          >
            <Button
              onClick={() => {
                navigate("/products");
                dispatch(getProductsList());
              }}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Products
            </Button>
            <Button
              onClick={handleOpenProductsMenu}
              sx={{ my: 2, color: "black", display: "block" }}
            >
              Category
            </Button>
            <Menu
              id="menu-products"
              anchorEl={anchorElProducts}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "center",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={Boolean(anchorElProducts)}
              onClose={handleCloseProductsMenu}
            >
              {categories.map((category) => (
                <MenuItem
                  key={category._id}
                  onClick={() => handleCloseProductsMenu(category._id)}
                >
                  <Typography textAlign="center" sx={{ color: "black" }}>
                    {category.category}
                  </Typography>
                </MenuItem>
              ))}
            </Menu>
            {pages.map((page) => (
              <Button
                key={page}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: "black", display: "block" }}
              >
                {page}
              </Button>
            ))}
          </Box>
          {user ? (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {settings.map((setting, index) => (
                  <MenuItem
                    key={setting}
                    onClick={() => handleCloseUserMenu(setting)}
                  >
                    <ListItemIcon>
                      {index === 0 && <AccountCircleIcon />}{" "}
                      {index === 1 && <ShoppingCartIcon />}{" "}
                      {index === 2 && <FavoriteIcon />}{" "}
                      {index === 3 && <WalletIcon />}{" "}
                      {index === 4 && <LogoutIcon />}{" "}
                    </ListItemIcon>
                    <Typography textAlign="center" sx={{ color: "black" }}>
                      {setting}
                    </Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          ) : (
            <Button onClick={() => navigate("/login")}>LOGIN</Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Nav;
