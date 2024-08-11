import { Box, Button, Paper, Typography } from "@mui/material";
import React from "react";
import EditBtn from "@mui/icons-material/Edit";
import DeleteBtn from "@mui/icons-material/Delete";

function AddressDetails({ cart }) {
  return (
    <Box sx={{ marginY: '10px' }}>
      <Paper
        elevation={2}
        sx={{
          padding: "10px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Box>
          <Typography variant="body1">Mohammed Hisham</Typography>
          <Typography variant="body2">
            Address 2: 456 Elm St, City, State, Zip
          </Typography>
          <Typography variant="body2">
            Address 3: 789 Oak St, City, State, Zip
          </Typography>
        </Box>
        <Box display="flex" alignItems="center">
          {cart ? (
            <>
              <Button variant="outlined" sx={{ width: "100px" }}>
                Change
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                sx={{ width: "100px", marginRight: "10px" }}
                startIcon={<EditBtn sx={{ color: "#902F90" }} />} 
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                sx={{ width: "100px" }}
                startIcon={<DeleteBtn sx={{ color: "#902F90" }} />} 
              >
                Delete
              </Button>
            </>
          )}
        </Box>
      </Paper>
    </Box>
  );
}

export default AddressDetails;
