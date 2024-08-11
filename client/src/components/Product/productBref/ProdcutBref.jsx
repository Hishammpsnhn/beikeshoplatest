import React, { useState } from "react";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import image from "../../../public/images/products/n0jzl_400.webp";

function ProdcutBref() {
  const [quantity, setQuantity] = useState(1); // Initialize the quantity state

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <Box>
      <Paper
      elevation={5}
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
          minWidth: "100%",
        }}
      >
        <Box display="flex" width="50%" justifyContent="space-evenly">
          <Box sx={{ width: "80px", height: "80px" }}>
            <img
              src={image}
              alt=""
              style={{ width: "100%", height: "100%", objectFit: "contain" }}
            />
          </Box>
          <Box>
            <Typography variant="body1">Mohammed Hisham</Typography>
            <Typography variant="body2">
              Address 2: 456 Elm St, City, State, Zip
            </Typography>
            <Typography variant="body2">
              Address 3: 789 Oak St, City, State, Zip
            </Typography>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            onClick={handleDecrement}
            sx={{ minWidth: "40px" }}
          >
            -
          </Button>
          <Typography variant="body1" sx={{ margin: "0 10px" }}>
            {quantity}
          </Typography>
          <Button
            variant="outlined"
            onClick={handleIncrement}
            sx={{ minWidth: "40px" }}
          >
            +
          </Button>
        </Box>
      </Paper>
    </Box>
  );
}

export default ProdcutBref;
