import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardContent,
  Grid,
  TextField,
  Box,
  CircularProgress,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import validator from "validator";
import { signUp } from "../../actions/authActions";
import { validation } from "../../utils/utils";

function SignupPage() {
  const userData = {
    userName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
    referralCode: "",
  };
  
  const [data, setData] = useState(userData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector((state) => state.auth);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const options = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword((prev) => !prev);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const msg = validation(data);
    if (msg) {
      return toast.error(msg);
    }

    if (!validator.isStrongPassword(data.password, options)) {
      let errorMessage = `Password must be at least ${options.minLength} characters long, `;
      errorMessage += `contain at least ${options.minLowercase} lowercase letter(s), `;
      errorMessage += `${options.minUppercase} uppercase letter(s), `;
      errorMessage += `${options.minNumbers} number(s), `;
      errorMessage += `and ${options.minSymbols} special character(s).`;

      return toast.error(errorMessage);
    }

    if (!validator.equals(data.password, data.confirmPassword)) {
      return toast.error("Password does not match the confirm password.");
    }

    try {
      const res = await dispatch(signUp(data));
      if (res) {
        navigate("/otp", { state: { data } });
      }
    } catch (err) {
      handleSignupError(err);
    }
  };

  const handleSignupError = (err) => {
    toast.error(`Signup failed! ${err.message}`);
  };

  useEffect(() => {
    if (error) {
      toast.error(`Signup failed! ${error}`);
    }
  }, [error]);

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
        alignItems: "center",
        justifyContent: "center",
        padding: "0 20px",
      }}
    >
      <Grid container justifyContent="center">
        <Grid item xs={12} md={8} lg={6}>
          <Card elevation={10} sx={{ borderRadius: 3 }}>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <Typography variant="h4" align="center" gutterBottom>
                  Welcome to BeikeShop
                </Typography>
                <Typography variant="subtitle1" align="center" gutterBottom>
                  Create your account
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 2,
                  }}
                >
                  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Username"
                      name="userName"
                      value={data.userName}
                      onChange={handleChange}
                      required
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Email"
                      name="email"
                      value={data.email}
                      onChange={handleChange}
                      required
                    />
                  </Box>
                  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Date of Birth"
                      type="date"
                      name="dob"
                      value={data.dob}
                      onChange={handleChange}
                      required
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Phone Number"
                      name="phoneNumber"
                      value={data.phoneNumber}
                      onChange={handleChange}
                      required
                    />
                  </Box>
                  <Box sx={{ display: "flex", width: "100%", gap: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Password"
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
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
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Confirm Password"
                      type={showConfirmPassword ? "text" : "password"}
                      name="confirmPassword"
                      value={data.confirmPassword}
                      onChange={handleChange}
                      required
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowConfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                  <TextField
                    fullWidth
                    margin="normal"
                    variant="outlined"
                    label="Referral Code (Optional)"
                    name="referralCode"
                    value={data.referralCode}
                    onChange={handleChange}
                  />
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginTop: 2, marginBottom: 2, fontWeight: 'bold', padding: '10px' }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} sx={{ marginRight: 2 }} />
                        Signing Up...
                      </>
                    ) : (
                      "SIGN UP"
                    )}
                  </Button>
                  <Divider sx={{ width: "100%", marginY: 2 }} />
                  <Link href="/login" variant="body2">
                    Already have an account? Log in
                  </Link>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default SignupPage;
