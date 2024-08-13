import React, { useEffect, useState } from "react";
import InputBox from "../../components/InputBox";
import logo from "../../public/images/1661417516766.webp";
import {
  Box,
  Button,
  Card,
  CardContent,
  TextField,
  Typography,
  CircularProgress,
} from "@mui/material";
import { useNavigate, useLocation } from "react-router-dom";
import {
  verifyOtp,
  resendOtp,
  signUp,
  forgot_password_verifyOtp,
} from "../../actions/authActions";
import { ToastContainer, toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import "react-toastify/dist/ReactToastify.css";

function OtpPage() {
  const location = useLocation();
  const { data } = location.state || {};
  const { email, forgot } = location.state || {};

  const { isAuthenticated, loading, error } = useSelector(
    (state) => state.auth
  );

  const [otp, setOtp] = useState("");
  const [canResend, setCanResend] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(60);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      toast.error(`Error: ${error}`);
    }
  }, [error]);

  useEffect(() => {
    if (!canResend) {
      const interval = setInterval(() => {
        setTimeRemaining((prev) => {
          if (prev <= 1) {
            clearInterval(interval);
            setCanResend(true);
            return 60;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [canResend]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length === 4) {
      if (data) {
        dispatch(verifyOtp(parseInt(otp), data));
      } else {
        if (forgot) {
          const data = await dispatch(forgot_password_verifyOtp(parseInt(otp), email));
          if(data){
            navigate('/changePassword',{state:data.user})
          }
        }
      }
    } else {
      toast.info("Enter valid 4 digit OTP ");
    }
  };

  const handleResendOtp = async () => {
    if (canResend) {
      dispatch(signUp(data));
      setCanResend(false);
      setTimeRemaining(60);
      toast.success("OTP has been resent. Please check.");
    } else {
      toast.info("Please wait before resending the OTP.");
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#E4D5E4",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Card sx={{ maxWidth: 400, width: "100%", p: 0 }}>
        <Box sx={{ marginBottom: 2 }}>
          <img src={logo} alt="Logo" style={{ width: "100%" }} />
        </Box>
        <CardContent>
          <Typography variant="h5" align="center" gutterBottom>
            Enter OTP
          </Typography>
          <form onSubmit={handleSubmit}>
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              />
            </Box>
            <Box sx={{ mb: 2 }}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                type="submit"
                disabled={loading}
                sx={{ textTransform: "none" }}
              >
                {loading ? <CircularProgress size={24} /> : "Verify"}
              </Button>
            </Box>
            <Box>
              <Button
                fullWidth
                variant="outlined"
                color="secondary"
                onClick={handleResendOtp}
                disabled={!canResend || loading}
                sx={{ textTransform: "none" }}
              >
                {canResend ? "Resend OTP" : `Resend OTP in ${timeRemaining}s`}
              </Button>
            </Box>
          </form>
        </CardContent>
      </Card>
      <ToastContainer />
    </Box>
  );
}

export default OtpPage;
