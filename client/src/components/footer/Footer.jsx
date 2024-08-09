import React from "react";
import { Box, Container, Divider, Typography, List, ListItem, Grid } from "@mui/material";

function Footer() {
  return (
    <Box component="footer" sx={{ backgroundColor: 'primary.main', color: 'common.white', py: 5 }}>
      <Container>
        <Grid container spacing={2} justifyContent="space-evenly">
          <Grid item xs={12} md={2}>
            <Typography variant="h6">Beike Shop</Typography>
            <List>
              <ListItem>Who We Are</ListItem>
              <ListItem>Join Our Team</ListItem>
              <ListItem>Terms & Condition</ListItem>
              <ListItem>We Respect Your Privacy</ListItem>
              <ListItem>Fees & Payments</ListItem>
              <ListItem>Return & Refund</ListItem>
              <ListItem>Policy</ListItem>
              <ListItem>Promotion Terms & Conditions</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={2}>
            <Typography variant="h6">Follow Us</Typography>
            <List>
              <ListItem>Instagram</ListItem>
              <ListItem>Facebook</ListItem>
              <ListItem>Whatsapp</ListItem>
            </List>
          </Grid>
          <Grid item xs={12} md={3} display="flex" alignItems="flex-start">
            <Typography variant="h3" fontWeight="bold">
              Beike Shop
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default Footer;
