import React, { useEffect, useState } from "react";
import ProductName from "../../components/Product/productName/ProductName";
import ProductDetailsSection from "../../components/Product/productDetail/ProductDetailsSection";
import SelectSize from "../../components/Product/selectSize/SelectSize";
import { Box, Button, Container } from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { oneProduct } from "../../actions/productActions";
import Header1 from "../../components/header/Header1";
import Nav from "../../components/header/Nav";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import { toast, ToastContainer } from "react-toastify";

import ReactImageMagnify from "react-image-magnify";
import { addCart } from "../../actions/cartActions";
const BASE_URL = "http://localhost:3000/";
function ProductDetails() {
  const { product, loading } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);
  const [selectedSize, setSelectedSize] = useState(null);

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCart = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    if (selectedSize === null) {
      toast.error("select size");
      return;
    }
    navigate("/cart");

    addCart(user._id,product._id,selectedSize);
  };
  useEffect(() => {
    if (!product?._id || product?._id !== id) {
      dispatch(oneProduct(id));
    }
  }, [dispatch, id, product]);

  if (loading) {
    return <div>Loading......</div>;
  }

  return (
    <>
      <Header1 />
      <Nav />
      <Container maxWidth="lg" sx={{ display: "flex", marginTop: "22px" }}>
        <Box sx={{ width: "50%" }}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
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
            <Box>
              <ReactImageMagnify
                {...{
                  smallImage: {
                    alt: "Wristwatch by Ted Baker London",
                    isFluidWidth: true,
                    src: `${BASE_URL}${product?.images[0]}`,
                  },
                  largeImage: {
                    src: `${BASE_URL}${product?.images[0]}`,
                    width: 1200,
                    height: 1800,
                  },
                }}
              />
              {/* <img
                style={{ width: "100%" }}
                src={`${BASE_URL}${product?.images[0]}`}
                alt={product?.name}
              /> */}
            </Box>
          </Box>
          <Box
            justifyContent="space-between"
            display="flex"
            marginTop="10px"
            gap="150px"
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
          <SelectSize
            sizes={product?.sizes}
            setSelectedSize={setSelectedSize}
          />
        </Box>
        <Box width={"50%"}>
          <ProductName
            name={product?.name}
            price={product?.sizes[0]?.price}
            rating={product?.averageRating}
            selectedSize={selectedSize}
          />
          <ProductDetailsSection />
        </Box>
        <ToastContainer />
      </Container>
    </>
  );
}

export default ProductDetails;
