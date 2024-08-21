import React, { useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { toast } from "react-toastify";
import { getCouponsByCode } from "../../../actions/couponActions";

function ApplyCoupon({ setCoupon }) {
  const [couponCode, setCouponCode] = useState("");

  const handleApplyCouponCode = async () => {
    if (couponCode.length < 5) {
      toast.error("Enter valid coupon code"+couponCode);
      return;
    }
    const data = await getCouponsByCode(couponCode);
    if (data) {
      setCoupon(data)
      toast.success("Coupon applied successfully");
    }else{
      toast.error("Invalid or Expired coupon code");
      setCoupon(null)
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        maxWidth: "300px",
        marginX: "auto",
        display: "flex",
        gap: "10px",
        marginY: "10px",
      }}
    >
      <TextField
        size="small"
        placeholder="Enter your coupon code"
        variant="outlined"
        onChange={(e) => {
          setCouponCode(e.target.value);
        }}
        fullWidth
      />
      <Button
        variant="contained"
        color="primary"
        sx={{ whiteSpace: "nowrap", padding: "8px 16px" }}
        onClick={handleApplyCouponCode}
      >
        Apply
      </Button>
    </Paper>
  );
}

export default ApplyCoupon;
