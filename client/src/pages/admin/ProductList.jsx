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
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import VisibilityIcon from "@mui/icons-material/Visibility";

const ProductList = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const { products, loading, error } = useSelector((state) => state.products);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    dispatch(getProductsList());
  }, [dispatch]);

  const rows = products.map((item) => ({
    id: item._id,
    name: item.name,
    category: item.category,
    stock: item.sizes[0].stock,
    discount: 0,
  }));

  const handleEdit = async (id) => {
    const data = await dispatch(oneProduct(id));
    navigate("/admin/product_management", { state: { product: data } });
  };

  const handleDelete = (id) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this item?"
    );
    if (confirmed) {
      dispatch(deleteProduct(id));
    }
  };
  useEffect(() => {
    if (!user?.isAdmin || !isAuthenticated) navigate("/");
  }, [dispatch]);

  const handleView = (id) => {
    console.log("View:", id);
  };

  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "category",
      headerName: "Category",
      flex: 1,
    },
    {
      field: "stock",
      headerName: "Total Stock",
      type: "number",
      flex: 1,
    },
    {
      field: "discount",
      headerName: "Discount",
      type: "number",
      flex: 1,
    },
    {
      field: "accessLevel",
      headerName: "Manage",
      flex: 1,
      renderCell: ({ row }) => (
        <Box display="flex" justifyContent="center" gap="10px">
          <EditIcon
            onClick={() => handleEdit(row.id)}
            style={{ cursor: "pointer", color: colors.greenAccent[600] }}
          />
          <DeleteIcon
            onClick={() => handleDelete(row.id)}
            style={{ cursor: "pointer", color: colors.redAccent[600] }}
          />
          <VisibilityIcon
            onClick={() => handleView(row.id)}
            style={{ cursor: "pointer", color: colors.blueAccent[600] }}
          />
        </Box>
      ),
    },
  ];

  return (
    <Box m="20px" width="100%">
      <Box display="flex" justifyContent="space-between">
        <Header title="PRODUCTS" subtitle="Managing The Products" />
        <Box display="flex" height="fit-content">
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpen}
            sx={{
              backgroundColor: "#461246",
              display: "flex",
              fontSize: "14px",
              fontWeight: "bold",
              padding: "10px 20px",
              marginRight: "10px",
            }}
          >
            Add Category
          </Button>
          <Button
            variant="contained"
            color="primary"
            sx={{
              backgroundColor: "#461246",
              display: "flex",
              fontSize: "14px",
              fontWeight: "bold",
            }}
          >
            Add Product
          </Button>
        </Box>
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

export default ProductList;
