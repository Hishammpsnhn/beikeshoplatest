import { Box, Container, Skeleton } from "@mui/material";
import React from "react";

function BrefSkeliton() {
  return (
    <Container>
    <Box display="flex"  width="100%">
      <Box margin="50px" width="50%">
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", margin: "5px" }}
          height={80}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", margin: "5px" }}
          height={80}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", margin: "5px" }}
          height={80}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", margin: "5px" }}
          height={80}
        />
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", margin: "5px" }}
          height={80}
        />
      </Box>
      <Box  margin="50px" width="50%">
        <Skeleton
          variant="rectangular"
          animation="wave"
          sx={{ width: "100%", margin: "5px" }}
          height={250}
        />
      </Box>
    </Box>
    </Container>
  );
}

export default BrefSkeliton;
