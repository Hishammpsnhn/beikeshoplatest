import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import Header1 from "../../components/header/Header1";
import Nav from "../../components/header/Nav";

function Wallet() {
  return (
    <>
      <Header1 />
      <Nav />
      <Container>
        <Box>
          <Typography variant="h5">My Wallet</Typography>
          <Paper
          square={false}
            elevation={24}
            sx={{ padding: "20px", height: "50vh", marginTop: "20px",}}
          >
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              $ 500
            </Typography>
            <Typography variant="h6" sx={{ marginBottom: "20px" }}>
              Add Amount
            </Typography>
            <Box display="flex" gap={2}>
              <Button
                variant="outlined"
                size="small"
                sx={{ borderRadius: "10%" }}
              >
                200
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ borderRadius: "10%" }}
              >
                500
              </Button>
              <Button
                variant="outlined"
                size="small"
                sx={{ borderRadius: "10%" }}
              >
                1000
              </Button>
            </Box>
            <Box marginTop="30px" gap={3} display="flex">
              <TextField
                type="number"
                placeholder="Enter Amount"
                size="small"
                sx={{ height: "40px" }}
              />
              <Button
                sx={{ paddingX: "20px", paddingY: "5px", height: "40px" }}
                type="button"
                variant="contained"
                size="small"
              >
                Add
              </Button>
            </Box>
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default Wallet;
