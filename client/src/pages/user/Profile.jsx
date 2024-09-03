import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Container,
  TextField,
  Grid,
  Button,
  IconButton,
  Typography,
  Card,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddressDetails from "../../components/address/AddressDetails";
import AddIcon from "@mui/icons-material/Add";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import Nav from "../../components/header/Nav";
import Header1 from "../../components/header/Header1";
import validator from "validator";
import { toast, ToastContainer } from "react-toastify";
import { useSelector } from "react-redux";
import { profileUpdate } from "../../actions/userAction";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrders, updateOrders } from "../../actions/orderActions";
import { googleLogout } from "@react-oauth/google";
import { logout } from "../../reducers/authReducers";
import { logoutCookie } from "../../actions/authActions";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ListAltIcon from "@mui/icons-material/ListAlt";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import profileIcon from "../../public/profile.svg";
function Profile() {
  const { user, error } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  console.log(orders);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    userName: user?.userName,
    email: user?.email,
    phoneNumber: user?.phoneNumber,
    referCode: user?.refferralCode,
  });
  console.log(user);
  // const [alertOpen, setAlertOpen] = useState(false);
  const [isEditing, setIsEditing] = useState({
    userName: false,
    phoneNumber: false,
    email: false,
  });
  // const handleCancelOrderClick = () => {
  //   setAlertOpen(true);
  // };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEdit = (field) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: true,
    }));
  };

  const handleSave = async (field) => {
    console.log(field);
    if (field === "email") {
      if (!validator.isEmail(profile.email.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }
    } else if (field === "phoneNumber") {
      if (
        !validator.isNumeric(profile.phoneNumber) ||
        profile.phoneNumber.length != 10
      ) {
        toast.error("Please enter a valid phone number");
        return;
      }
    }

    if (isEditing[field]) {
      console.log({ [field]: profile[field] });
      const data = await dispatch(
        profileUpdate(user._id, { [field]: profile[field] })
      );
      console.log(data);
      if (!data) {
        toast.error(`Failed  To Update`);
      } else {
        setIsEditing((prevEditing) => ({
          ...prevEditing,
          [field]: false,
        }));
      }
    }
  };

  const handleChangePassword = () => {
    console.log("change password");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
    googleLogout();
    dispatch(logout());
    logoutCookie();
    localStorage.removeItem("userInfo");
    navigate("/login");
  };

  // const handleCancelOrder = async (orderId, name, paymentStatus, amount) => {
  //   if (
  //     window.confirm(
  //       "Are you sure you want to cancel " + name + "?" + paymentStatus + amount
  //     )
  //   ) {
  //     try {
  //       const data = await updateOrders(orderId, {
  //         orderStatus: "cancelled",
  //         paymentStatus,
  //         amount,
  //       });
  //       if (data.updatedOrder) {
  //         toast.success("Order cancelled successfully");

  //         // Update the orders state
  //         setOrders(
  //           orders?.map((order) =>
  //             order._id === orderId ? data.updatedOrder : order
  //           )
  //         );
  //       }
  //     } catch (error) {
  //       toast.error("Failed to cancel the order");
  //       console.error("Error cancelling order:", error);
  //     }
  //   }
  // };

  useEffect(() => {
    async function getUserOrder() {
      const data = await getOrders(user?._id);
      setOrders(data?.orders);
    }
    getUserOrder();
  }, []);

  return (
    <>
      <Header1 />
      <Nav />
      <Container sx={{ display: "flex", justifyContent: "space-between" }}>
        <Box
          sx={{
            width: "25%",
            marginTop: "20px",
          }}
        >
          <Card
            sx={{
              paddingY: "20px",
              paddingX: "20px",
              boxShadow: 6,
              borderRadius: 4,
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Avatar
                sx={{ margin: "10px" }}
                alt="Remy Sharp"
                src={profileIcon}
              />
              <Box sx={{ textAlign: "start" }}>
                <Typography variant="body2">Hello</Typography>
                <Typography variant="body1" sx={{ fontWeight: "bold" }}>
                  {user?.userName}
                </Typography>
              </Box>
            </Box>
          </Card>
          <Card
            sx={{
              marginTop: "20px",
              paddingY: "30px",
              paddingX: "30px",
              boxShadow: 6,
              borderRadius: 4,
              backgroundColor: "#f9f9f9",
              textAlign: "center",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              height: "50vh",
            }}
          >
            {[
              {
                icon: <AccountCircleIcon />,
                label: "Profile",
                link: "/profile",
              },
              { icon: <ListAltIcon />, label: "My Orders", link: "/my_orders" },
              { icon: <ShoppingCartIcon />, label: "Cart", link: "/cart" },
              { icon: <FavoriteIcon />, label: "Wishlist", link: "/wishlist" },
              {
                icon: <AccountBalanceWalletIcon />,
                label: "Wallet",
                link: "/wallet",
              },
            ].map((item, index) => (
              <Box
                key={index}
                sx={{
                  marginBottom: "20px",
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  "&:hover": {
                    color: "#1976d2",
                  },
                }}
                onClick={() => {
                  navigate(item.link);
                }}
              >
                {React.cloneElement(item.icon, {
                  sx: {
                    fontSize: 20,
                    color: "#461246",
                    transition: "color 0.3s ease",
                  },
                })}
                <Typography
                  variant="body1"
                  sx={{
                    marginLeft: "10px",
                    transition: "color 0.3s ease",
                  }}
                >
                  {item.label}
                </Typography>
              </Box>
            ))}
          </Card>
        </Box>

        <Box width="70%">
          <Typography
            variant="h4"
            sx={{ fontWeight: "medium", marginTop: "30px" }}
          >
            Personal Info
          </Typography>
          <Card
            sx={{
              marginTop: "20px",
              padding: "20px",
              boxShadow: 5,
              borderRadius: 3,
            }}
          >
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Box sx={{ width: "100%" }}>
                <Grid container spacing={2}>
                  {["email", "userName", "phoneNumber", "referCode"].map(
                    (field) => (
                      <Grid
                        item
                        xs={
                          field === "firstName" || field === "lastName" ? 6 : 12
                        }
                        key={field}
                      >
                        <TextField
                          fullWidth
                          variant="outlined"
                          label={
                            field.charAt(0).toUpperCase() +
                            field.slice(1).replace(/([A-Z])/g, " $1")
                          }
                          name={field}
                          value={profile[field]}
                          onChange={handleInputChange}
                          disabled={!isEditing[field]}
                          sx={{ marginBottom: "15px" }}
                          InputProps={{
                            endAdornment: (field === "userName" ||
                              field === "phoneNumber") && (
                              <IconButton
                                onClick={() =>
                                  isEditing[field]
                                    ? handleSave(field)
                                    : handleEdit(field)
                                }
                                edge="end"
                              >
                                {isEditing[field] ? <SaveIcon /> : <EditIcon />}
                              </IconButton>
                            ),
                          }}
                        />
                      </Grid>
                    )
                  )}

                  <Grid item xs={12}>
                    <Box display="flex" justifyContent="space-between" mt={2}>
                      <Button
                        variant="outlined"
                        color="secondary"
                        onClick={handleChangePassword}
                      >
                        Change Password
                      </Button>
                      <Button
                        variant="contained"
                        color="error"
                        onClick={handleLogout}
                      >
                        Logout
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Card>

          <Typography
            variant="h4"
            sx={{ fontWeight: "medium", marginTop: "30px" }}
          >
            Address
          </Typography>
          <Box marginY="10px">
            {user?.address.map((item) => (
              <AddressDetails cart={false} address={item} profile={true} />
            ))}
            <Button
              variant="outlined"
              sx={{ width: "100%", marginY: "10px" }}
              endIcon={<AddIcon />}
              onClick={() =>
                navigate("/shipping_address", { state: { action: "profile" } })
              }
            >
              Add Address
            </Button>
          </Box>
        </Box>
        {/* <ToastContainer /> */}
      </Container>
    </>
  );
}

export default Profile;
