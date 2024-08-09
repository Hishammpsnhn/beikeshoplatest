import React, { useEffect, useState } from "react";
import { Box, Button, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockUserData as users } from "../../mockdata";
import Header from "../../components/admin/Header/AdminSubHeader";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import CategoryModal from "../../components/admin/CategoryModal/CategoryModeal";
import {
  deleteProduct,
  getProductsList,
  oneProduct,
} from "../../actions/productActions";
import BlockIcon from "@mui/icons-material/Block";
import { getUsers, userStatusUpdate } from "../../actions/userAction";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const UsersManagement = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { products, loading, error } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  const [users, setUsers] = useState([]);
  console.log(users);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  const rows = users?.map((item) => ({
    id: item._id,
    name: item.userName,
    email: item.email,
    status: !item.block ? "Active" : "Blocked",
  }));

  const handleUpdate = async (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to change status of User?"
    );
    if (confirmed) {
      const res = await userStatusUpdate(id);
      if (res.user) {
        setUsers(
          users.map((user) => (user._id === res.user._id ? res.user : user))
        );
      }
    }
  };

  useEffect(() => {
    if (!user?.isAdmin || !isAuthenticated) navigate("/");
  }, [dispatch]);

  useEffect(() => {
    async function getAllUsers() {
      const data = await getUsers();
      if (data.users) {
        setUsers(data.users);
      }
    }
    getAllUsers();
  }, []);

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Status",
      type: "string",
      flex: 1,
      renderCell: ({ row }) => (
        <Typography
          sx={{
            color:
              row.status === "Active"
                ? colors.greenAccent[400]
                : colors.redAccent[400],
            fontWeight: "bold",
          }}
        >
          {row.status}
        </Typography>
      ),
    },

    {
      field: "accessLevel",
      headerName: "Manage",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" gap="10px">
          <Button
            onClick={() => handleUpdate(row.id)}
            variant="contained"
            startIcon={
              row.status === "Active" ? (
                <BlockIcon />
              ) : (
                <CheckCircleOutlineIcon />
              )
            }
          >
            {row.status == "Active" ? "Block" : "Unblock"}
          </Button>
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
      <CategoryModal handleClose={handleClose} open={open} />
    </Box>
  );
};

export default UsersManagement;
