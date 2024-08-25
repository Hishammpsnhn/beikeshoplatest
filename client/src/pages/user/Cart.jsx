import { Box, Button, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import PriceDetails from "../../components/order/priceDetails/PriceDetails";
import AddressDetails from "../../components/address/AddressDetails";
import Nav from "../../components/header/Nav";
import Header from "../../components/header/Header1";
import { getCart } from "../../actions/cartActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import BrefSkeliton from "../../components/Product/productBref/BrefSkeliton";
function Cart() {
  const { user } = useSelector((state) => state.auth);

  const { items, error, totalAmount, loading, addCartLoading } = useSelector(
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
      if (user) {
        console.log(addCartLoading);
        const data = await dispatch(getCart(user._id));
        console.log(data);
      }

      // setItems(data?.items);
    }
    getCartUser();
  }, []);

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, []);
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
                    availability={item?.availability}
                  />
                ))}
              </Box>

              <Box width="40%">
                {/* <AddressDetails cart={true} /> */}
                <Box marginTop="10px">
                  <PriceDetails
                    totalPrice={totalPrice}
                    totalAmount={totalAmount}
                    itemsCount={items.length}
                    offer={items?.productId?.offer}
                  />
                </Box>
                <Button
                  variant="contained"
                  sx={{ width: "100%", marginY: "30px" }}
                  onClick={handleOrder}
                  disabled={disable}
                >
                  Place Order
                </Button>
              </Box>
            </Box>
          ) : (
            <Typography>Your cart is Empty</Typography>
          )}
        </Container>
      )}
    </>
  );
}

export default Cart;
