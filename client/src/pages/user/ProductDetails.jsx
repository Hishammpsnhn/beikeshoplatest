import React, { useEffect, useState } from "react";
import ProductName from "../../components/Product/productName/ProductName";
import ProductDetailsSection from "../../components/Product/productDetail/ProductDetailsSection";
import SelectSize from "../../components/Product/selectSize/SelectSize";
import { Box, Button, Container, Grid, useMediaQuery } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { oneProduct } from "../../actions/productActions";
import Header1 from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { toast } from "react-toastify";
import InnerImageZoom from "react-inner-image-zoom";
import "react-inner-image-zoom/lib/InnerImageZoom/styles.css";

import { addCart } from "../../actions/cartActions";

const BASE_URL = "https://app.beikeshop.shop/";

function ProductDetails() {
  const { product, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [selectedSize, setSelectedSize] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isMobile = useMediaQuery((theme) => theme.breakpoints.down("sm"));

  const handleCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (selectedSize === null) {
      toast.error("Select a size");
      return;
    }
    const data = dispatch(addCart(user._id, product._id, selectedSize));
    if (data) navigate("/cart");
  };

  useEffect(() => {
    if (!product?._id || product?._id !== id) {
      dispatch(oneProduct(id));
    }
  }, [dispatch, id, product]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Header1 />
      <Nav />
      <Container maxWidth="lg" sx={{ marginTop: "22px" }}>
        <Grid container spacing={2}>
          {/* Left Grid - Images and Buttons */}
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" }, // Stack vertically on small screens, row on larger screens
                justifyContent: "space-between",
                gap: { xs: "10px", md: "0" }, // Add gap between boxes on small screens
              }}
            >
              {/* Product Thumbnails */}
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "row", md: "column" }, // Thumbnails row on small, column on large
                  gap: { xs: "10px", md: "0" }, // Horizontal gap on small screens
                  overflowX: "auto", // Scroll on small screens if thumbnails overflow
                }}
              >
                {product?.images.map((item, index) => (
                  <div key={index}>
                    <img
                      style={{
                        width: "70px",
                        height: "70px",
                        objectFit: "contain",
                        marginBottom: "10px",
                      }}
                      src={`${BASE_URL}${item}`}
                      alt={item}
                    />
                  </div>
                ))}
              </Box>

              {/* Main Image with Magnification */}
              <Box sx={{ flex: 1 }}>
                <InnerImageZoom
                  src={`${BASE_URL}${product?.images[0]}`}
                  zoomSrc={`${BASE_URL}${product?.images[0]}`}
                  alt="Product Image"
                  zoomType="hover"
                  width={400}
                  height={400}
                />
              </Box>
            </Box>

            {/* Add to Cart and Buy Now Buttons */}
            <Box
              justifyContent="space-between"
              display="flex"
              marginTop="10px"
              gap={isMobile ? "10px" : "150px"}
              flexDirection={isMobile ? "column" : "row"}
            >
              <Button
                variant="outlined"
                startIcon={<AddShoppingCartIcon />}
                onClick={handleCart}
                sx={{
                  padding: "15px",
                  flexGrow: 1,
                  minWidth: "150px",
                }}
              >
                ADD to cart
              </Button>
              <Button
                variant="contained"
                onClick={handleCart}
                startIcon={<ShoppingBagIcon />}
                sx={{
                  padding: "15px",
                  flexGrow: 1,
                  minWidth: "150px",
                }}
              >
                BUY NOW
              </Button>
            </Box>

            {/* Select Size Component */}
            <SelectSize
              sizes={product?.sizes}
              setSelectedSize={setSelectedSize}
            />
          </Grid>

          {/* Right Grid - Product Details */}
          <Grid item xs={12} md={6}>
            <ProductName
              name={product?.name}
              price={product?.sizes[0]?.price}
              offer={product?.offer}
              rating={product?.averageRating}
              selectedSize={selectedSize}
            />
            <ProductDetailsSection />
          </Grid>
        </Grid>
      </Container>
    </>
  );
}

export default ProductDetails;
