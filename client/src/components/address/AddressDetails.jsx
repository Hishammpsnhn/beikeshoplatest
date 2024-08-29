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
        }}
      >
        {placeOrder && (
          <FormControlLabel
            control={
              <Radio
                checked={selectedAddress == address._id}
                onChange={() => {
                  onSelect(address._id, address?.distance);
                  // setSelectedAddress(address._id);
                }}
                value={address._id}
              />
            }
            label=""
          />
        )}
        <Box sx={{ flex: placeOrder ? 1 : "initial" }}>
          <Typography variant="body1">{address?.fullName}</Typography>
          <Typography variant="body2">
            {address?.placeDetails || address?.location},
          </Typography>
          <Typography variant="body2">{address?.landmark}</Typography>
          {/* <Typography variant="body2">{address?.state}</Typography> */}
          <Typography variant="body2">
            {address?.pinCode}, {address?.phoneNumber}
          </Typography>
          {user.isAdmin && (
            <Typography variant="body2">Distance: {address?.distance} KM</Typography>
          )}
        </Box>
        <Box display="flex" alignItems="center">
          {!placeOrderDetails &&
            (cart ? (
              <Button variant="outlined" sx={{ width: "100px" }}>
                Change
              </Button>
            ) : (
              <>
                <Button
                  variant="outlined"
                  sx={{ width: "100px", marginRight: "10px" }}
                  startIcon={<EditBtn sx={{ color: "#902F90" }} />}
                  onClick={handleEdit}
                >
                  Edit
                </Button>
                <Button
                  variant="outlined"
                  sx={{ width: "100px" }}
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
