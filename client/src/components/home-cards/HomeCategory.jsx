import React from "react";
import { Container, Grid, Box } from "@mui/material";
import one from "../../public/images/shoping_category/1f2ab0ea-e6a3-4efe-b248-cbec95a900161559216808913-Men-category-cards_04_jeans.jpg";
import two from "../../public/images/shoping_category/2a0ce60a-4d10-4e61-8c0a-f59f377213d51559216916390-women-category-cards_05_jeans.jpg";
import three from "../../public/images/shoping_category/3c637a0a-0cda-45a7-8ce8-5bb212d4b6411559216808935-Men-category-cards_02_shirts.jpg";
import four from "../../public/images/shoping_category/3fd040fc-431d-4060-9469-f0c11b7329121559216916380-women-category-cards_06_tshirts.jpg";
import five from "../../public/images/shoping_category/b2d6cb61-2796-46ba-b813-bf723c8fc27e1559216808945-Men-category-cards_01_tshirts.jpg";
import six from "../../public/images/shoping_category/f8262050-fe52-4390-98b8-21c634e09bae1559216808891-Men-category-cards_06_trousers.jpg";
import { useNavigate } from "react-router-dom";
import { getProductByCategory } from "../../actions/categoryActions";
import { useDispatch } from "react-redux";

function HomeCategory() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <Container>
      {/* <Grid container spacing={2}>
        <Grid item xs={2}>
          <Box
            component="img"
            src={one}
            alt="Category 1"
            sx={{ width: '80%', display: 'block', margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={2}>
          <Box
            component="img"
            src={two}
            alt="Category 2"
            sx={{ width: '100%', display: 'block', margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={2}>
          <Box
            component="img"
            src={three}
            alt="Category 3"
            sx={{ width: '100%', display: 'block', margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={2}>
          <Box
            component="img"
            src={four}
            alt="Category 4"
            sx={{ width: '100%', display: 'block', margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={2}>
          <Box
            component="img"
            src={five}
            alt="Category 5"
            sx={{ width: '100%', display: 'block', margin: 'auto' }}
          />
        </Grid>
        <Grid item xs={2}>
          <Box
            component="img"
            src={six}
            alt="Category 6"
            sx={{ width: '100%', display: 'block', margin: 'auto' }}
          />
        </Grid>
      </Grid> */}
      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        <Grid item xs={2} sm={4} md={4}>
          <Box
            component="img"
            loading="lazy"
            src={one}
            alt="Category 6"
            sx={{ width: "80%", display: "block", margin: "auto" ,cursor: 'pointer'}}
            onClick={() => {
              //dispatch(getProductByCategory(12));
              navigate("/products");
            }}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            loading="lazy"
            component="img"
            src={two}
            alt="Category 6"
            sx={{ width: "80%", display: "block", margin: "auto" }}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            component="img"
            loading="lazy"
            src={three}
            alt="Category 6"
            sx={{ width: "80%", display: "block", margin: "auto" }}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            component="img"
            loading="lazy"
            src={four}
            alt="Category 6"
            sx={{ width: "80%", display: "block", margin: "auto" }}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            component="img"
            loading="lazy"
            src={five}
            alt="Category 6"
            sx={{ width: "80%", display: "block", margin: "auto" }}
          />
        </Grid>
        <Grid item xs={2} sm={4} md={4}>
          <Box
            component="img"
            loading="lazy"
            src={six}
            alt="Category 6"
            sx={{ width: "80%", display: "block", margin: "auto" }}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default HomeCategory;
