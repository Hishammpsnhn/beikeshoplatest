import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import logo from "../../public/images/1661417516766.webp";
import { useDispatch, useSelector } from "react-redux";
import { change_password } from "../../actions/authActions";
import { toast, ToastContainer } from "react-toastify";
import validator from "validator";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function ChangePassword() {
  const location = useLocation();
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const data = location.state || {};
  console.log(data);
  const options = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!validator.isStrongPassword(password, options)) {
      let errorMessage = `Password must be at least ${options.minLength} characters long, `;
      errorMessage += `contain at least ${options.minLowercase} lowercase letter(s), `;
      errorMessage += `${options.minUppercase} uppercase letter(s), `;
      errorMessage += `${options.minNumbers} number(s), `;
      errorMessage += `and ${options.minSymbols} special character(s).`;

      return toast.error(errorMessage);
    }
    if (!validator.equals(password, confirmPassword)) {
      return toast.error("Password not equal to confirm password");
    }
    dispatch(change_password(data._id, password));
    navigate("/login");
  };
  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };
  const handleClickShowconfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
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
                  type={`${showPassword ? "text" : "password"}`}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box sx={{ mb: 2 }}>
                <TextField
                  fullWidth
                  variant="outlined"
                  type={`${showConfirmPassword ? "text" : "password"}`}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowconfirmPassword}
                          edge="end"
                        >
                          {showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
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
      {/* <ToastContainer /> */}
    </Box>
  );
}

export default ChangePassword;
