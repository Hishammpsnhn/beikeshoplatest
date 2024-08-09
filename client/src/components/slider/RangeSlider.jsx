import React, { useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import Typography from "@mui/material/Typography";

function valuetext(value) {
  return `${value}°C`;
}

function RangeSlider() {
  const [value, setValue] = useState([20, 100]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%", padding: 2 }}>
      <Slider
        getAriaLabel={() => "Temperature range"}
        value={value}
        onChange={handleChange}
        valueLabelDisplay="auto"
        getAriaValueText={valuetext}
        sx={{
          color: "#461246", // Custom main color
          "& .MuiSlider-thumb": {
            backgroundColor: "#461246", // Custom thumb color
          },
          "& .MuiSlider-track": {
            backgroundColor: "#461246", // Custom track color
          },
          "& .MuiSlider-rail": {
            backgroundColor: "#b0bec5", // Custom rail color
          },
        }}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 1 }}>
        <Typography>From: {value[0]}°C</Typography>
        <Typography>To: {value[1]}°C</Typography>
      </Box>
    </Box>
  );
}

export default RangeSlider;
