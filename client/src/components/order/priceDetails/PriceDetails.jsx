import { Box, Paper, Typography, Divider } from "@mui/material";
import React from "react";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { green } from "@mui/material/colors";

function PriceDetails({ totalAmount, itemsCount, coupon }) {
  let discountTotalAmount = totalAmount;
  if (coupon) {
    const discountedAmount = totalAmount * (coupon.discount / 100);
    discountTotalAmount = totalAmount - discountedAmount;
  }
  return (
    <Paper
      elevation={5}
      sx={{
        padding: "20px",
        maxWidth: "100%",
        marginX: "auto",
        marginBottom: "10px",
      }}
    >
      <Typography
        variant="h6"
        sx={{ marginBottom: "15px", fontWeight: "bold" }}
      >
        Price Details
      </Typography>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">Price:({itemsCount} items)</Typography>
        <Typography variant="body2">{totalAmount}</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">Shipping:</Typography>
        <Typography variant="body2">$0</Typography>
      </Box>
      <Box display="flex" justifyContent="space-between">
        <Typography variant="body2">Discount:</Typography>
        <Typography variant="body2" color="green">
          -$0
        </Typography>
      </Box>
      <Divider sx={{ margin: "15px 0" }} />
      <Box display="flex" justifyContent="space-between">
        <Typography variant="h6" fontWeight="bold">
          Total:
        </Typography>
        <Typography variant="h6" fontWeight="bold">
          {discountTotalAmount}
        </Typography>
      </Box>
      {coupon && (
        <Box display="flex" gap={1}>
          <CheckCircleOutlineIcon sx={{ color: green[500] }} />
          <Typography variant="body1" color={green[500]} fontWeight="bold">
            Coupon Applied
          </Typography>
        </Box>
      )}
    </Paper>
  );
}

export default PriceDetails;
