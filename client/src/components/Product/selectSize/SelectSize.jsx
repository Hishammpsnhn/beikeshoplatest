import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import "../productName/productName.css";
const allSizes = ["XS", "S", "M", "L", "XXL"];
function SelectSize({sizes,setSelectedSize}) {
  return (
    <Paper elevation={6} sx={{ p: 2, marginY: 3, width: "100%" }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Select Size
      </Typography>
      <Box display='flex' justifyContent={'space-evenly'}>
      {allSizes.map((size) => {
          const sizeInfo = sizes?.find(item => item.size === size);
          return (
            <Button
              key={size}
              variant="outlined"
              sx={{ borderRadius: "100px", marginX: "5px" }}
              color="primary"
              onClick={()=>setSelectedSize(sizeInfo)}
              disabled={!sizeInfo || sizeInfo.stock <= 0}
            >
              {size}
            </Button>
          );
        })}
      </Box>
    </Paper>
  );
}

export default SelectSize;
