import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { Link } from "react-router-dom";
import { LazyLoadImage } from "react-lazy-load-image-component";
import "react-lazy-load-image-component/src/effects/blur.css";
import "./productCard.css"; // Your CSS styles
import {
  addToWishlist,
  removeItemWishlist,
} from "../../actions/wishlistAction";

function ProductCard({ name, price, image, id, wishlist, offer }) {
  const [wishlistAction, setWishlistAction] = useState(wishlist);
  const BASE_URL = process.env.REACT_APP_SERVER_API;
  useEffect(() => {
    setWishlistAction(wishlist);
  }, [wishlist]);

  const handleWishlist = () => {
    addToWishlist(id);
    setWishlistAction(true);
  };

  const handleWishlistRemove = () => {
    removeItemWishlist(id);
    setWishlistAction(false);
  };

  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", sm: 300 },
        m: { xs: 1, sm: 2 },
        position: "relative",
      }}
    >
      <CardActionArea>
        <Box
          sx={{
            display: { xs: "none", sm: "flex" },
            justifyContent: "flex-end",
            alignItems: "center",
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 1,
          }}
        >
          <IconButton
            onClick={wishlistAction ? handleWishlistRemove : handleWishlist}
          >
            {wishlistAction ? (
              <FavoriteIcon sx={{ color: "#461246" }} />
            ) : (
              <FavoriteBorderIcon sx={{ color: "#461246" }} />
            )}
          </IconButton>
        </Box>

        {/* Product Image with Lazy Loading */}
        <Link to={`/productDetails/${id}`}>
          <LazyLoadImage
            alt={name}
            effect="blur" // Blur effect after the image is loaded
            src={`${BASE_URL}/${image}`} // The main image
            height={250} // Fixed height for the image
            width="100%" // Full width
            placeholderSrc="path/to/your/placeholder.png" // Low-res or loading spinner
            style={{
              objectFit: "contain",
            }}
            // Optional styling for placeholder to give it a defined background or spinner while loading
            beforeLoad={() => (
              <div
                className="loading-placeholder"
                style={{ height: 250, backgroundColor: "#f0f0f0" }}
              />
            )}
          />
        </Link>

        {/* Card Content */}
        <CardContent>
          <Typography
            gutterBottom
            variant="subtitle1"
            component="div"
            sx={{ fontSize: { xs: "0.875rem", sm: "1rem" } }}
          >
            {name.length > 32 ? `${name.substring(0, 32)}...` : name}
          </Typography>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography
              sx={{
                color: "primary.main",
                fontWeight: "bold",
                mr: 1,
                fontSize: { xs: "0.875rem", sm: "1rem" },
              }}
              variant="body1"
            >
              {Math.floor(price - price * (offer / 100))}
            </Typography>
            {offer > 0 && (
              <Typography
                sx={{
                  textDecoration: "line-through",
                  fontSize: { xs: "0.75rem", sm: "0.875rem" },
                }}
              >
                {price}
              </Typography>
            )}
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

export default ProductCard;
