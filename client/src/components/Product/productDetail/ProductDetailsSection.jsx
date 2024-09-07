import React from "react";
import { Paper, Typography, Box } from "@mui/material";

function ProductDetailsSection() {
  return (
    <Paper elevation={6} sx={{ p: 2, mb: 2,margin:'16px' }}>
      <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2 }}>
        Product Details
      </Typography>
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Name: Banana Plug Men's Yellow Shirts
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Fabric:Cotton
        </Typography>
      </Box>
      <Box sx={{ mb: 1 }}>
        <Typography variant="body2" color="textSecondary">
          Net Quantity (N): 1
        </Typography>
      </Box>
      <Box>
        <Typography variant="body2" color="textSecondary">
          Sizes:
        </Typography>
        <Typography variant="body2" color="textSecondary">
          M (Chest Size: 40 in, Length Size: 29.5 in)
        </Typography>
        <Typography variant="body2" color="textSecondary">
          L (Chest Size: 42 in, Length Size: 30 in)
        </Typography>
        <Box sx={{ mb: 1 }}>
          <Typography variant="body2" color="textSecondary">
            Shirt, shirt, SHIRT, cotton shirt, plain shirt, casual shirt, formal
            shirt, party wear shirt, shirt for men, shirts, shirts for mens,
            office shirt, school shirt, full sleeve shirt, solid shirt Lemon
            shirt Look great while being at your comfortable best by donning
            this classy shirt. Club it with solid trousers, shoes and
            waistcoat.checks shirts for mens, check shirts for men. Country of
            Origin : India More Information
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
}

export default ProductDetailsSection;

// Name : Banana Plug Men's Yellow Shirts
// Fabric : Cotton
// Net Quantity (N) : 1
// Sizes :
// M (Chest Size : 40 in, Length Size: 29.5 in)
// L (Chest Size : 42 in, Length Size: 30 in)
//
// Shirt, shirt, SHIRT, cotton shirt, plain shirt, casual shirt, formal shirt, party wear shirt, shirt for men, shirts, shirts for mens, office shirt, school shirt, full sleeve shirt, solid shirt Lemon shirt Look great while being at your comfortable best by donning this classy shirt. Club it with solid trousers, shoes and waistcoat.checks shirts for mens, check shirts for men.
// Country of Origin : India
// More Information
