import { Box, Button, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gif from "../../public/tick.png";

function Success() {
  const navigate = useNavigate();
  const location = useLocation();
  const { state } = location;

  useEffect(() => {
    if (!state) {
      navigate("/");
    }
  }, [state, navigate]);

  if (!state) {
    return null;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          width: "20%",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
        }}
      >
        <img
          style={{ width: "50px", objectFit: "contain", margin: "auto" }}
          src={gif}
          alt="Success"
        />
        <Typography>Your Order Successfully Placed</Typography>
        <Typography>Thank You</Typography>
        <Button variant="contained" onClick={() => navigate("/")}>
          HOME
        </Button>
      </Box>
    </Box>
  );
}

export default Success;
