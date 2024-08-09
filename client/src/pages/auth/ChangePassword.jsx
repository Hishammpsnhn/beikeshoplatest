import React, { useEffect } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import logo from "../../public/images/1661417516766.webp";
import { useSelector } from "react-redux";

function ChangePassword() {
  const {isAuthenticated} = useSelector(
    (state) => state.auth
  );
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/login");
  };
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);
  return (
    <Box
      sx={{
        backgroundColor: "#E4D5E4",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "0px",
      }}
    >
      <Box sx={{ maxWidth: 400, width: "100%", p: 0 }}>
        <Card>
          <Box sx={{ marginBottom: 2 }}>
            <img src={logo} alt="Logo" style={{ width: "100%" }} />
          </Box>
          <CardContent>
            <Typography variant="h5" align="center" gutterBottom>
              Confirm Password
            </Typography>
            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="Password"
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="Confirm Password"
                  required
                />
              </Box>
              <Box>
                <Button
                  fullWidth
                  variant="contained"
                  color="primary"
                  type="submit"
                  sx={{ textTransform: "none" }}
                >
                  Confirm
                </Button>
              </Box>
            </form>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}

export default ChangePassword;
