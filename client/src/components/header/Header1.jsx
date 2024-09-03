import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
function Header1() {
  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{ bgcolor: "#E4D5E4" }}
    >
      <Box display="flex" alignItems="center">
        <Typography variant="body1" sx={{ mx: 2, fontSize: "1rem" }}>
          ₹IND
        </Typography>
        <Typography variant="body1" sx={{ fontSize: "1rem" }}>
          English
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" sx={{ mx: 2, fontSize: "1rem" }}>
          956754484
        </Typography>
      </Box>
    </Box>
  );
}

export default Header1;
