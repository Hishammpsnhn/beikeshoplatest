import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import image from "../../../public/images/products/n0jzl_400.webp";
import HoverRating from "../rating/Rating";
import { updateCart } from "../../../actions/cartActions";
import { toast, ToastContainer } from "react-toastify";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { updateOrders } from "../../../actions/orderActions";
function ProdcutBref({
  cart,
  order,
  profile,
  name,
  image,
  price,
  qty,
  userId,
  productId,
  size,
  orderStatus,
  paymentStatus,
  orderId,
}) {
  const [quantity, setQuantity] = useState(qty);

  const dispatch = useDispatch();

  const handleIncrement = async () => {
    if (quantity < 4) {
      const data = await dispatch(
        updateCart(userId, productId._id, "inc", size)
      )
      if (data) {
        setQuantity((prevQuantity) => prevQuantity + 1);
        toast.success(`quantity updated!`);
      }else{
        toast.error(`out of Stock!`);
      }
    } else {
      toast.error("maximum quantity limit exceeded");
    }
  };

  const handleDecrement = async () => {
    if (quantity > 1) {
      const data = await dispatch(
        updateCart(userId, productId._id, "dec", size)
      );
      if (data) {
        setQuantity((prevQuantity) => prevQuantity - 1);
        console.log(data);
        toast.success(`quantity updated!`);
      }
    }
  };
  const handleRemove = () => {
    dispatch(updateCart(userId, productId._id, "remove", size));
    toast.success(`Removed from cart!`);
  };
  const handleCancelOrder = () => {
    if (window.confirm("Are you sure you want to cancel")) {
      updateOrders(orderId, { orderStatus: "cancelled" });
    }
  };

  return (
    <Box sx={{ marginY: "10px" }}>
      <Paper
        elevation={5}
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          minWidth: "100%",
          alignItems: "center",
        }}
      >
        <Box display="flex" width="50%" justifyContent="space-evenly">
          <Box sx={{ width: "80px", height: "80px" }}>
            <img
              src={image}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="body1"> {name}</Typography>
            {/* <Typography variant="body2">{name}</Typography> */}
            {profile ? (
              <Typography variant="body2">size:{size}</Typography>
            ) : (
              <Typography variant="body2">size:{size?.size}</Typography>
            )}
            <Typography variant="body2">{price}</Typography>
          </Box>
        </Box>
        {profile && orderStatus === "delivered" && paymentStatus && (
          <HoverRating />
        )}
        {profile && orderStatus === "cancelled" && (
          <Typography variant="body2" color="error">
            Order Cancelled
          </Typography>
        )}

        {profile && orderStatus === "pending" && (
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={handleCancelOrder}
            >
              cancel
            </Button>
          </Box>
        )}
        {order && (
          <Typography variant="body1" sx={{ margin: "" }}>
            Qty: {quantity}
          </Typography>
        )}
        {cart && (
          <Box display="flex" alignItems="center">
            <Button
              variant="outlined"
              onClick={handleDecrement}
              sx={{ minWidth: "40px" }}
            >
              -
            </Button>
            <Typography variant="body1" sx={{ margin: "0 10px" }}>
              {quantity}
            </Typography>
            <Button
              variant="outlined"
              onClick={handleIncrement}
              sx={{ minWidth: "40px" }}
            >
              +
            </Button>
            <IconButton onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
      </Paper>
      <ToastContainer />
    </Box>
  );
}

export default ProdcutBref;
