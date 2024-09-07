import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  addCategory,
  deleteCategories,
  getCategories,
} from "../../../actions/categoryActions";
import { useDispatch, useSelector } from "react-redux";

function CategoryModal({ open, handleClose }) {
  const { categories,loading } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSave = async () => {
    dispatch(addCategory(name, description));
    setName("");
    setDescription("");
  };
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          padding: "20px",
          borderRadius: "10px",
        },
      }}
    >
      <DialogTitle>
        <Typography variant="h5" component="div" gutterBottom>
          Add Category
        </Typography>
      </DialogTitle>
      <DialogContent>
        <Box
          sx={{ padding: "20px" }}
          display="flex"
          flexDirection="column"
          gap="20px"
        >
          <TextField
            id="category-name"
            label="Category Name"
            variant="outlined"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            required
          />
          <TextField
            id="category-description"
            label="Description"
            variant="outlined"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            multiline
            rows={4}
            fullWidth
          />
        </Box>
      </DialogContent>
      <DialogActions sx={{ justifyContent: "space-between", padding: "20px" }}>
        <Button
          onClick={handleClose}
          color="secondary"
          variant="outlined"
          sx={{ borderRadius: "20px" }}
        >
          Cancel
        </Button>
        <Button
          onClick={handleSave}
          color="primary"
          variant="contained"
          sx={{ borderRadius: "20px" }}
          disabled={loading}
        >
          Save
        </Button>
      </DialogActions>
      <Box>
        {loading ? (
          <CircularProgress size={20} />
        ) : (
          <>
            {categories.map(({ category, _id }) => (
              <Chip
                key={_id}
                label={category}
                variant="outlined"
                sx={{ marginRight: "5px" }}
                onDelete={() => {
                  const confirmed = window.confirm(
                    "Are you sure you want to delete this item?"
                  );
                  if (confirmed) dispatch(deleteCategories(_id));
                }}
              />
            ))}
          </>
        )}
      </Box>
    </Dialog>
  );
}

export default CategoryModal;
