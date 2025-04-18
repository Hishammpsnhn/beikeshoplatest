import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import HoverRating from "../rating/Rating";
import { updateCart } from "../../../actions/cartActions";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";
import { fetchCartStart } from "../../../reducers/cartReducers";
import { useNavigate } from "react-router-dom";
import StarIcon from "@mui/icons-material/Star";
function ProdcutBref({
  cart,
  order,
  wishlist,
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
  ratings,
  availability,
  details,
  handleWishlistRemove,
  admin,
  handleCancelOrderClick,
  paymentMethod,
  returnStatus,
}) {
  const [quantity, setQuantity] = useState(qty);
  const [qtyLoading, setQtyLoading] = useState(false);
  const userRating = ratings?.find((item) => item?.userId === userId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const BASE_URL = process.env.REACT_APP_SERVER_API;

  const handleIncrement = async () => {
    setQtyLoading(true);
    if (quantity < 4) {
      const data = await dispatch(
        updateCart(userId, productId._id, "inc", size, quantity)
      );
      if (data) {
        setQuantity((prevQuantity) => prevQuantity + 1);
        toast.success(`quantity updated!`);
      } else {
        toast.error(`out of Stock!`);
      }
    } else {
      toast.error("maximum quantity limit exceeded");
    }
    setQtyLoading(false);
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
    dispatch(fetchCartStart());
    dispatch(updateCart(userId, productId._id, "remove", size));
    toast.success(`Removed from cart!`);
  };
  const handleDetail = () => {
    navigate(`/orderDetails/${orderId}`);
  };

  return (
    <Box sx={{ marginY: "10px" }}>
      <Paper
        elevation={5}
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box display="flex" width="50%" justifyContent="space-evenly">
          <Box sx={{ width: "80px", height: "80px" }}>
            <img
              onClick={() => {
                cart || order
                  ? navigate(`/productDetails/${productId._id}`)
                  : navigate(`/productDetails/${productId}`);
              }}
              src={`${BASE_URL}/${image}`} 
              alt="image_Unknown"
              style={{
                width: "100%",
                height: "100%",
                objectFit: "contain",
                cursor: "pointer",
              }}
              loading="lazy"
            />
          </Box>
          {!wishlist ? (
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1"> {name}</Typography>
              {profile ? (
                <Typography variant="body2">size:{size}</Typography>
              ) : (
                <Typography variant="body2">size:{size?.size}</Typography>
              )}
              <Typography variant="body2">{price}</Typography>
            </Box>
          ) : (
            <Box sx={{ flex: 1 }}>
              <Typography variant="body1"> {name}</Typography>

              <Typography variant="body2">{price}</Typography>
              {wishlist && (
                <Button
                  variant="contained"
                  className="bg-primary "
                  size="small"
                  endIcon={<StarIcon />}
                  sx={{ position: "inherit", padding: "0px", minWidth: "45px" }}
                >
                  4
                </Button>
              )}
            </Box>
          )}
        </Box>
        {profile &&
          paymentMethod === "online payment" &&
          !paymentStatus &&
          !admin && <Typography color="red">Payment Failed</Typography>}
        {profile &&
          orderStatus === "delivered" &&
          paymentStatus &&
          !admin &&(
            <HoverRating
              userId={userId}
              productId={productId}
              userRating={userRating}
            />
          )}
        {returnStatus === "picked" && (
          <Typography variant="body2" color="error">
            Returned
          </Typography>
        )}
        {profile && orderStatus === "cancelled" && (
          <Typography variant="body2" color="error">
            Order Cancelled
          </Typography>
        )}

        {details && orderStatus === "pending" && !admin && (
          <Box>
            <Button
              variant="contained"
              color="error"
              onClick={
                handleCancelOrderClick
                //handleCancelOrder(orderId, name, paymentStatus, finalAmount)
              }
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
              disabled={qtyLoading}
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
              disabled={qtyLoading || !availability}
            >
              +
            </Button>
            <IconButton disabled={qtyLoading} onClick={handleRemove}>
              <DeleteIcon />
            </IconButton>
          </Box>
        )}
        {wishlist && (
          <IconButton
            disabled={qtyLoading}
            onClick={() => handleWishlistRemove(productId)}
          >
            <DeleteIcon />
          </IconButton>
        )}
        {profile && !details && (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleDetail(orderId)}
          >
            Details
          </Button>
        )}
        {(cart || order) && !availability && (
          <Typography color="red">Out of Stock</Typography>
        )}
      </Paper>
    </Box>
  );
}

export default ProdcutBref;
