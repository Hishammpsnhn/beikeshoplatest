import React from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
} from "@mui/material";
import Paper from "@mui/material/Paper";

function PaymentOptions() {
  return (
    <Paper elevation={5}  sx={{ padding: '20px', maxWidth: '300px', margin: 'auto' }}>
      <FormControl>
        <FormLabel>Payment Options</FormLabel>
        <RadioGroup defaultValue="primary" name="radio-buttons-group">
          <FormControlLabel
            value="cod"
            control={<Radio color="primary" />}
            label="COD"
          />
          <FormControlLabel
            value="online payment"
            control={<Radio color="primary" />}
            label="Online Payment"
          />
        </RadioGroup>
        <RadioGroup defaultValue="primary" name="radio-buttons-group">
          <FormLabel>Wallet</FormLabel>
          <FormControlLabel
            value="Apply Wallet"
            control={<Radio color="primary" />}
            label="Apply Wallet"
          />
        </RadioGroup>
      </FormControl>
    </Paper>
  );
}

export default PaymentOptions;
