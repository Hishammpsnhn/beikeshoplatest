import React, { useEffect, useState } from "react";
import Header1 from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import AddressDetails from "../../components/address/AddressDetails";
import { useParams } from "react-router-dom";
import {
  getProductDetails,
  updateOrders,
  updateOrdersReturn,
} from "../../actions/orderActions";
import {
  Box,
  Button,
  capitalize,
  Container,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { green } from "@mui/material/colors";

const BASE_URL = "http://localhost:3000/";
function PlaceOrderDetails() {
  const { id } = useParams();

  const [address, setAddress] = useState(null);
  const [order, setOrder] = useState(null);

  const steps = ["Order Placed", "In Transit", order?.orderStatus];
  const returnSteps =
    order?.orderReturnStatus === "rejected"
      ? ["requested", "rejected"]
      : ["requested", "approved", "picked"];
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
  const handleReturn = async () => {
    if (window.confirm("Are you sure you want to return")) {
      const data = await updateOrdersReturn(order._id, {
        orderReturnStatus: "requested",
      });
      if (data) {
        toast.success("Return request sent successfully");
        setOrder(data.updatedOrder);
      }
    }
  };

  const returnActiveStep =
    order?.orderReturnStatus === "requested"
      ? 0
      : order?.orderReturnStatus === "approved"
      ? 1
      : order?.orderReturnStatus === "completed"
      ? 3
      : 0;

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
        <Box sx={{ width: "100%", marginY: "20px" }}>
          <Stepper
            activeStep={order?.orderStatus === "pending" ? 1 : 3}
            alternativeLabel
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ textTransform: "capitalize" }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Box width="50%">
            <ProdcutBref
              name={order?.product[0].product?.name}
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
          <Paper elevation={6} sx={{ width: "40%", padding: "20px" }}>
            <Typography variant="body1">
              Amount : {order?.finalAmount}
            </Typography>
            <Typography variant="body1">
              Payment Method : {order?.paymentMethod}
            </Typography>
            <Typography variant="body1">
              Order Date :{new Date(order?.createdAt).toLocaleDateString()}
            </Typography>
            {order?.orderReturnStatus != "not requested" && (
              <Typography
                variant="body1"
                sx={{ textTransform: "capitalize", color: "purple" }}
              >
                Return Request Status :{order?.orderReturnStatus}
              </Typography>
            )}
          </Paper>
        </Box>
        {order?.orderStatus === "delivered" &&
          order?.orderReturnStatus === "not requested" && (
            <Button onClick={handleReturn} variant="contained">
              Return
            </Button>
          )}
        {order?.orderStatus === "delivered" &&
          order?.paymentStatus &&
          order?.orderReturnStatus != "not requested" && (
            <>
              <Typography variant="h6" sx={{ marginY: "20px" }}>
                Return Status
              </Typography>
              <Stepper activeStep={returnActiveStep} alternativeLabel>
                {returnSteps.map((label) => (
                  <Step key={label}>
                    <StepLabel sx={{ textTransform: "capitalize" }}>
                      {label}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </>
          )}
      </Container>
    </>
  );
}

export default PlaceOrderDetails;
