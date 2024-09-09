import React, { useEffect, useState } from "react";
import Header1 from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import AddressDetails from "../../components/address/AddressDetails";
import { useNavigate, useParams } from "react-router-dom";
import {
  getProductDetails,
  onlinePaymentOrder,
  onlinePaymentOrderVerify,
  updateOrders,
} from "../../actions/orderActions";
import {
  Box,
  Button,
  Container,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  Typography,
} from "@mui/material";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import CircularProgress from "@mui/material/CircularProgress";
import CustomAlert from "../../components/alert/CustomAlert";
import FormDialog from "../../components/FormDialog/FormDialog";
import jsPDF from "jspdf";

const BASE_URL = "https://app.beikeshop.shop/";
function PlaceOrderDetails() {
  const { id } = useParams();

  const [address, setAddress] = useState(null);
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const failedStep = ["Order Placed", "payment Failed"];
  const steps = ["Order Placed", "In Transit", order?.orderStatus];
  const returnSteps =
    order?.orderReturnStatus === "rejected"
      ? ["requested", "rejected"]
      : ["requested", "approved", "picked"];
  const { user} = useSelector((state) => state.auth);

  const handleCancelOrderClick = () => {
    setAlertOpen(true);
  };

  //handle for download invoice bil
  const handleInvoiceDownload = () => {
    // Create a new jsPDF instance
    const doc = new jsPDF();

    // Mock invoice data
    const invoiceData = {
      invoiceNumber: order?._id || "INV-12345",
      date: new Date(order?.createdAt).toLocaleDateString() || "2024-08-29",
      customer: order?.address?.fullName || "John Doe",
      billingAddress: {
        street: order?.address?.location || "123 Main St",
        zip: order?.address?.pincode || "12345",
      },
      items: [
        {
          description: order?.product[0].product?.name,
          quantity: order?.product[0].quantity,
          price: order?.totalAmount,
        },
      ],
      totalAmount: order?.totalAmount,
    };

    // Set up the PDF document
    doc.setFontSize(20);
    doc.text("Invoice", 20, 20);

    // Invoice details
    doc.setFontSize(12);
    doc.text(`Invoice Number: ${invoiceData.invoiceNumber}`, 20, 40);
    doc.text(`Date: ${invoiceData.date}`, 20, 50);
    doc.text(`Customer: ${invoiceData.customer}`, 20, 60);

    // Billing Address
    doc.setFontSize(12);
    doc.text("Billing Address:", 20, 70);
    doc.text(`${invoiceData.billingAddress.street}`, 20, 80);
    doc.text(` ${invoiceData.billingAddress.zip}`, 20, 90);

    // Add a line break
    doc.text(
      "---------------------------------------------------------------------",
      20,
      110
    );

    // Add invoice items
    invoiceData.items.forEach((item, index) => {
      const itemYPosition = 120 + index * 10;
      doc.text(
        `${item.description} - Quantity: ${item.quantity} - Price: ${item.price} `,
        20,
        itemYPosition
      );
    });

    // Add total amount
    const totalYPosition = 120 + invoiceData.items.length * 10 + 10;
    doc.text(
      "---------------------------------------------------------------------",
      20,
      totalYPosition
    );
    doc.setFontSize(14);
    doc.text(
      `Total Amount: ${invoiceData.totalAmount} `,
      20,
      totalYPosition + 10
    );

    // Save the PDF and trigger download
    doc.save(`Invoice_${invoiceData.invoiceNumber}.pdf`);
  };
  const handleCancelOrder = async (id, name) => {
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
  };

  const handleFailedPayment = async () => {
    const data = await onlinePaymentOrder(order?.finalAmount);
    var options = {
      key: process.env.RAZORPAPY_KEY_ID,
      amount: order?.finalAmount,
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
          const data = await updateOrders(order._id, {
            orderStatus: "pending",
            paymentStatus: true,
          });
          if (data) toast.success("Payment successfully");
          navigate(`/profile`);
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
    rzp1.on("payment.failed", async function (response) {
      alert(response.error.code);
    });
    rzp1.open();
  };

  const handleReturn = async () => {
    setOpen(true);
  };

  const returnActiveStep =
    order?.orderReturnStatus === "requested"
      ? 0
      : order?.orderReturnStatus === "approved"
      ? 1
      : order?.orderReturnStatus === "completed"
      ? 3
      : 0
      ? order?.orderReturnStatus === "rejected"
      : 2;
  useEffect(() => {
    async function getProductDetail() {
      setLoading(true);
      const data = await getProductDetails(id);
      if (data) {
        setLoading(false);
        setOrder(data?.order);
        setAddress(data?.order?.address);
      }
    }
    getProductDetail();
  }, [id]);

  return (
    <>
  <Header1 />
  <Nav />
  {loading ? (
    <Container>
      <CircularProgress />
    </Container>
  ) : (
    <Container sx={{ marginTop: "20px" }}>
      {order?.orderStatus === "delivered" && (
        <Button variant="outlined" onClick={handleInvoiceDownload}>
          Invoice Download
        </Button>
      )}
      <Typography variant="h6">Delivered Address</Typography>
      <AddressDetails
        address={address}
        cart={true}
        placeOrderDetails={true}
      />

      <Box sx={{ width: "100%", marginY: "20px" }}>
        {order?.paymentMethod === "online payment" && !order?.paymentStatus ? (
          <Stepper
            activeStep={order?.orderStatus === "payment Failed" ? 2 : 1}
            alternativeLabel
          >
            {failedStep.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ textTransform: "capitalize" }}>
                  {label}
                </StepLabel>
              </Step>
            ))}
          </Stepper>
        ) : (
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
        )}
      </Box>

      {/* Responsive Grid Layout */}
      <Grid container spacing={2} sx={{ width: "100%" }}>
        {/* Product Details Section */}
        <Grid item xs={12} md={7}>
          <ProdcutBref
            name={order?.product[0].product?.name}
            image={`${BASE_URL}/${order?.product[0]?.product?.images[0]}`}
            size={order?.product[0].size}
            qty={order?.product[0].quantity}
            price={order?.totalAmount}
            orderStatus={order?.orderStatus}
            paymentStatus={order?.paymentStatus}
            handleCancelOrder={handleCancelOrder}
            ratings={order?.product[0].product.ratings}
            userId={user._id}
            productId={order?.product[0].product._id}
            profile={true}
            details={true}
            handleCancelOrderClick={handleCancelOrderClick}
          />
        </Grid>

        {/* Order Summary Section */}
        <Grid item xs={12} md={5}>
          <Paper elevation={6} sx={{ padding: "20px" }}>
            <Typography variant="body1">
              Applied Coupon: {order?.discount}
            </Typography>
            <Typography variant="body1">
              Delivery Charge: {order?.deliveryCharge}
            </Typography>
            <Typography variant="body1">
              Total Amount: {order?.finalAmount}
            </Typography>
            <Typography variant="body1">
              Payment Method: {order?.paymentMethod}
            </Typography>
            <Typography variant="body1">
              Order Date: {new Date(order?.createdAt).toLocaleDateString()}
            </Typography>

            {order?.orderReturnStatus !== "not requested" && (
              <Typography
                variant="body1"
                sx={{ textTransform: "capitalize", color: "purple" }}
              >
                Return Request Status: {order?.orderReturnStatus}
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>

      {/* Conditional Return Button */}
      {order?.orderStatus === "delivered" && order?.orderReturnStatus === "not requested" && (
        <Button onClick={handleReturn} variant="contained" sx={{ marginTop: '20px' }}>
          Return
        </Button>
      )}

      {/* Conditional Pay Again Button */}
      {order?.paymentMethod === "online payment" && !order?.paymentStatus && (
        <Button
          onClick={handleFailedPayment}
          variant="contained"
          sx={{ backgroundColor: "red", marginTop: "20px" }}
        >
          Pay Again
        </Button>
      )}

      {/* Return Status and Stepper */}
      {order?.orderStatus === "delivered" && order?.paymentStatus && order?.orderReturnStatus !== "not requested" && (
        <>
          <Typography variant="h6" sx={{ marginY: "20px" }}>
            Return Status
          </Typography>
          {order?.orderReturnStatus && (
            <Typography variant="body1" sx={{ marginY: "20px" }}>
              Reason: {order?.returnReason}
            </Typography>
          )}
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

      {/* Alert and Dialog Components */}
      <CustomAlert
        open={alertOpen}
        handleClose={() => setAlertOpen(false)}
        title="Confirm Action"
        message={`Are you sure you want to cancel the order?`}
        onConfirm={handleCancelOrder}
      />
      <FormDialog
        open={open}
        setOpen={setOpen}
        setOrder={setOrder}
        orderId={order?._id}
      />
    </Container>
  )}
</>
  );
}

export default PlaceOrderDetails;
