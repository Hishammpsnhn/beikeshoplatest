import { Box, Button, Container } from "@mui/material";
import React from "react";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import PriceDetails from "../../components/order/priceDetails/PriceDetails";
import AddressDetails from "../../components/address/AddressDetails";
import Nav from "../../components/header/Nav";
import Header from "../../components/header/Header1";
function Cart() {
  return (
    <>
      <Header />
      <Nav />
      <Container sx={{ marginTop: "20px" }}>
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Box width="50%">
            <ProdcutBref />
          </Box>
          <Box width='40%'>
            <AddressDetails cart={true} />
            <Box marginTop='10px'>
              <PriceDetails />
            </Box>
            <Button variant="contained" sx={{ width: "100%", marginY: "30px" }}>
              Place Order
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default Cart;
