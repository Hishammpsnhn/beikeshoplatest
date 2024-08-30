import {
  Box,
  Button,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getAllOrders, salesReport } from "../../actions/orderActions";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import jsPDF from "jspdf";
import * as XLSX from "xlsx";
import StatBox from "../../components/admin/statsBox/StatBox";
import "jspdf-autotable";
function SalesReport() {
  const pdfRef = useRef();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [orders, setOrders] = useState([]);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [sort, setSort] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [res, setRes] = useState({ loading: false, error: null });
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [stats, setStats] = useState(null);

  const handleChange = (event) => {
    setStartDate("");
    setEndDate("");
    setSort(event.target.value);
  };

  const handleStartDateChange = (event) => {
    setSort("");
    setStartDate(event.target.value);
  };

  const handleEndDateChange = (event) => {
    setSort("");
    setEndDate(event.target.value);
  };

  const getAllOrder = async () => {
    setRes({ loading: true });
    const data = await salesReport(startDate, endDate, sort);
    if (data) {
      setRes({ loading: false });
      setOrders(data.orders);
      setStats({
        overallAmount: data.overallAmount,
        overallDiscount: data.overallDiscount,
        numberOfOrders: data.numberOfOrders,
      });
    } else {
      setRes({ loading: false, error: "Failed to fetch orders" });
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // convert to pdf
  const downloadPDF = () => {
    const doc = new jsPDF();
    const title = "Sales Report";

    // Get the current date
    const currentDate = new Date().toLocaleDateString();

    // Add title to PDF
    doc.setFontSize(18);
    doc.setTextColor(40);
    doc.text(title, 14, 22);

    // Add current date below the title
    doc.setFontSize(12);
    doc.setTextColor(100);
    doc.text(`From: ${currentDate}`, 14, 30);
    doc.text(`To: ${currentDate}`, 14, 36); // Adjusted Y-coordinate for "To" date

    // Define column headers
    const headers = [
      "ID",
      "Order Date",
      "User Name",
      "Payment Method",
      "Product Name",
      "Quantity",
      "Offer",
      "Coupon Code",
      "Final Amount",
    ];

    // Define table data
    const data = orders.map((item) => [
      item._id,
      formatDate(item.createdAt),
      item.address.fullName,
      item.paymentMethod,
      item.product[0]?.product.name,
      item.product[0]?.quantity,
      item.product[0]?.offer + " %",
      item.discount,
      item.finalAmount,
    ]);

    // Use autoTable to generate table
    doc.autoTable({
      head: [headers],
      body: data,
      startY: 44, // Adjust as needed to position the table below the date
      margin: { left: 5, right: 5 },
      headStyles: {
        fillColor: [0, 0, 0], // Black header background
        textColor: [255, 255, 255], // White text
      },
      theme: "grid",
    });

    // Add overall amount and total items after the table
    const finalY = doc.lastAutoTable.finalY + 10; // Position 10 units below the table
    doc.setFontSize(14);
    doc.setTextColor(0, 0, 0);
    doc.text(`Number of Orders: ${stats?.numberOfOrders}`, 14, finalY);
    doc.text(`Overall Amount: ${stats?.overallAmount}`, 14, finalY + 10);
    doc.text(`Overall Discount: ${stats?.overallDiscount}`, 14, finalY + 20);

    // Save the PDF
    doc.save("sales_report.pdf");
  };

  // convert to xl
  const handleExelDownload = () => {
    const flattenedOrders = orders.map((order) => ({
      orderId: order._id,
      Date: new Date(order.createdAt).toLocaleString(),
      fullName: order.address?.fullName || "",
      location: order.address?.location || "",
      distance: order.address?.distance,
      phoneNumber: order.address?.phoneNumber || "",
      productName: order.product[0]?.product.name || "",
      quantity: order.product[0]?.quantity || 0,
      price: order.product[0]?.price || 0,
      totalAmount: order.totalAmount,
      CouponCode: order.discount,
      offer: order.product[0].offer,
      deliveryCharge: order?.deliveryCharge,
      finalAmount: order.finalAmount,
      paymentMethod: order.paymentMethod,
      orderStatus: order.orderStatus,
      paymentStatus: order.paymentStatus ? "Paid" : "Pending",
    }));

    var wb = XLSX.utils.book_new();
    var ws = XLSX.utils.json_to_sheet(flattenedOrders);
    XLSX.utils.book_append_sheet(wb, ws, "Sales Report");
    XLSX.writeFile(wb, "sales_report.xlsx");
  };

  useEffect(() => {
    if (!user.isAdmin || !isAuthenticated) navigate("/");
  }, [dispatch, isAuthenticated, navigate, user.isAdmin]);

  const rows = orders.map((item) => {
    const orderDate = new Date(item.createdAt);
    const formattedOrderDate = `${orderDate.getDate()}-${
      orderDate.getMonth() + 1
    }-${orderDate.getFullYear()}`;

    return {
      id: item._id,
      userName: item.address.fullName,
      paymentMethod: item.paymentMethod,
      productName: item.product[0].product.name,
      size: item.product[0].size,
      quantity: item.product[0].quantity,
      offer: `${item.product[0].offer} %`,
      couponCode: item.discount,
      price: item.finalAmount,
      orderDate: formattedOrderDate,
    };
  });

  const columns = [
    { field: "id", headerName: "ID", width: 90 },
    { field: "orderDate", headerName: "Order Date", width: 90 },
    {
      field: "userName",
      headerName: "User Name",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "productName",
      headerName: "Product",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "offer",
      headerName: "Offer",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "couponCode",
      headerName: "Coupon Code",
      flex: 1,
      minWidth: 130,
    },
    {
      field: "price",
      headerName: "Final Amount",
      flex: 1,
      minWidth: 130,
    },
  ];

  return (
    <Box
      sx={{
        height: "100vh",
        overflow: "auto",
        "::-webkit-scrollbar": {
          display: "none",
        },
        "-ms-overflow-style": "none",
        "scrollbar-width": "none",
      }}
    >
      <Box marginX="20px">
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          sx={{ marginBottom: "20px" }}
        >
          <h1>Sales Report</h1>
          <Box gap={2} display="flex">
            <Button onClick={downloadPDF} variant="contained">
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports (pdf)
            </Button>
            <Button onClick={handleExelDownload} variant="contained">
              <DownloadOutlinedIcon sx={{ mr: "10px" }} />
              Download Reports (xlsx)
            </Button>
          </Box>
        </Box>
        <Box
          mb="20px"
          alignItems="center"
          display="flex"
          justifyContent="space-between"
        >
          <Box width="50%" display="flex">
            <FormControl sx={{ width: "50%" }}>
              <InputLabel id="demo-simple-select-label">Sort</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={sort}
                label="Sort"
                onChange={handleChange}
                size="medium"
              >
                <MenuItem value="day">Day</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="year">Year</MenuItem>
              </Select>
            </FormControl>
            <TextField
              name="startDate"
              type="date"
              value={startDate}
              onChange={handleStartDateChange}
              sx={{ marginRight: "10px" }}
            />
            <TextField
              type="date"
              name="endDate"
              value={endDate}
              onChange={handleEndDateChange}
            />
          </Box>
          <Button variant="contained" onClick={getAllOrder}>
            Apply
          </Button>
        </Box>
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="150px"
          // gap="20px"
          columnGap="20px"
          rowGap="40px"
          marginY="40px"
        >
          <Box
            gridColumn="1 / 5"
            backgroundColor={"#461246"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            // onClick={() => handleOpen()}
          >
            <StatBox
              title={"Number of Orders"}
              amount={stats?.numberOfOrders}
            />
          </Box>
          <Box
            gridColumn="5 / 9"
            backgroundColor={"#461246"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            // onClick={() => handleOpen()}
          >
            <StatBox title={"Overall Amount"} amount={stats?.overallAmount} />
          </Box>
          <Box
            gridColumn="9 / 13"
            backgroundColor={"#461246"}
            display="flex"
            alignItems="center"
            justifyContent="center"
            // onClick={() => handleOpen()}
          >
            <StatBox
              title={"Overall Discount"}
              amount={stats?.overallDiscount}
            />
          </Box>
        </Box>

        <Box padding="20px" ref={pdfRef}>
          <Box
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-columnHeaders": {
                color: `${colors.greenAccent[200]} !important`,
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: "#D4499F",
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
                backgroundColor: "#D4499F",
              },
              "& .MuiDataGrid-container--top [role=row]": {
                backgroundColor: "#D4499F !important",
                color: "#ffffff !important",
              },
            }}
          >
            <DataGrid
              checkboxSelection={false}
              rows={rows}
              error={res.error}
              loading={res.loading}
              columns={columns}
              sx={{ width: "100%" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default SalesReport;
