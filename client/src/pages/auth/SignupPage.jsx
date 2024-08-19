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
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import googleImg from "../../public/images/google.png";
import { googleAuth, signUp } from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import validator from "validator";
import { isValidUsername, validation } from "../../utils/utils";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

function SignupPage() {
  const userData = {
    userName: "",
    email: "",
    dob: "",
    phoneNumber: "",
    password: "",
    confirmPassword: "",
  };
  const [data, setData] = useState(userData);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

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
  const handleClickShowconfirmPassword = () => {
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
      return toast.error("password is not match confirm password");
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
  // const handleGoogle = useGoogleLogin({
  //   onSuccess: async (tokenResponse) => {
  //     console.log("Google login response:", tokenResponse);

  //     try {
  //       const { access_token } = tokenResponse;
  //       if (!access_token) {
  //         throw new Error("Access token not found in the response");
  //       }
  //       const userInfoResponse = await axios.get(
  //         "https://www.googleapis.com/oauth2/v2/userinfo",
  //         {
  //           headers: {
  //             Authorization: `Bearer ${access_token}`,
  //           },
  //         }
  //       );

  //       const userInfo = userInfoResponse.data;
  //       console.log("User Info:", userInfo);
  //       dispatch(googleAuth(userInfo.email, userInfo.name));

  //       // Dispatch login action and navigate
  //       // dispatch(login(userInfo));
  //       // navigate('/');
  //     } catch (error) {
  //       console.error("Failed to fetch user info:", error);
  //       toast.error("Google login failed");
  //     }
  //   },
  //   onError: (error) => {
  //     console.error("Google login error:", error);
  //     toast.error("Google login failed");
  //   },
  // });
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
        backgroundColor: "secondary.main",
        minHeight: "100vh",
        display: "flex",
        // alignItems: "center",
        // justifyContent: "center",
      }}
    >
      <Grid container justifyContent="end">
        <Grid item xs={12} md={10} lg={10}>
          <Card sx={{ height: "100vh" }}>
            <CardContent>
              <form onSubmit={handleSubmit} noValidate>
                <Typography variant="h3" align="center" gutterBottom>
                  BeikeShop
                </Typography>
                <Typography variant="h5" align="center" gutterBottom>
                  SIGN UP
                </Typography>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                >
                  <Box sx={{ display: "flex", width: "100%", marginBottom: 2 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Username"
                      name="userName"
                      value={data.userName}
                      onChange={handleChange}
                      required
                      sx={{ marginRight: 1 }}
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
                      sx={{ marginLeft: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", width: "100%", marginBottom: 2 }}>
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
                      sx={{ marginRight: 1 }}
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
                      sx={{ marginLeft: 1 }}
                    />
                  </Box>
                  <Box sx={{ display: "flex", width: "100%", marginBottom: 4 }}>
                    <TextField
                      fullWidth
                      margin="normal"
                      variant="outlined"
                      label="Password"
                      type={`${showPassword ? "text" : "password"}`}
                      name="password"
                      value={data.password}
                      onChange={handleChange}
                      required
                      sx={{ marginRight: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
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
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      name="confirmPassword"
                      value={data.confirmPassword}
                      onChange={handleChange}
                      required
                      sx={{ marginLeft: 1 }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowconfirmPassword}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                      
                    />
                  </Box>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    type="submit"
                    sx={{ marginBottom: 2 }}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <CircularProgress size={24} sx={{ marginRight: 2 }} />
                        Loading...
                      </>
                    ) : (
                      "SIGN UP"
                    )}
                  </Button>
                  {/* <Button
                    fullWidth
                    variant="outlined"
                    onClick={handleGoogle}
                    sx={{
                      marginTop: 2,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                    startIcon={
                      <img
                        src={googleImg}
                        alt="Google"
                        style={{ width: "24px" }}
                      />
                    }
                    type="button"
                  >
                    GOOGLE
                  </Button> */}

                  <Link href="/login">Already have Account? login</Link>
                </Box>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      {/* <ToastContainer /> */}
    </Box>
  );
}

export default SignupPage;
