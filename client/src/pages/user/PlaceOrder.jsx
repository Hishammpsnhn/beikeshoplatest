import React from "react";
import AddressDetails from "../../components/address/AddressDetails";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import PriceDetails from "../../components/order/priceDetails/PriceDetails";
import PaymentOptions from "../../components/order/paymentoptions/PaymentOptions";
import ApplyCoupon from "../../components/order/applyCouponCode/ApplyCoupon";
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import AddIcon from '@mui/icons-material/Add';
function PlaceOrder() {
  return (
    <>
      <Header />
      <Nav />
      <Container sx={{ marginTop: "20px" }}>
        <AddressDetails />
        <Button variant="outlined" sx={{width:'100%', marginY:'30px'}} endIcon={<AddIcon/>} >add address</Button>
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Box width='50%'>
            <ProdcutBref />
          </Box>
          <Box>
            <PriceDetails />
            <ApplyCoupon />
            <PaymentOptions />
            <Button variant="contained" sx={{width:'100%', marginY:'30px'}} >Place Order</Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default PlaceOrder;
