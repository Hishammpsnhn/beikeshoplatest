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
function ProdcutBref({ cart, name, image, price, qty, userId, productId,size }) {
  const [quantity, setQuantity] = useState(qty);

  const dispatch = useDispatch();

  const handleIncrement = () => {
    if (quantity < 4) {
      setQuantity((prevQuantity) => prevQuantity + 1);
      dispatch(updateCart(userId, productId._id, "inc",size));
      toast.success(`quantity updated!`);
    } else {
      toast.error("maximum quantity limit exceeded");
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
      dispatch(updateCart(userId, productId._id, "dec",size));
      toast.success(`quantity updated!`);
    }
  };
  const handleRemove = () => {
    dispatch(updateCart(userId, productId._id, "remove",size));
    toast.success(`Removed from cart!`);
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
          <Box>
            <Typography variant="body1"> {name}</Typography>
            {/* <Typography variant="body2">{name}</Typography> */}
            <Typography variant="body2">size:{size?.size}</Typography>
            <Typography variant="body2">{price}</Typography>
          </Box>
        </Box>
        {/* <HoverRating/> */}
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
