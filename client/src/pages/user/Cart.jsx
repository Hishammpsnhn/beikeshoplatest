import { Box, Button, Container, Grid, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import PriceDetails from "../../components/order/priceDetails/PriceDetails";
import Nav from "../../components/header/Nav";
import Header from "../../components/header/Header1";
import { getCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BrefSkeliton from "../../components/Product/productBref/BrefSkeliton";
function Cart() {
  const { user } = useSelector((state) => state.auth);

  const { items,totalAmount, loading, addCartLoading } = useSelector(
    (state) => state.cart
  );
  const [totalPrice, setTotalPrice] = useState(0);
  const [disable, setDisable] = useState(false);
  const navigate = useNavigate();

  const handleOrder = () => {
    navigate("/place_order");
  };
  const dispatch = useDispatch();
  useEffect(() => {
    async function getCartUser() {
      if (user && !addCartLoading ) {
        console.log(addCartLoading);
        const data = await dispatch(getCart(user._id));
        console.log(data);
      }

      // setItems(data?.items);
    }
    getCartUser();
  }, [addCartLoading,dispatch,user]);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [navigate,user]);
  useEffect(() => {
    const anyUnavailable = items.some((item) => item.availability === false);
    setDisable(anyUnavailable);
    const toalPrice = items.reduce((acc, item) => {
      return acc + item.productSizeDetails.price * item.quantity;
    }, 0);
    setTotalPrice(toalPrice);
  }, [items]);

  return (
    <>
  <Header />
  <Nav />
  {loading || addCartLoading ? (
    <BrefSkeliton />
  ) : (
    <Container sx={{ marginTop: "20px" }}>
      {items?.length > 0 ? (
        <Grid container spacing={5} sx={{ marginTop: "20px" }} >
          {/* Product Section */}
          <Grid item xs={12} md={7}>
            {items?.map((item) => (
              <ProdcutBref
                key={item.productId}
                cart={true}
                userId={user._id}
                productId={item.productId}
                name={item?.productId?.name}
                image={item?.productId?.images[0]}
                price={item?.price}
                qty={item?.quantity}
                size={item?.productSizeDetails}
                availability={item?.availability}
              />
            ))}
          </Grid>

          {/* Price and Checkout Section */}
          <Grid item xs={12} md={5}>
            {/* AddressDetails Component (if needed) */}
            {/* <AddressDetails cart={true} /> */}

            <Box marginTop="10px">
              <PriceDetails
                cart={true}
                totalPrice={totalPrice}
                totalAmount={totalAmount}
                itemsCount={items.length}
                offer={items?.productId?.offer}
              />
            </Box>

            <Button
              variant="contained"
              sx={{
                width: "100%",
                marginTop: "30px",
              }}
              onClick={handleOrder}
              disabled={disable}
            >
              Place Order
            </Button>
          </Grid>
        </Grid>
      ) : (
        <Typography variant="h6" sx={{ textAlign: 'center', marginTop: "20px" }}>
          Your cart is Empty
        </Typography>
      )}
    </Container>
  )}
</>
  );
}

export default Cart;
