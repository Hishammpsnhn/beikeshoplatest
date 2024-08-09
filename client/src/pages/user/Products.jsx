import React from "react";
import SidebarProducts from "../../components/sidebar/SidebarProducts";
import RangeSlider from "../../components/slider/RangeSlider";
import ProductCard from "../../components/card/ProductCard";
import { Box, Grid, Skeleton, useMediaQuery, useTheme } from "@mui/material";
import { useSelector } from "react-redux";
import Nav from "../../components/header/Nav";
import Header from "../../components/header/Header1";

function Products() {
  const theme = useTheme();
  const isPhone = useMediaQuery(theme.breakpoints.down("sm"));
  const isTablet = useMediaQuery(theme.breakpoints.between("sm", "md"));
  const isLargeScreen = useMediaQuery(theme.breakpoints.up("md"));
  const { products, loading, error } = useSelector((state) => state.products);

  let sidebarWidth;
  if (isTablet) {
    sidebarWidth = 250;
  } else if (isLargeScreen) {
    sidebarWidth = 350;
  }

  return (
    <>
      <Header />
      <Nav />

      <Box sx={{ display: "flex" }}>
        {!isPhone && (
          <Box sx={{ flex: `0 0 ${sidebarWidth}px`, padding: 2 }}>
            <SidebarProducts />
          </Box>
        )}
        <Box sx={{ flex: 1, padding: 2 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            {loading ? (
            <>
            {Array.from({ length: 6 }).map((_, index) => (
              <Grid item xs={2} sm={4} md={4} key={index}>
                <Skeleton
                  variant="rectangular"
                  animation="wave"
                  width={300}
                  height={250}
                />
                <Skeleton
                  variant="text"
                  sx={{ fontSize: '1rem' }}
                  width={300}
                />
              </Grid>
            ))}
          </>
            ) : (
              <>
                {products.map((item, index) => (
                  <Grid item xs={2} sm={4} md={4} key={index}>
                    <ProductCard
                      image={item.images[0]}
                      name={item.name}
                      price={item.sizes[0].price}
                      id={item._id}
                    />
                  </Grid>
                ))}
              </>
            )}
          </Grid>
        </Box>
      </Box>
    </>
  );
}

export default Products;
