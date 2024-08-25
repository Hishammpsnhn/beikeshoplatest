import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import Header from "../../components/admin/Header/AdminSubHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import {
  getAllOrders,
  updateOrders,
  updateOrdersReturn,
} from "../../actions/orderActions";

const OrderManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { products, loading, error } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [orders, setOrders] = useState([]);
  console.log(orders);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const rows = orders?.map((item) => ({
    id: item._id,
    userName:item.address.fullName,
    productId: item.product[0].product.name,
    size: item.product[0].size,
    quantity: item.product[0].quantity,
    price: item.finalAmount,
    orderStatus:
      item.orderReturnStatus != "not requested"
        ? `RE - ${item.orderReturnStatus}`
        : item.orderStatus,
    payment: item.paymentMethod,
    paymentStatus: item.paymentStatus,
  }));

  const handleUpdate = async (id, obj) => {
    console.log(id, obj);
    const data = await updateOrders(id, obj);
    console.log(data);
    if (data.updatedOrder) {
      if (data.updatedOrder) {
        const newOrders = orders.map((order) =>
          order._id === id ? data.updatedOrder : order
        );
        setOrders(newOrders);
      }
    }
  };
  const handleReturnUpdate = async (id, obj) => {
    const data = await updateOrdersReturn(id, obj);
    if (data.updatedOrder) {
      if (data.updatedOrder) {
        const newOrders = orders?.map((order) =>
          order._id === id ? data.updatedOrder : order
        );
        setOrders(newOrders);
      }
    }
  };

  useEffect(() => {
    if (!user?.isAdmin || !isAuthenticated) navigate("/");
  }, [dispatch]);

  useEffect(() => {
    async function getAllOrder() {
      const data = await getAllOrders();
      if (data?.orders) {
        const newOrder = orders.filter((order) => order._id != data.orders._id);
        setOrders(data?.orders);
      }
    }
    getAllOrder();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    { field: "userName", headerName: "User Name" },
    {
      field: "productId",
      headerName: "productId",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "quantity",
      headerName: "Quantity",
      flex: 1,
    },
    {
      field: "price",
      headerName: "Price",
      flex: 1,
    },
    {
      field: "payment",
      headerName: "Payment Method",
      flex: 1,
    },
    {
      field: "paymentStatus",
      headerName: "Payment Info",
      flex: 1,
      renderCell: ({ row }) => (
        <>
          {row.paymentStatus == true ? (
            <CheckCircleOutlineIcon />
          ) : (
            <CloseIcon />
          )}
        </>
      ),
    },
    {
      field: "orderStatus",
      headerName: "orderStatus",
      type: "string",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography
          sx={{
            color:
              row.orderStatus === "pending"
                ? colors.greenAccent[400]
                : row.orderStatus === "delivered"
                ? "green"
                : row.orderStatus === "cancelled"
                ? "red"
                : "dark",
            fontWeight: "bold",
          }}
        >
          {row.orderStatus}
        </Typography>
      ),
    },

    {
      field: "accessLevel",
      headerName: "Manage",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" gap="10px">
          {row.orderStatus === "pending" && (
            <>
              <Button
                onClick={() =>
                  handleUpdate(row.id, { orderStatus: "delivered" })
                }
                variant="contained"
              >
                Deliver
              </Button>
              <Button
                onClick={() =>
                  handleUpdate(row.id, {
                    orderStatus: "cancelled",
                    paymentStatus: row.paymentStatus,
                    amount: row.price,
                    userId: row.userId
                  })
                }
                variant="contained"
                color="error"
              >
                cancel
              </Button>
            </>
          )}
          {row.orderStatus === "RE - requested" && (
            <>
              <Button
                onClick={() =>
                  handleReturnUpdate(row.id, {
                    orderReturnStatus: "approved",
                    returnPickupStatus: "not picked",
                  })
                }
                variant="contained"
                color="info"
                size="small"
              >
                approve
              </Button>
              <Button
                onClick={() =>
                  handleReturnUpdate(row.id, {
                    orderReturnStatus: "rejected",
                  })
                }
                variant="contained"
                color="error"
                size="small"
              >
                Reject
              </Button>
            </>
          )}
          {row.orderStatus === "RE - approved"  && (
            <>
              <Button
                onClick={() =>
                  handleReturnUpdate(row.id, {
                    orderReturnStatus: "completed",
                    returnPickupStatus: "picked",
                    amount: row.price
                  })
                }
                variant="contained"
                color="info"
                size="small"
              >
                picked
              </Button>        
            </>
          )}
          {row.orderStatus == "delivered" && row.paymentStatus == false && (
            <Button
              onClick={() => handleUpdate(row.id, { paymentStatus: true })}
              variant="contained"
              color="info"
            >
              Pay
            </Button>
          )}
          {row.orderStatus == "delivered" && row.paymentStatus == true && (
            <Typography sx={{ fontWeight: "bold" }} color="#4caf50">
              Success
            </Typography>
          )}
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px" width="100%">
      <Box display="flex" justifyContent="space-between">
        <Header title="USERS" subtitle="Managing The Users" />
      </Box>
      <Box
        m="40px 0 0 0"
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
          columns={columns}
          loading={loading}
          error={error}
        />
      </Box>
    </Box>
  );
};

export default OrderManagement;
