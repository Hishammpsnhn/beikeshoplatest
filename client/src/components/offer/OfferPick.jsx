import {
    Box,
    FormControl,
    InputLabel,
    Paper,
    Select,
    MenuItem,
    TextField,
    Button,
  } from "@mui/material";
  import React from "react";
  
  function OfferPick({handleSearch}) {
    const [offerType, setOfferType] = React.useState("");
    const [discount, setDiscount] = React.useState(null);
   
    const handleOfferChange = (event) => {
      setOfferType(event.target.value);
    };
  
    const handleDiscountChange = (event) => {
      setDiscount(event.target.value);
    };
  
    

    return (
      <Paper>
        <Box padding="20px">
          <FormControl fullWidth>
            <Box display="flex" gap="20px" alignItems="center">
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">Select Type</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={offerType}
                  label="Select Type"
                  onChange={handleOfferChange}
                  fullWidth
                >
                  <MenuItem value="product">Product</MenuItem>
                  <MenuItem value="category">Category</MenuItem>
                  <MenuItem value="refer">Refer</MenuItem>
                </Select>
              </FormControl>
  
              <TextField
                label="Discount in %"
                value={discount}
                type="number"
                onChange={handleDiscountChange}
                fullWidth
              />
  
             
  
              <Button
                variant="outlined"
                color="primary"
                onClick={()=>handleSearch(offerType,discount)}
                // sx={{ whiteSpace: "nowrap" }}
              >
                Search
              </Button>
            </Box>
          </FormControl>
        </Box>
      </Paper>
    );
  }
  
  export default OfferPick;
  