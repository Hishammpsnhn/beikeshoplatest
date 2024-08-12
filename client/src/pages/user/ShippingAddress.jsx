import React, { useState } from "react";
import {
  TextField,
  Button,
  Grid,
  Container,
  Typography,
  Paper,
  Box,
} from "@mui/material";
import Nav from "../../components/header/Nav";
import Header1 from "../../components/header/Header1";
import { useDispatch, useSelector } from "react-redux";
import {
  addShippingAddress,
  EditShippingAddress,
} from "../../actions/userAction";
import { toast, ToastContainer } from "react-toastify";
import { useLocation, useNavigate } from "react-router-dom";

function ShippingAddress() {
  const { loading, error, user } = useSelector((state) => state.auth);
  const location = useLocation();
  const address = location.state;
  console.log(address);
  const initialState = {
    fullName: "",
    city: "",
    state: "",
    landmark: "",
    pinCode: "",
    phoneNumber: "",
  };
  const [formData, setFormData] = useState(address ? address : initialState);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("Form Data:", formData);

    if (address) {
      const res = await dispatch(
        EditShippingAddress(user._id, address._id, formData)
      );
      if (!res) {
        toast.success("Addresses Edited successfully");
        navigate("/profile");
      } else {
        toast.error("something went wrong");
      }
    } else {
      const res = await dispatch(addShippingAddress(formData));
      if (!res) {
        toast.success("Addresses added successfully");
      } else {
        toast.error("something went wrong");
      }
    }
  };

  return (
    <>
      <Header1 />
      <Nav />
      <Container>
        <Paper
          elevation={5}
          sx={{
            padding: "20px",
            maxWidth: "400px",
            marginX: "auto",
            marginTop: "20px",
          }}
        >
          <form onSubmit={handleSubmit}>
            <Box marginY="10px">
              <Typography variant="h4">Shipping Address</Typography>
              <Typography variant="body2" color="gray">
                We ship within 2 working days
              </Typography>
            </Box>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Full Name"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="State"
                  name="state"
                  value={formData.state}
                  onChange={handleChange}
                  variant="outlined"
                  required
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Landmark"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Pincode"
                  name="pinCode"
                  value={formData.pinCode}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  type="number"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  variant="outlined"
                  required
                  type="tel"
                />
              </Grid>
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  disabled={loading}
                  color="primary"
                  sx={{ width: "100%" }}
                >
                  {loading ? "loading..." : "Submit"}
                </Button>
              </Grid>
            </Grid>
          </form>
          <ToastContainer />
        </Paper>
      </Container>
    </>
  );
}

export default ShippingAddress;
