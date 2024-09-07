import {
  Box,
  Button,
  Paper,
  Typography,
  Radio,
  FormControlLabel,
} from "@mui/material";
import React, { useState } from "react";
import EditBtn from "@mui/icons-material/Edit";
import DeleteBtn from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteShippingAddress } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

function AddressDetails({
  cart,
  address,
  setSelectedAddress,
  selectedAddress,
  onSelect,
  placeOrder,
  placeOrderDetails,
  profile,
}) {
  console.log(address);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete`)) {
      dispatch(deleteShippingAddress(user._id, address._id));
    }
  };

  const handleEdit = () => {
    console.log(user._id, address._id);
    if (profile) {
      navigate("/shipping_address", { state: { action: "profile", address } });
    } else {
      navigate("/shipping_address", {
        state: { action: "place_order", address },
      });
    }
  };

  return (
    <Box sx={{ marginY: "10px" }}>
    <Paper
      elevation={2}
      sx={{
        padding: "10px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        //flexDirection: { xs: "column", sm: "row" }, // Stack on small screens, row on larger
      }}
    >
      {placeOrder && (
        <FormControlLabel
          control={
            <Radio
              checked={selectedAddress == address._id}
              onChange={() => {
                onSelect(address._id, address?.distance);
              }}
              value={address._id}
            />
          }
          label=""
        />
      )}
      <Box sx={{ flex: placeOrder ? 1 : "initial", textAlign: { xs: "center", sm: "left" } }}>
        <Typography variant="body1">{address?.fullName}</Typography>
        <Typography variant="body2">
          {address?.placeDetails || address?.location},
        </Typography>
        <Typography variant="body2">{address?.landmark}</Typography>
        <Typography variant="body2">
          {address?.pinCode}, {address?.phoneNumber}
        </Typography>
        {user.isAdmin && (
          <Typography variant="body2">Distance: {address?.distance} KM</Typography>
        )}
      </Box>
      <Box
        display="flex"
        alignItems="center"
        sx={{
          flexDirection: { xs: "column", sm: "row" }, // Stack buttons on small screens
          mt: { xs: "10px", sm: "0" }, // Add top margin on small screens
        }}
      >
        {!placeOrderDetails &&
          (cart ? (
            <Button variant="outlined" sx={{ width: { xs: "80%", sm: "100px" } }}>
              Change
            </Button>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{
                  width: { xs: "80%", sm: "100px" },
                  marginRight: { xs: "0", sm: "10px" }, // Remove margin on small screens
                  mb: { xs: "10px", sm: "0" }, // Add bottom margin on small screens
                }}
                startIcon={<EditBtn sx={{ color: "#902F90" }} />}
                onClick={handleEdit}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                sx={{ width: { xs: "80%", sm: "100px" } }}
                startIcon={<DeleteBtn sx={{ color: "#902F90" }} />}
                onClick={handleDelete}
              >
                Delete
              </Button>
            </>
          ))}
      </Box>
    </Paper>
  </Box>
  );
}

export default AddressDetails;
