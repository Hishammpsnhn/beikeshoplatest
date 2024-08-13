import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import EditBtn from "@mui/icons-material/Edit";
import DeleteBtn from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { deleteShippingAddress } from "../../actions/userAction";
import { useNavigate } from "react-router-dom";

function AddressDetails({ cart, address }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);

  const handleDelete = () => {
    console.log(user._id, address._id);
    if (window.confirm(`Are you sure you want to delete`)) {
      dispatch(deleteShippingAddress(user._id, address._id));
    }
  };
  const handleEdit = () => {
    console.log(user._id, address._id);
    navigate("/shipping_address", { state: address });
  };

  return (
    <Box sx={{ marginY: "10px" }}>
      <Paper
        elevation={2}
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="body1">{address.fullName}</Typography>
          <Typography variant="body2">
            {address.city},{address.landmark}
          </Typography>
          <Typography variant="body2">{address.state}</Typography>
          <Typography variant="body2">
            {address.pinCode}, {address.phoneNumber}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {cart ? (
            <>
              <Button variant="outlined" sx={{ width: "100px" }}>
                Change
              </Button>
            </>
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
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default AddressDetails;