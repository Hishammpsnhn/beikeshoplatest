import React from "react";
import {
  FormControl,
  FormLabel,
  Radio,
  RadioGroup,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import Paper from "@mui/material/Paper";

function PaymentOptions({ onSelectPayment }) {
  return (
    <Paper
      elevation={5}
      sx={{ padding: "20px",  margin: "auto" }}
    >
      <FormControl>
        <FormLabel>Payment Options</FormLabel>
        <RadioGroup
          defaultValue="primary"
          name="radio-buttons-group"
          onChange={(e) => {
            onSelectPayment(e.target.value);
          }}
        >
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
          <FormControlLabel
            value="wallet"
            control={<Radio color="primary" />}
            label="Use Wallet"
          />
        </RadioGroup>

        {/* <>
          <FormLabel>Wallet</FormLabel>
          <FormControlLabel
            control={
              <Checkbox
                color="primary"
                checked={wallet}
                onChange={(e) => {
                  setWallet((prev)=>!prev);
                }}
              />
            }
            label="Apply Wallet"
          />
        </> */}
      </FormControl>
    </Paper>
  );
}

export default PaymentOptions;
