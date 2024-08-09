import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  TextField,
} from "@mui/material";
import React, { useEffect, useState } from "react";

function SizeModal({ open, handleClose, selectedSize, onSave, sizes }) {
  const [stock, setStock] = useState("");
  const [price, setPrice] = useState("");

  console.log(sizes);

  const handleStockChange = (e) => {
    setStock(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  const handleSave = () => {
    // Perform save action with stock and price values
    const productDetails = {
      size: selectedSize,
      stock: parseInt(stock),
      price: parseInt(price),
    };
    onSave(productDetails);
    handleClose();
  };
  useEffect(() => {
    const sizeData = sizes.find((item) => item.size === selectedSize);
    if (sizeData) {
      setStock(sizeData.stock);
      setPrice(sizeData.price);
    } else {
      setStock("");
      setPrice("");
    }
  }, [selectedSize, sizes]);
  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Selected Size</DialogTitle>
      <DialogContent>
        <DialogContentText>
          You have selected the size: {selectedSize}
        </DialogContentText>
        <TextField
          label="Stock"
          variant="outlined"
          fullWidth
          value={stock}
          onChange={handleStockChange}
          sx={{ marginTop: "20px" }}
        />
        <TextField
          label="Price"
          variant="outlined"
          fullWidth
          type="number"
          value={price}
          onChange={handlePriceChange}
          sx={{ marginTop: "20px" }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">
          Close
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default SizeModal;
