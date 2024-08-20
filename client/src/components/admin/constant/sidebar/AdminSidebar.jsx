import { useTheme } from "@emotion/react";
import { tokens } from "../../../../theme";
import React, { useState } from "react";
import { Avatar, Box, Button, IconButton, Typography } from "@mui/material";
import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link, useNavigate } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/MoneyRounded";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import DiscountIcon from "@mui/icons-material/Discount";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../../../reducers/authReducers";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();
  return (
    <MenuItem
      active={selected === title}
      onClick={() => {
        navigate(to);
        setSelected(title);
      }}
      icon={icon}
      style={{
        backgroundColor: selected === title ? " #D4499F" : "transparent",
        color: selected === title ? "white" : colors.grey[100],
      }}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

function AdminSidebar() {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const navigate = useNavigate();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  return (
    <Box sx={{ backgroundColor: "#E4D5E4", height: "100vh" }}>
      <Sidebar collapsed={isCollapsed}>
        <Menu iconShape="square">
          {/* LOGO AND MENU ICON */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography
                  variant="h6"
                  textTransform="uppercase"
                  color={colors.grey[100]}
                >
                  Admin
                </Typography>
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            <Item
              title={"Dashboard"}
              to={"/dashboard"}
              icon={<HomeOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                SERVICE
              </Typography>
            )}

            <Item
              title="Products"
              to="/admin/productList"
              icon={<PeopleOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Management"
              to="/admin/product_management"
              icon={<ContactsOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Payments"
              to="/invoices"
              icon={<ReceiptOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Promo Code"
             to="/admin/promocode"
              icon={<DiscountIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                ORDERS
              </Typography>
            )}
            <Item
              title="Orders"
              to="/admin/orders_management"
              icon={<AddShoppingCartIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            {!isCollapsed && (
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                USER
              </Typography>
            )}

            <Item
              title="User Management"
              to="/admin/users_management"
              icon={<PersonOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />

            <Item
              title="Calendar"
              to="/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
          </Box>
          <Button
            variant="contained"
            sx={{ width: "100%", marginTop: "10px", paddingLeft: "10%" }}
            // color="#D4499F"
            onClick={handleLogout}
          >
            LOGOUT
          </Button>
        </Menu>
      </Sidebar>
    </Box>
  );
}

export default AdminSidebar;
