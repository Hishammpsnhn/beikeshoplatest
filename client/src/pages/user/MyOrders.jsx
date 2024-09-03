import React, { useEffect, useState } from "react";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import { Container, Paper, Typography } from "@mui/material";
import { getOrders } from "../../actions/orderActions";
import { useSelector } from "react-redux";
import Nav from "../../components/header/Nav";
import Header1 from "../../components/header/Header1";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const { user, error } = useSelector((state) => state.auth);
  useEffect(() => {
    async function getUserOrder() {
      const data = await getOrders(user?._id);
      setOrders(data?.orders);
    }
    getUserOrder();
  }, []);

  return (
    <>
      <Header1 />
      <Nav />
      <Container>
        <Typography
          variant="h4"
          sx={{ fontWeight: "medium", marginTop: "30px" }}
        >
          My Orders
        </Typography>
        <Paper
          elevation={0}
          sx={{
            maxHeight: "60vh",
            overflowX: "auto",
            padding: "25px",
            marginTop: "10px",
            // Hide scrollbar
            "::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none", // Internet Explorer 10+
            "scrollbar-width": "none", // Firefox
          }}
        >
          {orders?.map((order) => (
            <ProdcutBref
              name={order?.product[0].product.name}
              image={order?.product[0].product.images[0]}
              size={order?.product[0].size}
              qty={order?.product[0].quantity}
              price={order?.totalAmount}
              orderStatus={order?.orderStatus}
              paymentStatus={order?.paymentStatus}
              paymentMethod={order?.paymentMethod}
              profile={true}
              orderId={order?._id}
              // handleCancelOrder={handleCancelOrder}
              userId={user._id}
              finalAmount={order?.finalAmount}
              returnStatus={order?.returnPickupStatus}
              productId={order?.product[0].product._id}
              ratings={order?.product[0].product.ratings}
              // handleCancelOrderClick={handleCancelOrderClick}
            />
          ))}
        </Paper>
      </Container>
    </>
  );
}

export default MyOrders;
