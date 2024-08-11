import React from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

function ApplyCoupon() {
  return (
    <Paper 
      elevation={3} 
      sx={{  padding: '20px', maxWidth: '300px', marginX: 'auto' ,display:'flex',gap:'10px',marginY:'10px' }}
    >
      <TextField 
        size="small" 
        placeholder="Enter your coupon code" 
        variant="outlined" 
        fullWidth 
      />
      <Button 
        variant="contained" 
        color="primary" 
        sx={{ whiteSpace: "nowrap", padding: "8px 16px" }}
      >
        Apply
      </Button>
    </Paper>
  );
}

export default ApplyCoupon;
