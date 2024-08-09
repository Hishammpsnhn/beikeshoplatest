import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import "./productName.css";

function ProductName({ name, price, rating, selectedSize }) {
  return (
    <Paper elevation={6} className="paper">
      <Typography variant="h4" className="text-muted">
        {name}
      </Typography>
      <Typography variant="h5" className="price">
        $ {selectedSize ? selectedSize.price : price}
      </Typography>
      <Button
        variant="contained"
        className="bg-primary btn_border"
        endIcon={<StarIcon />}
        sx={{position:'inherit',}}
      >
        {rating}
      </Button>
      {selectedSize && (
        <Typography variant="body2" className="text-danger">
          {selectedSize.stock <=0 && 'Out Of Stock'}
        </Typography>
      )}
    </Paper>
  );
}

export default ProductName;
