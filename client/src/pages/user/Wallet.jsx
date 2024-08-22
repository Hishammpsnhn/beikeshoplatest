import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Header1 from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import { getWallerInfo } from "../../actions/wallerActions";

function Wallet() {
  const [info, setInfo] = useState(null);
  useEffect(() => {
    const getWallet = async () => {
      const data = await getWallerInfo();
      console.log(data);
      setInfo(data);
    };
    getWallet();
  }, []);
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
            sx={{ padding: "20px", marginTop: "20px" }}
          >
            <Typography variant="h4" sx={{ marginBottom: "20px" }}>
              $ {info?.amount}
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
            <Typography variant="h6" padding="10px">
              History
            </Typography>
            {info?.history.map((item) => (
              <Box margin="10px">
                <Paper elevation={2} sx={{ padding: "20px" }}>
                  <Typography variant="body1" color="purple">
                    {" "}
                    ₹{item.amount}
                  </Typography>
                  <Typography
                    variant="body2"
                    color={item.transactionType === 'credit' ? "green" : "red"}
                  >
                    {item.transactionType}
                  </Typography>{" "}
                  <Typography variant="body2" color="gray">
                    {new Date(item.date).toLocaleDateString()}
                  </Typography>
                </Paper>
              </Box>
            ))}
          </Paper>
        </Box>
      </Container>
    </>
  );
}

export default Wallet;
