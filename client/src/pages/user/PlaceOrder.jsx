import React, { useEffect, useState } from "react";
import AddressDetails from "../../components/address/AddressDetails";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import PriceDetails from "../../components/order/priceDetails/PriceDetails";
import PaymentOptions from "../../components/order/paymentoptions/PaymentOptions";
import ApplyCoupon from "../../components/order/applyCouponCode/ApplyCoupon";
import { Box, Button, Container } from "@mui/material";
import Header from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getCart } from "../../actions/cartActions";
import { toast, ToastContainer } from "react-toastify";
import { createOrder } from "../../actions/orderActions";
function PlaceOrder() {
  const { user } = useSelector((state) => state.auth);
  const { items, loading, error, totalAmount, CartId } = useSelector(
    (state) => state.cart
  );
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlePlaceOrder = async () => {
    if (!selectedAddress) {
      toast.error("selected address");
      return;
    }
    if (!paymentOption) {
      toast.error("Selected Payement Option");
      return;
    }
    const data = await createOrder(
      user._id,
      selectedAddress,
      totalAmount,
      items,
      paymentOption,
      CartId
    );
    if(data){
      navigate('/success', { state: { order: true } });
    }
  };

  const onSelect = (address) => {
    setSelectedAddress(address);
  };
  const onSelectPayment = (payment) => {
    setPaymentOption(payment);
  };
  useEffect(() => {
    async function getCartUser() {
      const data = await dispatch(getCart(user._id));
    }
    getCartUser();
  }, []);
  useEffect(() => {
    if (items.length <= 0 || !items) {
      navigate("/");
    }
  }, []);
  return (
    <>
      <Header />
      <Nav />
      <Container sx={{ marginTop: "20px" }}>
        {user?.address.map((item) => (
          <AddressDetails
            cart={false}
            placeOrder={true}
            address={item}
            onSelect={onSelect}
            selectedAddress={selectedAddress}
          />
        ))}
        <Button
          variant="outlined"
          sx={{ width: "100%", marginY: "30px" }}
          endIcon={<AddIcon />}
          onClick={() => navigate("/shipping_address")}
        >
          add address
        </Button>
        <Box display="flex" justifyContent="space-between" marginTop="20px">
          <Box width="50%">
            {items?.map((item) => (
              <ProdcutBref
                // cart={true}
                order={true}
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
          <Box>
            <PriceDetails totalAmount={totalAmount} />
            <ApplyCoupon />
            <PaymentOptions
              onSelectPayment={onSelectPayment}
              paymentOption={paymentOption}
            />
            <Button
              onClick={handlePlaceOrder}
              variant="contained"
              sx={{ width: "100%", marginY: "30px" }}
            >
              Place Order
            </Button>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default PlaceOrder;
