import React, { useState } from "react";
import AdminSubHeader from "../../components/admin/Header/AdminSubHeader";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";

function PromoCode() {
  // State to hold form input values
  const [promoData, setPromoData] = useState({
    code: "",
    amount: "",
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
  const handleSubmit = () => {
    console.log(promoData);
  };

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
            <TextField placeholder="code" />
            <TextField placeholder="Amount" />
            <TextField placeholder="EXP-Date" />
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
      <Typography variant="h5" sx={{textTransform:'capitalize'}}>Current Promocodes</Typography>
      <Paper
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
          <Typography>BCF34</Typography>
          <Typography>20%</Typography>
          <Typography>1 Day Left</Typography>
        </Box>
        <Box gap={5} display='flex'>
          <Button variant="outlined">EDit</Button>
          <Button variant="contained" color="error">Delete</Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default PromoCode;
