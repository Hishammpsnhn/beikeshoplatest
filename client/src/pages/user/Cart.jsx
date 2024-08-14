import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import PriceDetails from "../../components/order/priceDetails/PriceDetails";
import AddressDetails from "../../components/address/AddressDetails";
import Nav from "../../components/header/Nav";
import Header from "../../components/header/Header1";
import { getCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
function Cart() {
  const { user } = useSelector((state) => state.auth);
  const { items, loading, error,totalAmount } = useSelector((state) => state.cart);
  console.log(totalAmount,items)
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCartUser() {
      const data = await dispatch(getCart(user._id));
      console.log(data);
      
      // setItems(data?.items);
    }
    getCartUser();
  }, []);
  console.log(items);
  useEffect(() => {
    if (error) {
      toast.error(error);
    }
  }, []);
  return (
    <>
      <Header />
      <Nav />
      <Container sx={{ marginTop: "20px" }}>
        
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Box width="50%">
            {items?.map((item) => (
              <ProdcutBref
                cart={true}
                userId={user._id}
                productId={item.productId}
                name={item?.productId?.name}
                image={item?.productId?.images[0]}
                price={item?.productSizeDetails?.price}
                qty={item?.quantity}
                size={item?.productSizeDetails}
              />
            ))}
          </Box>
          <Box width="40%">
            {/* <AddressDetails cart={true} /> */}
            <Box marginTop="10px">
              <PriceDetails totalAmount={totalAmount}/>
            </Box>
            <Button variant="contained" sx={{ width: "100%", marginY: "30px" }}>
              Place Order
            </Button>
          </Box>
        </Box>
      </Container>
      <ToastContainer />
    </>
  );
}

export default Cart;
