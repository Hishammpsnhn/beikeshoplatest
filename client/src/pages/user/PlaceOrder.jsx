import React, { useEffect, useState } from "react";
import AddressDetails from "../../components/address/AddressDetails";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import PriceDetails from "../../components/order/priceDetails/PriceDetails";
import PaymentOptions from "../../components/order/paymentoptions/PaymentOptions";
import ApplyCoupon from "../../components/order/applyCouponCode/ApplyCoupon";
import { Box, Button, CircularProgress, Container } from "@mui/material";
import Header from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import { getCart } from "../../actions/cartActions";
import { toast, ToastContainer } from "react-toastify";
import {
  createOrder,
  onlinePaymentOrder,
  onlinePaymentOrderVerify,
} from "../../actions/orderActions";
import { clearCart } from "../../reducers/cartReducers";

function PlaceOrder() {
  const { user } = useSelector((state) => state.auth);
  const { items, loading, error, totalAmount, CartId } = useSelector(
    (state) => state.cart
  );
  const [disable, setDisable] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState(null);
  const [coupon, setCoupon] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [wallet, setWallet] = useState(null);
  // const [offer, setOffer] = useState(items);

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
    let discountTotalAmount = totalAmount;
    if (coupon) {
      const discountedAmount = coupon.discount * items.length;
      discountTotalAmount = totalAmount - discountedAmount;
    }
    if (coupon && paymentOption === "wallet") {
      toast.error("Can't use coupon with Wallet");
    }

    if (paymentOption === "online payment") {
      const data = await onlinePaymentOrder(discountTotalAmount);
      var options = {
        key: process.env.RAZORPAPY_KEY_ID,
        amount: totalAmount,
        currency: "INR",
        name: "Beike shop",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: data.id,
        handler: async function (response) {
          const body = {
            ...response,
          };
          const verify = onlinePaymentOrderVerify(body);
          if (verify) {
            const data = await createOrder(
              user._id,
              selectedAddress,
              totalAmount,
              items,
              paymentOption,
              CartId,
              coupon ? coupon.discount : 0,
              discountTotalAmount
            );
            if (data) {
              navigate("/success", { state: { order: true } });
              dispatch(clearCart());
            }
          }
        },
        prefill: {
          name: "hishammps",
          email: "hishammpsn@gmail.com",
          contact: "9000090000",
        },
        notes: {
          address: "Razorpay Corporate Office",
        },
        theme: {
          color: "#461246",
        },
      };
      var rzp1 = new window.Razorpay(options);
      rzp1.on("payment.failed", function (response) {
        alert(response.error.code);
        alert(response.error.description);
        alert(response.error.source);
        alert(response.error.step);
        alert(response.error.reason);
        alert(response.error.metadata.order_id);
        alert(response.error.metadata.payment_id);
      });
      rzp1.open();
    } else {
      console.log(
        user._id,
        selectedAddress,
        totalAmount,
        items,
        paymentOption,
        CartId,
        coupon ? coupon.discount : 0,
        discountTotalAmount
      );

      const data = await createOrder(
        user._id,
        selectedAddress,
        totalAmount,
        items,
        paymentOption,
        CartId,
        coupon ? coupon.discount : 0,
        discountTotalAmount
      );
      if (data) {
        navigate("/success", { state: { order: true } });
        dispatch(clearCart());
      }
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
          onClick={() => navigate("/shipping_address",{state:{ action: "place_order"}})}
        >
          add address
        </Button>
        {loading ? (
          <CircularProgress />
        ) : (
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
                  availability={item?.availability}
                />
              ))}
            </Box>
            <Box>
              <PriceDetails
                totalAmount={totalAmount}
                coupon={coupon}
                itemsCount={items.length}
                totalPrice={totalPrice}
              />
              <ApplyCoupon setCoupon={setCoupon} totalAmount={totalAmount} />
              <PaymentOptions onSelectPayment={onSelectPayment} />
              <Button
                onClick={handlePlaceOrder}
                variant="contained"
                disabled={disable}
                sx={{ width: "100%", marginY: "30px" }}
              >
                Place Order
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </>
  );
}

export default PlaceOrder;
