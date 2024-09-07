import React, { useState, useEffect } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import { toast } from "react-toastify";
import { getCouponsByCode,  getActiveCoupons } from "../../../actions/couponActions";

function ApplyCoupon({ setCoupon, totalAmount }) {
  const [couponCode, setCouponCode] = useState("");
  const [availableCoupons, setAvailableCoupons] = useState([]);

  useEffect(() => {
    const fetchCoupons = async () => {
      const coupons = await getActiveCoupons();
      setAvailableCoupons(coupons);
    };
    fetchCoupons();
  }, []);

  const handleApplyCouponCode = async () => {
    if (totalAmount < 1000) {
      toast.error("Order amount should be at least 1000");
      return;
    }

    if (couponCode.length < 5) {
      toast.error("Enter valid coupon code: " + couponCode);
      setCoupon(null);
      return;
    }

    const data = await getCouponsByCode(couponCode);
    if (data) {
      setCoupon(data);
      toast.success("Coupon applied successfully");
    } else {
      toast.error("Invalid or Expired coupon code");
      setCoupon(null);
    }
  };

  const handleCouponSelect = (event) => {
    setCouponCode(event.target.value);
  };

  return (
    <Paper
      elevation={3}
      sx={{
        padding: "20px",
        marginX: "auto",
        display: "flex",
        flexDirection: "column",
        gap: "10px",
        marginY: "10px",
      }}
    >
      <TextField
        size="small"
        placeholder="Enter your coupon code"
        variant="outlined"
        value={couponCode}
        onChange={(e) => setCouponCode(e.target.value)}
        fullWidth
      />
      {availableCoupons.length > 0 && (
        <TextField
          select
          size="small"
          label="Available Coupons"
          value={couponCode}
          onChange={handleCouponSelect}
          fullWidth
        >
          {availableCoupons.map((coupon) => (
            <MenuItem key={coupon.code} value={coupon.code}>
              {coupon.code} - {coupon.discount}₹ off
            </MenuItem>
          ))}
        </TextField>
      )}
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
