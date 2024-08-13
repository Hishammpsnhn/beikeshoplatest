import { Box, Button, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import PriceDetails from "../../components/order/priceDetails/PriceDetails";
import AddressDetails from "../../components/address/AddressDetails";
import Nav from "../../components/header/Nav";
import Header from "../../components/header/Header1";
import { getCart } from "../../actions/cartActions";
import { useSelector } from "react-redux";
function Cart() {
  const { user } = useSelector((state) => state.auth);
  const [items, setItems] = useState([]);
  useEffect(() => {
    async function getCartUser() {
      const data = await getCart(user._id);
      console.log(data);
      setItems(data?.items);
    }
    getCartUser();
  }, []);
  console.log(items)
  return (
    <>
      <Header />
      <Nav />
      <Container sx={{ marginTop: "20px" }}>
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Box width="50%">
            {items.map((item) => (
              <ProdcutBref cart={true} name={item.productId.name} image={item.productId.images[0]} price={item.price} qty={item.quantity} />
            ))}
          </Box>
          <Box width="40%">
            {/* <AddressDetails cart={true} /> */}
            <Box marginTop="10px">
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
