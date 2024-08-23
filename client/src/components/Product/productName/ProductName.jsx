import { Button, Paper, Typography } from "@mui/material";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import "./productName.css";

function ProductName({ name, price = 0, rating, selectedSize, offer = 0 }) {
  const actualPrice = selectedSize?.price || price;


  const discountedPrice = offer > 0 ? actualPrice - actualPrice * (offer / 100) : actualPrice;

  return (
    <Paper elevation={6} className="paper">
      <Typography variant="h4" className="text-muted">
        {name}
      </Typography>
      
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Typography variant="h5" className="price" sx={{ color: "primary.main", fontWeight: "bold", mr: 1 }}>
          $ {Math.floor(discountedPrice)}
        </Typography>
        
        {offer > 0 && (
          <Typography variant="h6" sx={{ textDecoration: "line-through", color: "grey" }}>
            $ {actualPrice}
          </Typography>
        )}
      </div>
      
      <Button
        variant="contained"
        className="bg-primary btn_border"
        endIcon={<StarIcon />}
        sx={{ position: 'inherit' }}
      >
        {rating}
      </Button>
      
      {selectedSize && (
        <Typography variant="body2" className="text-danger">
          {selectedSize.stock <= 0 && 'Out Of Stock'}
        </Typography>
      )}
    </Paper>
  );
}

export default ProductName;
