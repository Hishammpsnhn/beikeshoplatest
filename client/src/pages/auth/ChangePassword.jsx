import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/images/1661417516766.webp";
import { useDispatch, useSelector } from "react-redux";
import { change_password } from "../../actions/authActions";
import { toast, ToastContainer } from "react-toastify";

function ChangePassword() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const data = location.state || {};
  console.log(data);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (password === confirmPassword) {
      dispatch(change_password(data._id,password));
    } else {
      toast.error("password not equal to confirm password");
    }
    //navigate("/login");
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
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
      <ToastContainer />
    </Box>
  );
}

export default ChangePassword;
