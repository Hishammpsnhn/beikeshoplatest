import React, { useState } from "react";
import {
  Avatar,
  Box,
  Container,
  TextField,
  Grid,
  Button,
  IconButton,
  Typography,
  Card,
  Paper,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import AddressDetails from "../../components/address/AddressDetails";
import AddIcon from "@mui/icons-material/Add";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import Nav from "../../components/header/Nav";
import Header1 from "../../components/header/Header1";

function Profile() {
  const [profile, setProfile] = useState({
    userName: "",
    email: "",
    phoneNumber: "",
  });

  const [isEditing, setIsEditing] = useState({
    userName: false,
    email: false,
    phoneNumber: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };

  const handleEdit = (field) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: true,
    }));
  };

  const handleSave = (field) => {
    setIsEditing((prevEditing) => ({
      ...prevEditing,
      [field]: false,
    }));
    // Add save logic here if needed
  };

  const handleChangePassword = () => {
    console.log("Change Password clicked");
  };

  const handleLogout = () => {
    console.log("Logout clicked");
  };

  return (
    <>
    <Header1/>
    <Nav/>
      <Container>
        <Card
          sx={{
            marginTop: "20px",
            padding: "20px",
            boxShadow: 5,
            borderRadius: 3,
          }}
        >
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Box position="relative">
              <Avatar
                sx={{
                  width: "10vw",
                  height: "20vh",
                  fontSize: "3rem",
                  bgcolor: "primary.main",
                }}
              >
                H
              </Avatar>
              <IconButton
                color="primary"
                aria-label="change profile"
                component="span"
                sx={{
                  position: "absolute",
                  bottom: 0,
                  right: 0,
                  border: "1px solid grey",
                  bgcolor: "white",
                  "&:hover": {
                    bgcolor: "lightgrey",
                  },
                }}
                onClick={handleEdit}
              >
                <EditIcon />
              </IconButton>
            </Box>
            <Box sx={{ width: "70%" }}>
              <Grid container spacing={2}>
                {["username", "email", "phoneNumber"].map((field) => (
                  <Grid
                    item
                    xs={field === "firstName" || field === "lastName" ? 6 : 12}
                    key={field}
                  >
                    <TextField
                      fullWidth
                      variant="outlined"
                      label={
                        field.charAt(0).toUpperCase() +
                        field.slice(1).replace(/([A-Z])/g, " $1")
                      }
                      name={field}
                      value={profile[field]}
                      onChange={handleInputChange}
                      disabled={!isEditing[field]}
                      sx={{ marginBottom: "15px" }}
                      InputProps={{
                        endAdornment: (
                          <IconButton
                            onClick={() =>
                              isEditing[field]
                                ? handleSave(field)
                                : handleEdit(field)
                            }
                            edge="end"
                          >
                            {isEditing[field] ? <SaveIcon /> : <EditIcon />}
                          </IconButton>
                        ),
                      }}
                    />
                  </Grid>
                ))}
                <Grid item xs={12}>
                  <Box display="flex" justifyContent="space-between" mt={2}>
                    <Button
                      variant="outlined"
                      color="secondary"
                      onClick={handleChangePassword}
                    >
                      Change Password
                    </Button>
                    <Button
                      variant="contained"
                      color="error"
                      onClick={handleLogout}
                    >
                      Logout
                    </Button>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Card>

        <Typography
          variant="h4"
          sx={{ fontWeight: "medium", marginTop: "30px" }}
        >
          Address
        </Typography>
        <Box marginY="10px">
          <AddressDetails />
          <AddressDetails />
          <Button
            variant="outlined"
            sx={{ width: "100%", marginY: "10px" }}
            endIcon={<AddIcon />}
          >
            Add Address
          </Button>
        </Box>

        <Typography
          variant="h4"
          sx={{ fontWeight: "medium", marginTop: "30px" }}
        >
          My Orders
        </Typography>
        <Paper
          elevation={0}
          sx={{
            maxHeight: "300px",
            overflowX: "auto",
            padding: "25px",
            marginTop: "10px",
            // Hide scrollbar
            "::-webkit-scrollbar": {
              display: "none",
            },
            "-ms-overflow-style": "none", // Internet Explorer 10+
            "scrollbar-width": "none", // Firefox
          }}
        >
          <ProdcutBref />
          <ProdcutBref />
          <ProdcutBref />
          <ProdcutBref />
          <ProdcutBref />
          <ProdcutBref />
          <ProdcutBref />
        </Paper>
      </Container>
    </>
  );
}

export default Profile;
