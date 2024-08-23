import { Box, Container, Paper, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import OfferPick from "../../components/offer/OfferPick";
import ApplyOffer from "../../components/offer/ApplyOffer";
import { getProductsList } from "../../actions/productActions";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions/categoryActions";

function Offer() {
  const [searchQuery, setSearchQuery] = useState("");
  const [item, setItem] = useState(null);
  const [discount,setDiscount] = useState(null);

  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.products);
  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useSelector((state) => state.category);

  const dispatch = useDispatch();

  const handleSearch = async (offerType, discount) => {
    if (offerType === "product") {
      setItem({offerType:offerType,discount:discount});
      await dispatch(getProductsList());
    } else if (offerType === "category") {
      await dispatch(getCategories());
      setItem({offerType:offerType,discount:discount});
    }
  };


  console.log(item, products, categories);
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  return (
    <Container>
      <h1>Our Offers</h1>
      <p>Check out our amazing offers and discounts!</p>
      {/* Offer cards */}
      <OfferPick handleSearch={handleSearch} />
      {/* Add offer cards here */}
      <Paper elevation={6} sx={{ marginTop: "50px", padding: "20px" }}>
        
        <TextField
          label="Search"
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <Typography variant="h6" color='purple' sx={{fontWeight:'bold'}}>Offer Applied: {item?.discount}</Typography>
        {item?.offerType === "product" && (
          <Box height="50vh" sx={{ overflowY: "scroll" }}>
            {products.map((items) => (
              <ApplyOffer product={true} name={items.name} id={items._id} offer={items.offer} discount={item.discount}/>
            ))}
          </Box>
        )}
        {item?.offerType === "category" && (
          <Box height="50vh" sx={{ overflowY: "scroll" }}>
            {categories.map((items) => (
              <ApplyOffer name={items.category}  id={items._id} offer={items.offer} discount={item.discount}/>
            ))}
          </Box>
        )}
      </Paper>
    </Container>
  );
}

export default Offer;
