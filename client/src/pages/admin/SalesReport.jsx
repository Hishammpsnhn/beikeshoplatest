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
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DataGrid } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { getAllOrders, salesReport } from "../../actions/orderActions";
import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";

function SalesReport() {
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
    if (data.orders) {
      setRes({ loading: false });
      setOrders(data.orders);
    }else{
      setRes({ loading: false, error: "Failed to fetch orders" });
      
    }
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
      offer: item.product[0].offer,
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
      minWidth: 150,
    },
    {
      field: "paymentMethod",
      headerName: "Payment Method",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "productName",
      headerName: "Product",
      flex: 1,
      minWidth: 150,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      width: 90,
    },
    {
      field: "offer",
      headerName: "Offer",
      width: 90,
    },
    {
      field: "couponCode",
      headerName: "Coupon Code",
      flex: 1,
      width: 90,
    },
    {
      field: "price",
      headerName: "Final Amount",
      flex: 1,
      minWidth: 150,
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
      <Container>
        <h1>Sales Report</h1>
        <p>Check out our amazing offers and discounts!</p>
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
      </Container>
    </Box>
  );
}

export default SalesReport;
