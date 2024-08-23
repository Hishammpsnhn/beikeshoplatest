import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import { applyProductOffer } from "../../actions/productActions";
import { toast } from "react-toastify";
import { applyOfferCategory } from "../../actions/categoryActions";
import { useDispatch } from "react-redux";
function ApplyOffer({ product, name, id, discount, offer }) {
  const dispatch = useDispatch();

  const handleApply = async () => {
    if (discount < 0 || !discount) {
      return toast.error("Enter valid discount");
    }
    if (product) {
      const data = await dispatch(applyProductOffer(id, discount));
      if (data) {
        toast.success("Offer applied successfully");
      }
    } else {
      const data = dispatch(applyOfferCategory(id, discount));
      if(data){
        toast.success("Offer applied successfully");
      }
    }
  };
  return (
    <Paper
      elevation={0}
      sx={{
        display: "flex",
        border: "1px solid grey",
        justifyContent: "space-between",
        padding: "20px",
        marginTop: "30px",
      }}
    >
      <Box width="50%">
        <Typography>{name}</Typography>
        <Typography>Price</Typography>
      </Box>
      {offer && (
        <Typography color="green">Current Discount: {offer} %</Typography>
      )}
      <Button size="small" variant="contained" onClick={handleApply}>
        Apply
      </Button>
    </Paper>
  );
}

export default ApplyOffer;
