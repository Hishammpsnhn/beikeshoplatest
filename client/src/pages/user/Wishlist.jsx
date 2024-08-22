import React, { useEffect, useState } from "react";
import ProdcutBref from "../../components/Product/productBref/ProdcutBref";
import { getWishlist, removeItemWishlist } from "../../actions/wishlistAction";
import { Box, CircularProgress, Container, Typography } from "@mui/material";
import Header1 from "../../components/header/Header1";
import Nav from "../../components/header/Nav";

function Wishlist() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  console.log(data);
  const handleWishlistRemove = (productId) => {
    removeItemWishlist(productId);
    setData(data.filter((item) => item._id != productId));
  };
  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const data = await getWishlist();
      if (data) {
        setData(data.items);
        setLoading(false);
      }else{
        setLoading(false)
        setData([]);
      }

    };
    fetch();
  }, []);
  return (
    <>
      <Header1 />
      <Nav />
      <Container sx={{ marginTop: "20px" }}>
        <h1>Your Wishlist</h1>
        {data.length <= 0 && !loading && <Typography>Empty List</Typography>}
        {loading ? (
          <CircularProgress />
        ) : (
          <Box>
            {data?.map((item) => (
              <ProdcutBref
                name={item.name}
                image={item.images[0]}
                price={item.price}
                wishlist={true}
                productId={item._id}
                handleWishlistRemove={handleWishlistRemove}
              />
            ))}
          </Box>
        )}
      </Container>
    </>
  );
}

export default Wishlist;
