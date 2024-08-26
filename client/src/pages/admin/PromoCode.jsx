import React, { useEffect, useState } from "react";
import AdminSubHeader from "../../components/admin/Header/AdminSubHeader";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import {
  createCoupon,
  deleteCoupon,
  getAllCoupons,
} from "../../actions/couponActions";
import { toast } from "react-toastify";
import validator from "validator";

function PromoCode() {
  const [coupons, setCoupons] = useState([]);
  const [promoData, setPromoData] = useState({
    code: "",
    discount: "",
    expDate: "",
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPromoData({
      ...promoData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (promoData.code.length < 5) {
      toast.error("At least 5 Letters required");
      return;
    }
    if (promoData.discount < 0 || validator.isEmpty(promoData.discount)) {
      toast.error("Enter valid Amount ");
      return;
    }
    if (validator.isEmpty(promoData.expDate)) {
      toast.error("Enter valid Date");
      return;
    }
    const data = await createCoupon(promoData);
    if (data) {
      toast.success("successfully created");
      setPromoData({
        code: "",
        discount: "",
        expDate: "",
      });
      coupons.push(data);
    } else {
      toast.error("Coupon already exists");
    }
  };
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this coupon?")) {
      try {
        const data = await deleteCoupon(id);
        if (data) {
          toast.success("Coupon deleted successfully");
          setCoupons(coupons.filter((c) => c._id !== id));
        }
      } catch (error) {
        toast.error("Failed to delete coupon");
      }
    }
  };

  useEffect(() => {
    const getallcoupons = async () => {
      const data = await getAllCoupons();
      console.log(data);
      if (data) setCoupons(data);
    };
    getallcoupons();
  }, []);
  console.log(coupons);

  return (
    <Box m="20px" width="100%">
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
      >
        <AdminSubHeader
          title="PROMOCODE"
          subtitle="Create and manage your promo codes"
        />
      </Box>
      <Paper elevation={6} sx={{ maxWidth: "60%", margin: "auto" }}>
        <Box padding="30px" display="flex" flexDirection="column" gap={3}>
          <Box
            gap={1}
            padding="20px"
            display="flex"
            justifyContent="space-between"
          >
            <TextField
              name="code"
              value={promoData.code}
              sx={{ textTransform: "uppercase" }}
              placeholder="code"
              onChange={handleInputChange}
            />
            <TextField
              name="discount"
              value={promoData.discount}
              placeholder="Amount"
              type="number"
              onChange={handleInputChange}
            />
            <TextField
              name="expDate"
              value={promoData.expDate}
              type="Date"
              placeholder="EXP-Date"
              onChange={handleInputChange}
            />
          </Box>
          <Button
            variant="contained"
            size="large"
            onClick={handleSubmit}
            sx={{ alignSelf: "center", mt: 2 }}
          >
            Create
          </Button>
        </Box>
      </Paper>
      <Typography variant="h5" sx={{ textTransform: "capitalize" }}>
        Current Promocodes
      </Typography>
      <Box height="35vh" sx={{ overflowY: "scroll" }}>
        {coupons.map((item) => {
          const expDate = new Date(item.expDate);
          const today = new Date();
          const timeDiff = expDate.getTime() - today.getTime();
          const daysLeft = Math.ceil(timeDiff / (1000 * 3600 * 24));

          return (
            <Paper
              key={item.code}
              elevation={6}
              sx={{
                display: "flex",
                justifyContent: "space-between",
                maxWidth: "60%",
                marginX: "auto",
                marginTop: "20px",
                padding: "20px",
              }}
            >
              <Box display="flex" gap={5}>
                <Typography sx={{ textTransform: "uppercase" }}>
                  {item.code}
                </Typography>
                <Typography>₹ {item.discount}</Typography>
                <Typography sx={{ color: daysLeft > 0 ? "green" : "red" }}>
                  {daysLeft > 0
                    ? `${daysLeft} Day${daysLeft > 1 ? "s" : ""} Left`
                    : "Expired"}
                </Typography>
              </Box>
              <Box gap={5} display="flex">
                <Button
                  variant="contained"
                  color="error"
                  onClick={() => handleDelete(item._id)}
                >
                  Delete
                </Button>
              </Box>
            </Paper>
          );
        })}
      </Box>
    </Box>
  );
}

export default PromoCode;
