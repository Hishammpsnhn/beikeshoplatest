import React, { useEffect, useState } from "react";
import Header1 from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import AddressDetails from "../../components/address/AddressDetails";
import { useParams } from "react-router-dom";
import { getProductDetails, updateOrders } from "../../actions/orderActions";
import { Box, Container, Typography } from "@mui/material";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000/";
function PlaceOrderDetails() {
  const { id } = useParams();

  const [address, setAddress] = useState(null);
  const [order, setOrder] = useState(null);

  const { user, error } = useSelector((state) => state.auth);

  const handleCancelOrder = async (id, name) => {
    if (window.confirm("Are you sure you want to cancel " + name + "?")) {
      try {
        const data = await updateOrders(order._id, {
          orderStatus: "cancelled",
        });
        if (data.updatedOrder) {
          toast.success("Order cancelled successfully");

          // Update the orders state
          setOrder(data.updatedOrder);
        }
      } catch (error) {
        toast.error("Failed to cancel the order");
        console.error("Error cancelling order:", error);
      }
    }
  };

  useEffect(() => {
    async function getProductDetail() {
      const data = await getProductDetails(id);
      if (data) {
        console.log(data.order);
        setOrder(data.order);
        setAddress(data.address);
      }
    }
    getProductDetail();
  }, []);
  console.log(order?.product[0].product.ratings);

  return (
    <>
      <Header1 />
      <Nav />
      <Container sx={{ marginTop: "20px" }}>
        <Typography variant="h6">Delivered Address</Typography>
        <AddressDetails
          address={address}
          cart={true}
          placeOrderDetails={true}
        />
        <Box sx={{ width: "100%", display: "flex" }}>
          <Box width="50%">
            <ProdcutBref
              name={order?.product[0].product.name}
              image={`${BASE_URL}/${order?.product[0]?.product?.images[0]}`}
              size={order?.product[0].size}
              qty={order?.product[0].quantity}
              price={order?.product[0].price}
              orderStatus={order?.orderStatus}
              paymentStatus={order?.paymentStatus}
              handleCancelOrder={handleCancelOrder}
              ratings={order?.product[0].product.ratings}
              userId={user._id}
              productId={order?.product[0].product._id}
              profile={true}
              details={true}
            />
          </Box>
          <Box paddingX='25px'>
            <Typography variant="h6">
              Payment Method : {order?.paymentMethod}
            </Typography>
            <Typography variant="h6">
              Order Date : {order?.paymentMethod}
            </Typography>
            <Typography variant="h6">
              Deliver Date : {order?.paymentMethod}
            </Typography>
            <Typography variant="h6">
              Status : {order?.paymentMethod}
            </Typography>
          </Box>
        </Box>
      </Container>
    </>
  );
}

export default PlaceOrderDetails;
