import React, { useEffect, useState } from "react";
import {
  Button,
  CircularProgress,
  TextField,
  Box,
  Typography,
  Link,
  Paper,
  IconButton,
  InputAdornment,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import {
  forgotPasswordAction,
  googleAuth,
  login,
} from "../../actions/authActions";
import { useDispatch, useSelector } from "react-redux";
import {  toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./auth.scss";
import logo from "../../public/images/1661417516766.webp";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import validator from "validator";
import { initial } from "../../reducers/authReducers";
import Visibility from '@mui/icons-material/Visibility'
import VisibilityOff from '@mui/icons-material/VisibilityOff'

function Login({ forgotPassword, setForgotPassword}) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { user, isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const options = {
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1,
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (forgotPassword) {
      if (!validator.isEmail(email)) {
        toast.error("Enter a valid Email Address");
      }
      const res = await dispatch(forgotPasswordAction(email));
      if (res) {
        console.log(res);
        navigate("/otp", { state: { email, forgot: true } });
        dispatch(initial());
        setForgotPassword(false);
      }
    } else {
      if (validator.isEmail(email)) {
        if (validator.isStrongPassword(password, options)) {
          dispatch(login(email, password));
        } else {
          toast.error("Invalid credentials");
        }
      } else {
        toast.error("Enter valid email address");
      }
    }
  };

  const handleGoogleSuccess = async (response) => {
    console.log(response.credential);
    try {
      const { credential } = response;
      const userInfo = jwtDecode(credential);
      console.log(userInfo);
      const res = await dispatch(googleAuth(userInfo));
      if (res !== undefined) {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to fetch user info:", error);
      toast.error("Google login failed : Email already exist");
    }
  };
  const handleClickShowPassword = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword);
  };

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.isAdmin) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [isAuthenticated, navigate, user]);

  useEffect(() => {
    if (error) {
      toast.error(`Login failed! ${error}`);
    }
  }, [error]);

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        width: "100vw",
        backgroundColor: "#E4D5E4",
      }}
    >
      <Paper elevation={6}>
        <Box
          component="form"
          sx={{
            backgroundColor: "#fff",
            borderRadius: 1,
            textAlign: "center",
            maxWidth: "400px",
            width: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <Box sx={{ marginBottom: 2 }}>
            <img src={logo} alt="Logo" style={{ width: "100%" }} />
          </Box>
          <Typography
            variant="h4"
            component="h2"
            sx={{ marginBottom: 2, fontWeight: "bold" }}
          >
            {forgotPassword ? `Enter Email` : `Login`}
          </Typography>
          <Box sx={{ padding: 3 }}>
            {!forgotPassword ? (
              <>
                <TextField
                  fullWidth
                  type="email"
                  label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  margin="normal"
                />
                <TextField
                  fullWidth
                  type={`${showPassword ? "text" : "password"}`}
                  label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  margin="normal"
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
              </>
            ) : (
              <TextField
                fullWidth
                type="email"
                label="email"
                margin="normal"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
            )}
            {!forgotPassword && (
              <Typography>
                <Link
                  onClick={() => setForgotPassword(true)}
                  sx={{
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "none",
                    color: "inherit",
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Forgot Password
                </Link>
              </Typography>
            )}
            <Button
              variant="contained"
              color="secondary"
              type="submit"
              sx={{ marginY: 2, paddingX: 8 }}
            >
              {loading ? (
                <>
                  <CircularProgress
                    size={24}
                    color="inherit"
                    sx={{ marginRight: 2 }}
                  />
                  {forgotPassword ? `Sending OTP...` : `Logging in...`}
                </>
              ) : forgotPassword ? (
                `Send OTP`
              ) : (
                `LOGIN`
              )}
            </Button>
            {!forgotPassword && (
              <GoogleLogin
                size="large"
                theme="outline"
                onSuccess={handleGoogleSuccess}
                onError={() => {
                  console.log("Login Failed");
                  toast.error("Google login failed");
                }}
              />
            )}
            {!forgotPassword && (
              <Link href="/signup" underline="hover">
                Don't have Account? Sign up{" "}
              </Link>
            )}
          </Box>
        </Box>
      </Paper>
      {/* <ToastContainer /> */}
    </Box>
  );
}

export default Login;
